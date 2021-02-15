//用户相关请求模块
import request from '@/utils/request'

//用户登录
export const userlogin= data=>{
    return request({
        method:"POST",
        url:"/app/v1_0/authorizations",
        data
    })
}

//短信验证码
export const usercode= mobile=>{
    return request({
        method:"GET",
        url:`/app/v1_0/sms/codes/${mobile}`,
    })
}

//获取用户信息
export const userMessage= ()=>{
    return request({
        method:"GET",
        url:"/app/v1_0/user"
    })
}

//关注用户
export const isFollow= target=>{
    return request({
        method:"POST",
        url:"/app/v1_0/user/followings",
        data:{
            target
        }
    })
}

//取消关注用户
export const unfollow= target=>{
    return request({
        method:"DELETE",
        url:`/app/v1_0/user/followings/${target}`
    })
}

//获取用户个人资料
export const getUserProfile= ()=>{
    return request({
        method:"GET",
        url:'/app/v1_0/user/profile'
    })
}



