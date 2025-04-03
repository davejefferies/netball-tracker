import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'
import ScheduleRepository from '../repository/scheduleRepository'
import Boom from '@hapi/boom'

const scheduleRepository = new ScheduleRepository()

export async function fetchScheduleTypes( 
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    try {
        const types = await scheduleRepository.fetchAllScheduleTypes()
        return h
            .response({
                data: types,
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

export async function fetchSchedules( 
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    try {
        let teamId: number = Number(request.params.teamId | 0)
        const schedules = await scheduleRepository.fetchAllSchedulesByTeam(teamId)
        return h
            .response({
                data: schedules,
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
    let teamId: number = Number(request.params.teamId | 0)
    const { typeId, opponent, date } = <any>request.payload
    const result = await scheduleRepository.create(typeId, teamId, opponent, date)
    if (!result || !result.id)
        throw Boom.badRequest('An error occurred while creating the Schedule')

    return h
        .response({
            data: result,
            message: 'success',
            status: 200,
        })
        .code(200)
}

export async function update(
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    let id: number = Number(request.params.id | 0)
    const { typeId, opponent, date } = <any>request.payload
    const result = await scheduleRepository.update(id, typeId, opponent, date)
    if (!result || !result.id)
        throw Boom.badRequest('An error occurred while updating the Schedule')

    return h
        .response({
            data: result,
            message: 'success',
            status: 200,
        })
        .code(200)
}