import { ServerRoute } from '@hapi/hapi'
import Joi from 'joi'
import {
    fetchScheduleTypes,
    fetchSchedules,
    create,
    update
} from '../controllers/scheduleController'

const scheduleRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/schedule/types',
        options: {
            auth: 'token',
            handler: fetchScheduleTypes
        }
    },
    {
        method: 'GET',
        path: '/team/{teamId}/schedule',
        options: {
            auth: 'token',
            handler: fetchSchedules
        }
    },
    {
        method: 'POST',
        path: '/team/{teamId}/schedule',
        options: {
            auth: 'token',
            handler: create
        }
    },
    {
        method: 'PUT',
        path: '/team/{teamId}/schedule/{id}',
        options: {
            auth: 'token',
            handler: update
        }
    }
]

export default scheduleRoutes