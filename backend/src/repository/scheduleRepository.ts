import db from '../db'

export default class ScheduleRepository {
    async fetchAllScheduleTypes(): Promise<any | undefined> {
        const types = await db.scheduleType.findMany()

        return types
    }

    async fetchAllSchedulesByTeam(teamId: number | undefined): Promise<any | undefined> {
        const schedules = await db.schedule.findMany({
            where: {
                teamId: {
                    equals: teamId
                }
            },
            include: {
                type: true,
                team: true
            }
        })
    }

    async create(typeId: number, teamId: number, opponent: string, date: Date): Promise<any> {
        if (!teamId || !typeId)
            return null
        const schedule = await db.schedule.create({ data: { typeId, teamId, opponent, date }})

        return schedule
    }

    async update(id: number, typeId: number, opponent: string, date: Date): Promise<any> {
        const schedule = await db.schedule.update({ where: { id }, data: { typeId, opponent, date }})

        return schedule
    }

    async delete(id: number): Promise<any> {
        const result = await db.schedule.delete({ where: { id }})

        return result
    }
}