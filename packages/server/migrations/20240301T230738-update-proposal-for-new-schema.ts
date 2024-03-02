import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("proposal")
    .dropColumn("eligibility_contract")
    .dropColumn("eligibility_threshold")
    .addColumn("discriminator", "text")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("proposal")
    .dropColumn("discriminator")
    .addColumn("eligibility_contract", sql`citext`)
    .addColumn("eligibility_threshold", "integer")
    .execute();
}
