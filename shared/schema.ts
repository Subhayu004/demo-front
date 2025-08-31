import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(), // mangrove, seagrass, saltmarsh
  status: text("status").notNull(), // active, planning, monitoring, completed
  areaHectares: decimal("area_hectares", { precision: 10, scale: 2 }).notNull(),
  carbonCredits: integer("carbon_credits").notNull().default(0),
  imageUrl: text("image_url"),
  lastUpdate: timestamp("last_update").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  hash: text("hash").notNull().unique(),
  type: text("type").notNull(), // carbon_credit, registry_update, smart_contract
  fromAddress: text("from_address").notNull(),
  toAddress: text("to_address").notNull(),
  value: text("value"),
  blockNumber: integer("block_number").notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

export const carbonCredits = pgTable("carbon_credits", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").references(() => projects.id).notNull(),
  quantity: integer("quantity").notNull(),
  pricePerTonne: decimal("price_per_tonne", { precision: 10, scale: 2 }).notNull(),
  isAvailable: boolean("is_available").default(true),
  sellerAddress: text("seller_address").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const mrvData = pgTable("mrv_data", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").references(() => projects.id).notNull(),
  dataType: text("data_type").notNull(), // drone, mobile, satellite
  metrics: jsonb("metrics").notNull(), // carbon sequestration, biodiversity, etc.
  verificationStatus: text("verification_status").notNull().default("pending"),
  collectedAt: timestamp("collected_at").defaultNow(),
});

export const communityPosts = pgTable("community_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  projectId: varchar("project_id").references(() => projects.id),
  author: text("author").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const communityMembers = pgTable("community_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  points: integer("points").default(0),
  projectsCount: integer("projects_count").default(0),
  joinedAt: timestamp("joined_at").defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  carbonCredits: true,
  lastUpdate: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  timestamp: true,
});

export const insertCarbonCreditSchema = createInsertSchema(carbonCredits).omit({
  id: true,
  createdAt: true,
});

export const insertMrvDataSchema = createInsertSchema(mrvData).omit({
  id: true,
  collectedAt: true,
});

export const insertCommunityPostSchema = createInsertSchema(communityPosts).omit({
  id: true,
  likes: true,
  comments: true,
  createdAt: true,
});

export const insertCommunityMemberSchema = createInsertSchema(communityMembers).omit({
  id: true,
  points: true,
  projectsCount: true,
  joinedAt: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertCarbonCredit = z.infer<typeof insertCarbonCreditSchema>;
export type CarbonCredit = typeof carbonCredits.$inferSelect;
export type InsertMrvData = z.infer<typeof insertMrvDataSchema>;
export type MrvData = typeof mrvData.$inferSelect;
export type InsertCommunityPost = z.infer<typeof insertCommunityPostSchema>;
export type CommunityPost = typeof communityPosts.$inferSelect;
export type InsertCommunityMember = z.infer<typeof insertCommunityMemberSchema>;
export type CommunityMember = typeof communityMembers.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
