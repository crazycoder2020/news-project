<template>
    <div class="container">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <van-cell 
              v-for="(article,index) in list" 
              :key="index" 
              :title="article.title" 
            />
        </van-list>
    </div>
</template>
<script>
import {searchResults} from '@/api/search'
export default {
    name:"SearchReasults",
    data () {
        return {
            list: [],
            loading: false,
            finished: false,
            page:1,
            perPage:10
        }
    },
    props:{
       searchtext:{
          type:String,
          required:true
       }
    },
    methods: {
      async onLoad() {
        //1.请求获取数据
        const { data } =await searchResults({
          page:this.page,
          per_page:this.perPage,
          q:this.searchtext
        })

        //2.将数据放到数组中
        const {results} =data.data
        this.list.push(...results)

        //3.关闭本次的loading
        this.loading=false

        //4.判断是否还有数据 如果有则继续加载 如果没有则关闭加载更多
        if(results){
          // 如果有则继续加载
          this.page++
        }else{
          this.finished=true
        }
      },
  },
}
</script>
<style lang="less" scoped>
    .container{
        position: fixed;
        left: 0;
        right: 0;
        top: 54px;
        bottom: 0;
        overflow-y: auto;
    }
</style>