<template>
    <div class="container">
        <van-pull-refresh
            v-model="RefreshLoading"
            @refresh="onRefresh"
            :success-text="successtext"
            :success-duration="1500"
        >
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                >

                <!-- 文章列表 -->
                <ArticleItem
                    v-for="(article,index) in Articlelist" 
                    :key="index" 
                    :articles="article"
                />
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import { List} from 'vant';
import {userArticle} from '@/api/article'
import ArticleItem from '@/components/article-item/index'
export default {
    name:"ArticleList",
    data () {
        return {
            Articlelist: [],
            loading: false,
            finished: false,
            timestamp:null,
            RefreshLoading:false,
            successtext:''
        }
    },
    components: {
      ArticleItem  
    },
    props:{
        List:{
            type:Object,
            required:true
        }
    },
    methods: {
        async onLoad() {
        //1. 异步更新数据
        const {data} =await userArticle({
            channel_id:this.List.id,
            timestamp:this.timestamp||Date.now(), //时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
            with_top:1        //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
            
        //2.把数据放到数组里
        const {results} = data.data
        this.Articlelist.push(...results)

        //3.设置本次加载结束状态，他在可以判断是否需要加载下一次，否则会永远停在那里
        this.loading=false

        //4.数据全部加载完成
        if(results.length){
            //更新获取下一页数据
            this.timestamp=data.data.pre_timestamp
        }else{
            //没有数据 加载状态结束
            this.finished=true
        }
      },

      async onRefresh(){
        const {data} =await userArticle({
            channel_id:this.List.id,
            timestamp:Date.now(), 
            with_top:1
        })
            
        //2.把数据放到数组的顶部
        const {results} = data.data
        this.Articlelist.unshift(...results)

        //关闭加载中
        this.RefreshLoading = false;

        //显示更新条数
        this.successtext=`更新了${results.length}条数据`
      }
    },
}
</script>
<style lang="less" scoped>
    .container{
        position: fixed;
        left: 0;
        right: 0;
        bottom: 50px;
        top: 90px;
        overflow-y: auto;
    }
</style>