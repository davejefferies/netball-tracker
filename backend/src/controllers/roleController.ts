import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'
import RoleRepository from '../repository/roleRepository'

const roleRepository = new RoleRepository()

export async function fetchRoleList(
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    try {
        const roles = await roleRepository.fetchAll();
        return h
            .response({
                data: roles,
                count: roles.length,
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