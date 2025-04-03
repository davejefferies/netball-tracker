import db from '../db'

export default class TeamMemberRepository { 
    async fetchAllTeamMembersByTeam(teamId: number): Promise<any | undefined> {
        const teams = await db.teamMember.findMany({
            where: {
                teamId: {
                    equals: teamId
                }
            }
        })

        return teams
    }

    async create(teamId: number, name: string, positions: string): Promise<any> {
        const res = await db.teamMember.create({ data: { teamId, name, positions }})

        return res
    }

    async update(id: number, teamId: number, name: string, positions: string): Promise<any> {
        const res = await db.teamMember.update({ where: { id }, data: { teamId, name, positions }})

        return res
    }

    async delete(id: number): Promise<any> {
        const result = await db.teamMember.delete({ where: { id }})

        return result
    }

    async deleteAllForTeam(teamId: number): Promise<any> {
        const result = await db.teamMember.deleteMany({
            where: {
                teamId: {
                    equals: teamId
                }
            }
        })

        return result
    }
}