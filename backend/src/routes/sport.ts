import { ServerRoute } from '@hapi/hapi'
import Joi from 'joi'
import {
    fetchSportList,
    fetchSportPositionList
} from '../controllers/sportController'

const sportRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/sport',
        options: {
            auth: 'token',
            handler: fetchSportList
        }
    }, 
    {
        method: 'GET',
        path: '/sport/{sportId}/position',
        options: {
            auth: 'token',
            handler: fetchSportPositionList
        }
    }
]


export default sportRoutes