import { relations } from "drizzle-orm";
import {
  text,
  boolean,
  mysqlTable,
  bigint,
  varchar,
} from "drizzle-orm/mysql-core";

export const aircraft = mysqlTable("aircraft", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  slug: varchar("slug", { length: 256 }).unique().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
});

export const aircraftRelations = relations(aircraft, ({ many }) => ({
  checklists: many(checklist),
}));

export const checklist = mysqlTable("checklist", {
  id: bigint("id", { mode: "number", unsigned: true })
    .autoincrement()
    .primaryKey(),
  slug: varchar("slug", { length: 256 }).unique().notNull(),
  aircraftId: bigint("aircraft_id", {
    mode: "number",
    unsigned: true,
  }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  content: varchar("content", { length: 2000 }),
});

export const checklistRelations = relations(checklist, ({ one }) => ({
  aircraft: one(aircraft, {
    fields: [checklist.aircraftId],
    references: [aircraft.id],
  }),
}));
