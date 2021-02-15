import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:"/login",
    name:"login",
    component:() => import("@/views/login/login") //路由懒加载
  },
  {
    path:"/",
    name:"layout",
    component:() => import("@/views/layout/layout"),
    children:[
      {
        path:"",//默认子路由
        name:"home",
        component:()=>import("@/views/home/home")
      },
      {
        path:"/qa",
        name:"qa",
        component:()=>import("@/views/qa/qa")
      },
      {
        path:"/video",
        name:"video",
        component:()=>import("@/views/video/video")
      },
      {
        path:"/my",
        name:"my",
        component:()=>import("@/views/my/my")
      },
    ]
  },
  {
    path:"/search",
    name:"search",
    component:()=> import("@/views/search/search")
  },
  {
    path:"/article/:articleId",
    name:"article",
    component:()=> import("@/views/article/article"),
    //
    props:true
  },
  {
    path:"/userprofile",
    name:"userprofile",
    component:()=> import("@/views/userprofile/userprofile")
  },
  {
    path:"/wechart",
    name:"wechart",
    component:()=> import("@/views/WeChart/WeChart")
  }
]

const router = new VueRouter({
  routes
})

export default router
