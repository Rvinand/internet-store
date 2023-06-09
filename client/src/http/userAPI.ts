import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";
import {IUser} from "../Types/IUser";

export const registration = async (email: string, password: string): Promise<IUser> => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email: string, password: string): Promise<IUser> => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async (): Promise<IUser> => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
