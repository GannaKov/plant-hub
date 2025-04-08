import {
  date,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  uuid,
} from 'drizzle-orm/pg-core';

// export const STATUS_ENUM = pgEnum('status', [
//   'PENDING',
//   'APPROVED',
//   'REJECTED',
// ]);

export const ROLE_ENUM = pgEnum('role', ['USER', 'ADMIN']);
// after changing the schema, run this command to generate the new types
//"db:generate": "npx drizzle-kit generate",
// "db:migrate": "npx drizzle-kit migrate",
export const users = pgTable('users', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  login: text('login').notNull().unique(),
  password: text('password').notNull(),
  //   status: STATUS_ENUM('status').default('PENDING'),
  role: ROLE_ENUM('role').default('USER'),
  lastActivityDate: date('last_activity_date').defaultNow(),
  createdAt: timestamp('created_at', {
    withTimezone: true,
  }).defaultNow(),
});

export const equipment = pgTable('equipment', {
  id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
  inventoryNumber: varchar('inventory_number', { length: 255 })
    .notNull()
    .unique(),
  equipmentType: varchar('equipment_type', { length: 255 }).notNull(),
  equipmentName: varchar('equipment_name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  stopType: varchar('stop_type', { length: 255 }).notNull(),
  stopDescription: text('stop_description').notNull(),
  stop_Date: date('stop_date').notNull(),
  stopTime: text('stop_time').notNull(), //or time()?
  nextSteps: text('next_steps').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
