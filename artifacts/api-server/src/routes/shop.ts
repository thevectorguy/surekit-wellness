import { Router, type IRouter } from "express";
import { asc, eq } from "drizzle-orm";
import { getDb, hasDatabaseUrl } from "@workspace/db";
import { logger } from "../lib/logger.js";
import {
  crystalCatalogItemsTable,
  type CreateShopOrderRequest,
  createShopOrderRequestSchema,
  shopOrderItemsTable,
  shopOrdersTable,
} from "@workspace/db/schema";

const shopRouter: IRouter = Router();

function buildOrderReference() {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const randomPart = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `SCB-${datePart}-${randomPart}`;
}

shopRouter.get("/shop/catalog", async (_req, res) => {
  if (!hasDatabaseUrl()) {
    res.status(503).json({
      error:
        "Catalog is temporarily using the local fallback while the database connection is being configured.",
    });
    return;
  }

  try {
    const db = getDb();
    const catalogItems = await db
      .select({
        slug: crystalCatalogItemsTable.slug,
        collection: crystalCatalogItemsTable.collection,
        section: crystalCatalogItemsTable.section,
        subsection: crystalCatalogItemsTable.subsection,
        name: crystalCatalogItemsTable.name,
        description: crystalCatalogItemsTable.description,
        rawLabel: crystalCatalogItemsTable.rawLabel,
        sortOrder: crystalCatalogItemsTable.sortOrder,
        sourceWorkbook: crystalCatalogItemsTable.sourceWorkbook,
        sourceSheet: crystalCatalogItemsTable.sourceSheet,
        priceAmount: crystalCatalogItemsTable.priceAmount,
        priceLabel: crystalCatalogItemsTable.priceLabel,
        image: crystalCatalogItemsTable.image,
        isActive: crystalCatalogItemsTable.isActive,
      })
      .from(crystalCatalogItemsTable)
      .where(eq(crystalCatalogItemsTable.isActive, true))
      .orderBy(
        asc(crystalCatalogItemsTable.sortOrder),
        asc(crystalCatalogItemsTable.collection),
        asc(crystalCatalogItemsTable.section),
        asc(crystalCatalogItemsTable.subsection),
        asc(crystalCatalogItemsTable.name),
      );

    res.json(catalogItems);
  } catch (error) {
    logger.error({ error }, "Failed to load shop catalog");
    res.status(500).json({
      error:
        "We couldn't load the live catalog just now. The storefront can continue using its fallback catalog.",
    });
  }
});

shopRouter.post("/shop/orders", async (req, res) => {
  if (!hasDatabaseUrl()) {
    res.status(503).json({
      error:
        "Orders are temporarily unavailable while the database connection is being configured.",
    });
    return;
  }

  const parsedRequest = createShopOrderRequestSchema.safeParse(req.body);

  if (!parsedRequest.success) {
    res.status(400).json({
      error: "Please review your checkout details and try again.",
      details: parsedRequest.error.flatten(),
    });
    return;
  }

  const payload = parsedRequest.data;
  const subtotalAmount = payload.items.reduce(
    (runningTotal: number, item: CreateShopOrderRequest["items"][number]) =>
      runningTotal + item.unitPrice * item.quantity,
    0,
  );
  const totalItems = payload.items.reduce(
    (runningTotal: number, item: CreateShopOrderRequest["items"][number]) =>
      runningTotal + item.quantity,
    0,
  );

  try {
    const db = getDb();
    const createdOrder = await db.transaction(async (tx) => {
      const reference = buildOrderReference();
      const [order] = await tx
        .insert(shopOrdersTable)
        .values({
          reference,
          status: "pending",
          customerName: payload.customerName,
          customerEmail: payload.customerEmail,
          customerPhone: payload.customerPhone,
          shippingAddress: payload.shippingAddress,
          notes: payload.notes || null,
          subtotalAmount: subtotalAmount.toFixed(2),
          totalItems,
          currency: payload.currency,
          source: payload.source,
        })
        .returning({
          id: shopOrdersTable.id,
          reference: shopOrdersTable.reference,
        });

      await tx.insert(shopOrderItemsTable).values(
        payload.items.map((item: CreateShopOrderRequest["items"][number]) => ({
          orderId: order.id,
          productId: item.productId,
          name: item.name,
          category: item.category,
          quantity: item.quantity,
          unitPrice: item.unitPrice.toFixed(2),
          priceLabel: item.priceLabel,
          image: item.image,
        })),
      );

      return order;
    });

    res.status(201).json({
      orderId: createdOrder.id,
      reference: createdOrder.reference,
    });
  } catch (error) {
    logger.error({ error }, "Failed to create shop order");
    res.status(500).json({
      error:
        "We couldn't create your order just now. Please try again after the database connection is configured.",
    });
  }
});

export default shopRouter;
