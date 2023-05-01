import PocketBase from 'pocketbase'

export const pocketbase = new PocketBase(import.meta.env.POCKETBASE_URL)
