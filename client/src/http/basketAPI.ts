import {$authHost, $host} from "./index";

export const createBasketDevice = async (userId: number, deviceId: number) => {
    const {data} = await $authHost.post('api/basket', {userId, deviceId})
    return data
}

export const fetchBasketDevices = async (userId: number) => {
    const {data} = await $host.get('api/basket', {params: {userId}})
    return data
}

export const deleteBasketDevice = async (userId: number, deviceId: number) => {
    const {data} = await $host.delete('api/basket', { data: {userId, deviceId}})
    return data
}