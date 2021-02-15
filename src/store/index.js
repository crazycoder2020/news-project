import Vue from 'vue'
import Vuex from 'vuex'
import {setItem,getItem} from '@/utils/storage'

Vue.use(Vuex)

const USER_KEY ='news-user'

export default new Vuex.Store({
  state: {
      user:getItem(USER_KEY)  //转换成对象获取
  },
  mutations: {
      setUser(state,data){
          state.user=data
          setItem(USER_KEY,state.user) //转换成字符串存储
      }
  },
  actions: {
  },
  modules: {
  }
})
