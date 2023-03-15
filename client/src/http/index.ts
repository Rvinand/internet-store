import axios from "axios";

const $host = axios.create({
    baseURL: 'http://localhost:5000/'
})

const $authHost = axios.create({
    baseURL: 'http://localhost:5000/'
})

const authInterceptor = (config: { headers: { authorization: string; }; }) => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

// @ts-ignore
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}
