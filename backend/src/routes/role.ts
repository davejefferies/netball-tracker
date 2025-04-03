import { ServerRoute } from '@hapi/hapi'
import {
    fetchRoleList
} from '../controllers/roleController'

const roleRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/roles',
        options: {
            auth: 'token',
            handler: fetchRoleList
        }
    }
]


export default roleRoutes