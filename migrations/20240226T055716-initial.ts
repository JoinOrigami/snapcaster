import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await sql`create extension if not exists citext`.execute(db);

  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (c) => c.primaryKey())
    .addColumn("fid", sql`citext`, (c) => c.unique())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .dropTable("users")
    .execute();
}
