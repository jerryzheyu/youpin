import axios from 'axios'
import qs from 'qs';
import store from '../store';


export const http = createRequest()

function createRequest() {
    const instance = axios.create({
        timeout: 3000,
        // baseURL: process.env.VUE_APP_BASE_API
    })
    
    instance.interceptors.request.use(
        config => {
            // 设置头信息，lodding
            const token = store.state.token
            if (token) {
                config.headers.Authorization = token // 请求头部添加token
              }
            return config
        },
        error => {
            return new Promise.reject(error)
        }
    )
    instance.interceptors.response.use(
        response =>{
            // 不同状态下响应处理

            return response.data
        },
        error => {
            // 不同错误类型处理
            return Promise.reject(error)
        }
    )

    return instance
}

export const get = (url,params={})=> http.get(url,{params})
export const post = (url,data)=> http.post(url,data)


