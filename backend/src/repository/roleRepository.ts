import db from '../db'

export default class RoleRepository {
    async fetchAll(): Promise<any | undefined> {
        const roles = await db.role.findMany()

        return roles
    }
}