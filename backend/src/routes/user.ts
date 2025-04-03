import { ServerRoute } from '@hapi/hapi'
import Joi from 'joi'
import {
    doRegister,
    doLogin,
    doTokenRefresh,
    fetchUserList
} from '../controllers/userController'

const userRoutes: ServerRoute[] = [
    {
        method: 'POST',
        path: '/register',
        handler: doRegister,
        options: {
            validate: {
                payload: Joi.object({
                    first_name: Joi.string().required(),
                    last_name: Joi.string().required(),
                    role_id: Joi.number().required(),
                    email: Joi.string().email().required(),
                    password: Joi.string()
                        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
                        .required()
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: doLogin,
        options: {
            validate: {
                payload: Joi.object({
                    email: Joi.string().email().required(),
                    password: Joi.string().required(),
                })
            }
        }
    },
    {
        method: 'POST',
        path: '/auth/refresh',
        handler: doTokenRefresh,
        options: {
            validate: {
                payload: Joi.object({
                    refreshToken: Joi.string().required()
                })
            }
        }
    },
    {
        method: 'GET',
        path: '/users',
        options: {
            auth: 'token',
            handler: fetchUserList
        }
    }
]


export default userRoutes