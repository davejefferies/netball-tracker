import db from '../db'

export default class UserRepository {
    async findByEmail(email: string): Promise<any | undefined> {
        const users = await db.user.findMany({
            where: {
                email: {
                    equals: email
                }
            },
            relationLoadStrategy: 'join',
            include: {
                teams: true
            }
        })

        return users[0]
    }

    async create(firstName: string, lastName: string, email: string, hash: string, roleId: number): Promise<any> {
        const user = await db.user.create({ data: { firstName, lastName, email, password: hash, roleId }})

        return user
    }

    async fetchAllUser(): Promise<any | undefined> {
        const users = await db.user.findMany()
        return users
    }
}