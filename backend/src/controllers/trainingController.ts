import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'
import TrainingRepository from '../repository/trainingRepository'
import Boom from '@hapi/boom'

const trainingRepository = new TrainingRepository()

export async function fetchTrainingItems( 
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    try {
        let scheduleId: number = Number(request.params.scheduleId | 0)
        const result = await trainingRepository.fetchTrainingItemsByScheduleId(scheduleId)
        return h
            .response({
                data: result,
                message: 'success',
                status: 200
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
    let scheduleId: number = Number(request.params.scheduleId | 0)
    const { name, duration, notes } = <any>request.payload
    const result = await trainingRepository.create(scheduleId, name, duration, notes)
    if (!result || !result.id)
        throw Boom.badRequest('An error occurred while adding a Training Item')

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
    const { name, duration, notes } = <any>request.payload
    const result = await trainingRepository.update(id, name, duration, notes)
    if (!result || !result.id)
        throw Boom.badRequest('An error occurred while updating a Training item')

    return h
        .response({
            data: result,
            message: 'success',
            status: 200,
        })
        .code(200)
}