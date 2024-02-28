import { Kysely } from "kysely"

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("proposal")
    .alterColumn("eligibility_threshold", (c) => c.setDataType("numeric(78, 0)"))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("proposal")
    .alterColumn("eligibility_threshold", (c) => c.setDataType("bigint"))
    .execute();
}
