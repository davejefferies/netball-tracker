import db from '../db'

export default class UserRepository {
    async fetchAll(): Promise<any | undefined> {
        const sports = await db.sport.findMany()

        return sports
    }
}