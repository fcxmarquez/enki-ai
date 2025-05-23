import { relations } from "drizzle-orm/relations";
import { usersInAuth, users } from "../schema";

export const usersRelations = relations(users, ({ one }) => ({
  usersInAuth: one(usersInAuth, {
    fields: [users.id],
    references: [usersInAuth.id],
  }),
}));

export const usersInAuthRelations = relations(usersInAuth, ({ many }) => ({
  users: many(users),
}));
