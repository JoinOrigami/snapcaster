import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('proposal')
    .alterColumn('start_timestamp', (c) => c.setNotNull())
    .alterColumn('end_timestamp', (c) => c.setNotNull())
    .alterColumn('title', (c) => c.setNotNull())
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable('proposal')
    .alterColumn('start_timestamp', (c) => c.dropNotNull())
    .alterColumn('end_timestamp', (c) => c.dropNotNull())
    .alterColumn('title', (c) => c.dropNotNull())
    .execute()
}
