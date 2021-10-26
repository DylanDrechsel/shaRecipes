import prisma from '@prisma/client'

const db = new prisma.PrismaClient({
    log: ['info', 'warm'],
    errorFormat: 'pretty',
})

export default db