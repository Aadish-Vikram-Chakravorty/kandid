import { relations } from 'drizzle-orm'; 
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  pgEnum,
  integer,
} from 'drizzle-orm/pg-core';

// Define an ENUM for lead status, which is better for database integrity
export const leadStatusEnum = pgEnum('lead_status', [
  'Pending',
  'Contacted',
  'Responded',
  'Converted',
]);

// Define an ENUM for campaign status
export const campaignStatusEnum = pgEnum('campaign_status', [
  'Draft',
  'Active',
  'Paused',
  'Completed',
]);

// Campaigns Table
export const campaigns = pgTable('campaigns', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  status: campaignStatusEnum('status').default('Draft'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Leads Table
export const leads = pgTable('leads', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: varchar('email', { length: 255 }).notNull().unique(),
  company: text('company'),
  status: leadStatusEnum('status').default('Pending'),
  lastContactedAt: timestamp('last_contacted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),

  // Foreign key for the relationship
  campaignId: integer('campaign_id').references(() => campaigns.id),
});

// Define the relationship between campaigns and leads (one-to-many)
export const campaignsRelations = relations(campaigns, ({ many }) => ({
  leads: many(leads),
}));

export const leadsRelations = relations(leads, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [leads.campaignId],
    references: [campaigns.id],
  }),
}));