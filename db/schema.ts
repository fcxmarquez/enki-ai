import { pgTable, uuid, text, timestamp, serial, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().notNull(),
  email: text(),
  phone: text(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
});

export const conversations = pgTable("conversations", {
  id: uuid("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  conversationId: uuid("conversation_id")
    .notNull()
    .references(() => conversations.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  index: integer("index").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
});
