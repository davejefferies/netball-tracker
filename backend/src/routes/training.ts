import { ServerRoute } from '@hapi/hapi'
import Joi from 'joi'
import {
    fetchTrainingItems,
    create,
    update
} from '../controllers/trainingController'

const trainingRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/team/{teamId}/schedule/{scheduleId}/training',
        options: {
            auth: 'token',
            handler: fetchTrainingItems
        }
    },
     {
        method: 'POST',
        path: '/team/{teamId}/schedule/{scheduleId}/training',
        options: {
            auth: 'token',
            handler: create
        }
    },
    {
        method: 'PUT',
        path: '/team/{teamId}/schedule/{scheduleId}/training/{id}',
        options: {
            auth: 'token',
            handler: update
        }
    }
]

export default trainingRoutes