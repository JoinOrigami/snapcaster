import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('vote')
    .addColumn('tx_hash', sql`citext`, (c) => c.notNull())
    .alterColumn('uid', (c) => c.dropNotNull())
    .execute();

  await db.schema
    .alterTable('proposal')
    .addColumn('tx_hash', sql`citext`, (c) => c.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('vote')
    .dropColumn('tx_hash')
    .execute();

  await db.schema
    .alterTable('proposal')
    .dropColumn('tx_hash')
    .execute();
}
