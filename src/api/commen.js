//用户相关请求模块
import request from '@/utils/request'

//评论列表
export const getCommen= params=>{
    return request({
        method:"GET",
        url:"/app/v1_0/comments",
        params
    })
}