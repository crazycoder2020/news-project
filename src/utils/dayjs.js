//dayjs的相关配置
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTim from 'dayjs/plugin/relativeTime'

//配置使用处理相对时间
dayjs.extend(relativeTim)

//配置使用中文处理包
dayjs.locale("zh-cn")

//把处理相对时间的代码配置成全局过滤器 可在任意组件中使用
Vue.filter("relativeTim",value=>{
    return dayjs(value).from(dayjs())
})


