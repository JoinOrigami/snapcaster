import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('vote')
    .addColumn('weight', 'numeric(78, 0)', (c) => c.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('vote')
    .dropColumn('weight')
    .execute();
}
