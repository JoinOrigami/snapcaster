import { Kysely, sql } from "kysely"

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("proposal")
    .addColumn("id", "serial", (c) => c.primaryKey())
    .addColumn("uid", sql`citext`, (c) => c.unique())
    .addColumn("title", "text")
    .addColumn("summary", "text")
    .addColumn("description", "text")
    .addColumn("start_timestamp", "timestamptz")
    .addColumn("end_timestamp", "timestamptz")
    .addColumn("eligibility_type", "text", (c) => c.notNull())
    .addColumn("eligibility_contract", sql`citext`)
    .addColumn("eligibility_threshold", "integer")
    .addColumn("proposer_id", "integer", (c) => c.references("user.id").notNull())
    .addCheckConstraint("fields_nullable_draft_only", sql`uid IS NULL OR (
      title IS NOT NULL AND
      start_timestamp IS NOT NULL AND
      end_timestamp IS NOT NULL AND
      eligibility_type IS NOT NULL AND

      (eligibility_type != 'contract' OR (
        eligibility_contract IS NOT NULL AND
        eligibility_threshold IS NOT NULL
      ))
    )`)
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("proposal").execute();
}
