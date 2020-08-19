import {get,post} from '../utils/http';

export const list = ()=> get('/api/list')
export const home_icon = ()=> get('/api/home_icon')
export const daynews = ()=> get('/api/daynews')
export const home_list = (index) => get(`/api/home_list/${index}`)
export const details = (id) => get(`/api//details/${id}`)
export const Category = ()=> get('/api/Category')
export const login = (userInfo)=> post('/api/login',userInfo)
export const getUserInfo = ()=> get('/api/userInfo')