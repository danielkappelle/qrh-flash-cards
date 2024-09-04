import { InferSelectModel, relations } from 'drizzle-orm';
import { bigint, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const aircraft = mysqlTable('aircraft', {
  id: bigint('id', { mode: 'number', unsigned: true })
    .autoincrement()
    .primaryKey(),
  slug: varchar('slug', { length: 256 }).unique().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
});

export const aircraftRelations = relations(aircraft, ({ many }) => ({
  checklists: many(checklist),
}));

export const checklist = mysqlTable('checklist', {
  id: bigint('id', { mode: 'number', unsigned: true })
    .autoincrement()
    .primaryKey(),
  slug: varchar('slug', { length: 256 }).unique().notNull(),
  aircraftId: bigint('aircraft_id', {
    mode: 'number',
    unsigned: true,
  }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  content: varchar('content', { length: 2000 }),
});

export const checklistRelations = relations(checklist, ({ one }) => ({
  aircraft: one(aircraft, {
    fields: [checklist.aircraftId],
    references: [aircraft.id],
  }),
}));

export const user = mysqlTable('user', {
  id: bigint('id', { mode: 'number', unsigned: true })
    .autoincrement()
    .primaryKey(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  password: varchar('password', { length: 256 }).notNull(),
});

export type AircraftSelect = InferSelectModel<typeof aircraft>;
export type ChecklistSelect = InferSelectModel<typeof checklist>;
