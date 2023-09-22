import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:4444'
})
// при любом запросе на сервер
instance.interceptors.request.use((config)=>{
    // в голову сообщения вшиваем token
    config.headers.Authorization= window.localStorage.getItem('token')
    return config
})

export default instance