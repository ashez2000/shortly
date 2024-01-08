import { PrismaClient } from '@prisma/client'
const db = new PrismaClient()

export const resetDb = async () => {
  await db.shortLink.deleteMany()
}

export default db
