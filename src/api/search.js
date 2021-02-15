//搜索请求模块
import request from '@/utils/request'

//联想搜索
export const searchSuggestions= q=>{
    return request({
        method:"GET",
        url:"/app/v1_0/suggestion",
        params:{
            q
        }
    })
}

//获取搜索结果
export const searchResults= params=>{
    return request({
        method:"GET",
        url:"/app/v1_0/search",
        params
    })
}

//获取搜索结果
export const searchHistorys= ()=>{
    return request({
        method:"GET",
        url:"/app/v1_0/search/histories",
    })
}