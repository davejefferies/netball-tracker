import Hapi, { Server } from '@hapi/hapi'
import * as dotenv from 'dotenv'
import authPlugin from './plugins/authPlugin'
import * as routes from './routes'

dotenv.config()

export let server: Server;

export const init: any = async function (): Promise<Server> {
    server = Hapi.server({
        port: process.env.PORT || 4000,
        host: 'localhost',
        routes: {
            cors: {
                credentials: true
            }
        }
    })

    await server.register(authPlugin)
    server.realm.modifiers.route.prefix = '/api'

    server.ext('onRequest', (request, h) => {
        console.log('Middleware executed')
        return h.continue
    })

    Object.values(routes).forEach(route => {
        server.route(route)
    })

    return server
}

export const start: any = async function (): Promise<void> {
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`)
    server.start()
}

process.on("unhandledRejection", (err) => {
    console.error("unhandledRejection")
    console.error(err)
    process.exit(1)
})

init()
    .then(() => start())
    .catch((error: any) => console.error("Error While Starting the server", error))
