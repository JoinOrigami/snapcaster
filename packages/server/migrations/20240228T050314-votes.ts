import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("vote")
    .addColumn("id", "serial", (c) => c.primaryKey())
    .addColumn("uid", sql`citext`, (c) => c.notNull().unique())
    .addColumn("proposal_id", "integer", (c) => c.notNull().references("proposal.id"))
    .addColumn("voter_fid", "bigint", (c) => c.notNull())
    .addColumn("choice", sql`smallint`, (c) => c.notNull())
    .addColumn("signature", "text", (c) => c.notNull())
    .addColumn("created_at", "timestamptz", (c) => c.notNull().defaultTo(sql`now()`))
    .execute();

  await db.schema
    .alterTable("proposal")
    .addColumn("proposer_fid", "bigint", (c) => c.notNull())
    .dropColumn("proposer_id")
    .execute();

  await db.schema
    .dropTable("user")
    .execute();
}

export async function down(): Promise<void> {
  throw new Error("not implemented");
}
