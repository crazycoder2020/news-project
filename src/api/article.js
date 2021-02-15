import request from '@/utils/request'

//获取文章列表
export const userArticle=params=>{
    return request({
        method:"GET",
        url:"/app/v1_1/articles",
        params
    })
}

//获取全部频道列表
export const userChannel=()=>{
    return request({                                    
        method:"GET",
        url:"/app/v1_0/channels"
    })
}

//存储登录后的频道列表
export const addChannels= data =>{
    return request({
        method:"PATCH",
        url:"/app/v1_0/user/channels",
        data
    })
}

//文章频道列表
export const userChannlList=()=>{
    return request({
        method:"GET",
        url:"/app/v1_0/user/channels"
    })
}

//文章详情
export const getArticle=articleId=>{
    return request({
        method:"GET",
        url:`/app/v1_0/articles/${articleId}`
    })
}

//收藏文章
export const isCollected= articleId=>{
    return request({
        method:"POST",
        url:'/app/v1_0/article/collections',
        data:{
            target:articleId
        }
    })
}

//取消收藏文章
export const unCollect= articleId=>{
    return request({
        method:"DELETE",
        url:`/app/v1_0/article/collections/${articleId}`
    })
}