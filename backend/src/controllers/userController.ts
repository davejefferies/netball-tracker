import { Request, ResponseToolkit, ResponseObject } from '@hapi/hapi'
import Boom from '@hapi/boom'
import UserRepository from '../repository/userRepository'
import { compareHash, generateSalt, generateHash } from '../utils/bcrypt'
import { createAccessToken, createRefreshToken, validateRefreshToken } from '../utils/jwt'
import { IUser, IRefreshToken } from '../utils/constants'

const userRepository = new UserRepository()

export async function doRegister(
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    try {
        const { firstName, lastName, email, password, roleId } = <IUser>request.payload
        const userExists = await userRepository.findByEmail(email)

        if (userExists)
            return h.response(`Email is already being used`).code(400)
        else {
            const salt = generateSalt(10)
            const hash = generateHash(password, salt)
            const newUser = await userRepository.create(firstName, lastName, email, hash, roleId)
            delete newUser.password
            const token = createAccessToken(newUser)
            return h
                .response({
                    user: newUser,
                    token,
                    message: 'User Registered SuccessFully',
                    status: 201
                })
                .code(201)
                .header(
                    'Set-Cookie',
                    `access_token=${token}; isHttpOnly=false; Path=/`
                )
        }
    } catch (error) {
        console.log(error)
        return h
            .response({ message: 'Oops!! Something Went Wrong', status: 500 })
            .code(500)
    } 
}

export async function doLogin(
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    try {
        const { email, password } = <IUser>request.payload

        const userExists = await userRepository.findByEmail(email)
        if (!userExists)
            return h
                .response({ message: 'Email Does Not Exist', status: 400 })
                .code(400)
        else {
            const isMatch = compareHash(password, userExists.password)
            if (!isMatch)
                return h
                    .response({ message: 'Password Does Not Match', status: 400 })
                    .code(400)

            delete userExists.password
            const token = createAccessToken(userExists)
            const refreshToken = createRefreshToken(userExists)
            return h
                .response({
                    user: userExists,
                    token,
                    refreshToken,
                    message: 'User SignIn SuccessFully',
                    status: 200
                })
                .code(200)
        }
    } catch (error) {
        console.log(error)
        return h
            .response({ message: 'Oops!! Something Went Wrong', status: 500 })
            .code(500)
    }
}

export async function doTokenRefresh(
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    try {
        let { refreshToken } = <IRefreshToken>request.payload
        const decoded = validateRefreshToken(refreshToken)
        if (!decoded)
            throw Boom.unauthorized('Token Expired')
        const user: any = decoded
        delete user.iat
        delete user.exp
        console.log(user)
        const token = createAccessToken(<IUser>user)
        refreshToken = createRefreshToken(<IUser>user)
        return h
            .response({
                user: decoded,
                token,
                refreshToken,
                message: 'Refresh Token SuccessFully',
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

export async function fetchUserList(
    request: Request,
    h: ResponseToolkit
): Promise<ResponseObject> {
    try {
        const users = await userRepository.fetchAllUser()
        return h
            .response({
                data: users,
                message: 'success',
                status: 200,
            })
            .code(200)
    
    } catch (error) {
        return h
            .response({ message: 'Oops!! Something Went Wrong', status: 500 })
            .code(500)
  }
}