import { Server, Request, ResponseToolkit, AuthCredentials } from '@hapi/hapi'
import Boom from '@hapi/boom'
import { validateToken } from '../utils/jwt'

export default {
    name: 'authPlugin',
    version: '1.0.0',
    register: async function (server: Server) {
        server.auth.scheme('custom-auth', () => {
            return {
                authenticate: function (request: Request, h: ResponseToolkit) {
                    const token = request.headers && request.headers.authorization ? request.headers.authorization.replace('Bearer ', '') : null

                    if (!token)
                        throw Boom.unauthorized('Missing or invalid Authorization header')

                    const decoded = validateToken(token)
                    if (!decoded)
                        throw Boom.unauthorized('Token Expired')

                    const credentials: AuthCredentials = {
                        user: decoded
                    }

                    return h.authenticated({
                        credentials
                    })
                }
            }
        })
        server.auth.strategy('token', 'custom-auth')
    }
}