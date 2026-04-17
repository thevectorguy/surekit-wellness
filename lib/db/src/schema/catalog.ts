import { createInsertSchema } from "drizzle-zod";
import {
  boolean,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const crystalCatalogItemsTable = pgTable("crystal_catalog_items", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  collection: varchar("collection", { length: 120 }).notNull(),
  section: varchar("section", { length: 120 }),
  subsection: varchar("subsection", { length: 160 }),
  name: text("name").notNull(),
  description: text("description"),
  rawLabel: text("raw_label").notNull(),
  priceAmount: numeric("price_amount", { precision: 12, scale: 2 }),
  priceLabel: text("price_label"),
  image: text("image"),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull(),
  sourceWorkbook: varchar("source_workbook", { length: 255 }).notNull(),
  sourceSheet: varchar("source_sheet", { length: 120 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const insertCrystalCatalogItemSchema = createInsertSchema(
  crystalCatalogItemsTable,
);

export type CrystalCatalogItem = typeof crystalCatalogItemsTable.$inferSelect;
export type InsertCrystalCatalogItem = z.infer<
  typeof insertCrystalCatalogItemSchema
>;
