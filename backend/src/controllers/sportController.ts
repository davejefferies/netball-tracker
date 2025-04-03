import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'
import SportRepository from '../repository/sportRepository'
import SportPositionRepository from '../repository/sportPositionRepository'

const sportRepository = new SportRepository()
const sportPositionRepository = new SportPositionRepository()

export async function fetchSportList(
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    try {
        const sports = await sportRepository.fetchAll();
        return h
            .response({
                data: sports,
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

export async function fetchSportPositionList(
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    try {
        let sportId: number = Number(request.params.sportId | 0)
        const positions = await sportPositionRepository.fetchBySportId(sportId)

        return h
            .response({
                data: positions,
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