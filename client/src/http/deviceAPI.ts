import {$authHost, $host} from "./index";

export const createCategory = async (category: any) => {
    const {data} = await $authHost.post('api/category', category)
    return data
}

export const fetchCategories = async () => {
    const {data} = await $host.get('api/category')
    return data
}

export const createBrand = async (brand: any) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const createDevice = async (device: any) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (categoryId: number | null, brandsIds: number[] | null, page: number, limit= 5) => {
    const {data} = await $host.get('api/device', {params: {
            categoryId, brandsIds, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id: string) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}
