import { uuid, pgTable, integer, pgEnum, timestamp, text, date, varchar } from 'drizzle-orm/pg-core'

export const STATUS_ENUM = pgEnum('status_enum', ['PENDING', 'APROVED', 'REJECTED'])
export const ROLE_ENUM = pgEnum('role_enum', ['ADMIN', 'USER'])
export const BORROW_ENUM = pgEnum('role_enum', ['BORROWED', 'RETURNED'])

export const users = pgTable('users', {
	id: uuid('id').notNull().primaryKey().defaultRandom().unique(),
	fullName: varchar('full_name', { length: 255 }).notNull(),
	email: text('email').notNull().unique(),
	universityId: integer('university_id').notNull().unique(),
	password: text('password').notNull(),
	universityCard: text('university_card').notNull(),
	status: STATUS_ENUM('status').default('PENDING'),
	role: ROLE_ENUM('role').default('USER'),
	lastActivityDate: date('last_activity_date').notNull().defaultNow(),
	createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// export const postsTable = pgTable('posts_table', {
//   id: serial('id').primaryKey(),
//   title: text('title').notNull(),
//   content: text('content').notNull(),
//   userId: integer('user_id')
//     .notNull()
//     .references(() => usersTable.id, { onDelete: 'cascade' }),
//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at')
//     .notNull()
//     .$onUpdate(() => new Date()),
// });

// export type InsertUser = typeof usersTable.$inferInsert;
// export type SelectUser = typeof usersTable.$inferSelect;

// export type InsertPost = typeof postsTable.$inferInsert;
// export type SelectPost = typeof postsTable.$inferSelect;
