import PocketBase from 'pocketbase'

export const pocketbase = new PocketBase(import.meta.env.PUBLIC_POCKETBASE_URL)

await pocketbase.admins.authWithPassword(
  import.meta.env.PUBLIC_POCKETBASE_ADMIN_USERNAME,
  import.meta.env.PUBLIC_POCKETBASE_ADMIN_PASSWORD
)
