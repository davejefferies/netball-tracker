import db from '../db'

export default class TrainingRepository {

    async fetchTrainingItemsByScheduleId(scheduleId: number | undefined): Promise<any | undefined> {
        const schedules = await db.trainingItem.findMany({
            where: {
                scheduleId: {
                    equals: scheduleId
                }
            },
            include: {
                schedule: true
            }
        })
    }

    async create(scheduleId: number, name: string, duration: number, notes: string): Promise<any> {
        if (!scheduleId)
            return null
        const result = await db.trainingItem.create({ data: { scheduleId, name, duration, notes }})

        return result
    }

    async update(id: number, name: string, duration: number, notes: string): Promise<any> {
        const result = await db.trainingItem.update({ where: { id }, data: { name, duration, notes }})

        return result
    }

    async delete(id: number): Promise<any> {
        const result = await db.trainingItem.delete({ where: { id }})

        return result
    }
}