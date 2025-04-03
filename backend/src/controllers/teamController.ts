import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'
import TeamRepository from '../repository/teamRepository'
import TeamMemberRepository from '../repository/teamMemberRepository'
import { ITeam, IUser } from '../utils/constants'
import Boom from '@hapi/boom'

const teamRepository = new TeamRepository()
const teamMemberRepository = new TeamMemberRepository()

export async function fetchTeamsList( 
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    try {
        let { id } = <IUser>request.auth.credentials.user
        const teams = await teamRepository.fetchAllTeamsByCoordinator(id)
        return h
            .response({
                data: teams.map((team: any) => ({
                    ...team,
                    members: team.teamMembers.map((member: any) => ({
                        ...member,
                        positions: JSON.parse(member.positions)
                    }))
                })),
                message: 'success',
                status: 200,
            })
            .code(200)
    
    } catch (error) {
        console.log(error)
        return h
            .response({ message: 'Oops!! Something Went Wrong', status: 500 })
            .code(500)
  }
}

export async function create(
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    const { name, coach, members } = <ITeam>request.payload
    let { id } = <IUser>request.auth.credentials.user
    const team = await teamRepository.create(name, coach || '', id)
    if (!team || !team.id)
        throw Boom.badRequest('An error occurred while creating the Team')

    await alterTeamMembers(id, team.id, members)

    return h
            .response({
                data: team,
                message: 'success',
                status: 200,
            })
            .code(200)
}

export async function update(
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    let { id } = <IUser>request.auth.credentials.user
    let teamId: number = Number(request.params.teamId | 0)
    const { name, coach, members } = <ITeam>request.payload
    const team = await teamRepository.update(teamId, name, coach || '', id)
    if (!team || !team.id)
        throw Boom.badRequest('An error occurred while updating the Team')

    await alterTeamMembers(id, teamId, members)

    return h
            .response({
                data: team,
                message: 'success',
                status: 200,
            })
            .code(200)
}

async function alterTeamMembers(id: number | undefined, teamId: number, members: any) {
    if (!members || members.length === 0) {
        teamMemberRepository.fetchAllTeamMembersByTeam(teamId)
    } else if (id) {
        const savedMembers = await teamMemberRepository.fetchAllTeamMembersByTeam(id || 0)
        const removals = savedMembers.map((obj: any) => <number>obj.id).filter((id: number) => members.map((obj: any) => <number>obj.id).indexOf(id) < 0)
        const additions = members.filter((member: any) => !member.id)
        const updates = members.filter((member: any) => member.id)
        additions.forEach(async (member: any) => {
            await teamMemberRepository.create(teamId, member.name, JSON.stringify(member.positions))
        })
        updates.forEach(async (member: any) => {
            await teamMemberRepository.update(member.id, teamId, member.name, JSON.stringify(member.positions))
        })
        removals.forEach(async (id: number) => {
            await teamMemberRepository.delete(id)
        })
    }
}