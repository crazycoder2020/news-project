import axios from 'axios'
import store from '@/store/index'
import JSONbigint from 'json-bigint'
import {Toast} from 'vant'
import router from '@/router/index'

const refreshtoken =axios.create({
    baseURL:"http://ttapi.research.itcast.cn"
})

const request =axios.create({
    baseURL:"http://ttapi.research.itcast.cn",
    transformResponse:[function(data){
        try {
            //如果转化成功则直接将结果返回
            return JSONbigint.parse(data)
        } catch (error) { 
            //如果转化失败则原封不动的返回给请求使用
            return data
        }
    }]
})

//请求拦截器
request.interceptors.request.use(
    function(config){
        const {user} =store.state;

        //如果有用户登录 同意设置token
        if(user){
            config.headers.Authorization=`Bearer ${user.token}`
        }
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)
//响应拦截器
request.interceptors.response.use(function (response) {
    //请求成功
    return response
  }, async function (error) {
    //请求失败
    const status = error.response.status
    if(status===400){
        Toast.fail("请求参数错误")
    }else if(status===401){
        //用户token过期
        const { user } =store.state
        if(!user || !user.token){
            return toLogin()
        }

        //如果有refresh_token请求获取新的token
        try{
            const {data} = await refreshtoken({
                method:"PUT",
                url:"/app/v1_0/authorizations",
                headers:{
                    Authorization:`Bearer ${user.refresh_token}`
                }
            })
        }catch(error){
            toLogin()
        }
        //拿到新的token储存到容器中
        user.token=data.data.token
        store.commit("setUser",user)

        //把失败的请求重新发送出去
        return request(error.config)
    }else if(status===403){
        Toast.fail("没有权限操作")
    }else if(status>=500){
        Toast.fail("服务端异常")
    }

    //抛出异常
    return Promise.reject(error)
  })

  function toLogin(){
        router.replace('/login')
  }

export default request;