import { relations } from "drizzle-orm";
import {
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const shopOrdersTable = pgTable("shop_orders", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 40 }).notNull().unique(),
  status: varchar("status", { length: 32 }).notNull().default("pending"),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  shippingAddress: text("shipping_address").notNull(),
  notes: text("notes"),
  subtotalAmount: numeric("subtotal_amount", { precision: 12, scale: 2 }).notNull(),
  totalItems: integer("total_items").notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("INR"),
  source: varchar("source", { length: 64 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const shopOrderItemsTable = pgTable("shop_order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => shopOrdersTable.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull(),
  name: text("name").notNull(),
  category: varchar("category", { length: 64 }).notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price", { precision: 12, scale: 2 }).notNull(),
  priceLabel: text("price_label").notNull(),
  image: text("image").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const shopOrdersRelations = relations(shopOrdersTable, ({ many }) => ({
  items: many(shopOrderItemsTable),
}));

export const shopOrderItemsRelations = relations(
  shopOrderItemsTable,
  ({ one }) => ({
    order: one(shopOrdersTable, {
      fields: [shopOrderItemsTable.orderId],
      references: [shopOrdersTable.id],
    }),
  }),
);

export const insertShopOrderSchema = createInsertSchema(shopOrdersTable);
export const insertShopOrderItemSchema = createInsertSchema(shopOrderItemsTable);

export const createShopOrderRequestSchema = z.object({
  customerName: z.string().trim().min(2),
  customerEmail: z.string().trim().email(),
  customerPhone: z.string().trim().min(5),
  shippingAddress: z.string().trim().min(10),
  notes: z.string().trim().max(2000).optional().default(""),
  subtotal: z.number().nonnegative(),
  currency: z.literal("INR"),
  source: z.literal("sacred-crystal-boutique"),
  items: z
    .array(
      z.object({
        productId: z.string().trim().min(1),
        name: z.string().trim().min(1),
        category: z.string().trim().min(1),
        quantity: z.number().int().positive(),
        unitPrice: z.number().nonnegative(),
        priceLabel: z.string().trim().min(1),
        image: z.string().trim().url(),
      }),
    )
    .min(1),
});

export type ShopOrder = typeof shopOrdersTable.$inferSelect;
export type ShopOrderItem = typeof shopOrderItemsTable.$inferSelect;
export type CreateShopOrderRequest = z.infer<typeof createShopOrderRequestSchema>;
