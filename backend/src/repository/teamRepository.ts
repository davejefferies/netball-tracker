import db from '../db'

export default class TeamRepository {
    async fetchAllTeamsByCoordinator(coordinatorId: number | undefined): Promise<any | undefined> {
        const teams = await db.team.findMany({
            where: {
                coordinatorId: {
                    equals: coordinatorId
                }
            },
            include: {
                coordinator: true,
                teamMembers: true
            }
        })

        return teams
    } 

    async create(name: string, coach: string, coordinatorId: number | undefined): Promise<any> {
        if (!coordinatorId)
            return null
        const team = await db.team.create({ data: { name, coach, coordinatorId }})

        return team
    }

    async update(id: number, name: string, coach: string, coordinatorId: number | undefined): Promise<any> {
        const team = await db.team.update({ where: { id }, data: { name, coach, coordinatorId }})

        return team
    }

    async delete(id: number): Promise<any> {
        const result = await db.team.delete({ where: { id }})

        return result
    }
}