<template>
    <div class="home">
         <van-nav-bar class="app-nav-bar">
             <van-button
                slot="title"
                class="search-btn"
                icon="search"
                type="info"
                round
                size="small"
                to="/search"
             >
                搜索
             </van-button>
         </van-nav-bar>

         <!-- 文章频道列表 -->
        <van-tabs v-model="active">
            <van-tab 
                v-for="channel in channels"
                :title="channel.name"
                :key="channel.id"
            >
                    
                <!-- 文章列表 -->
                <ArticleList :List="channel"/>

            </van-tab>
            <div slot="nav-right" class="no"></div>
            <div 
                slot="nav-right"
                class="wap-nav-wrap"
                @click="isEditShow=!isEditShow"
            >
                <van-icon name="wap-nav"/>
            </div>
        </van-tabs>

        <van-popup 
            v-model="isEditShow"
            position="bottom" 
            closeable
            close-icon-position="top-left"
            get-container="body"
            :style="{ height: '100%' }" 
        >
            <!-- 编辑频道组件 -->
            <ChannelEdit 
                :userchannels="channels"
                :active="active"
                @close="isEditShow=false"
                @pushactive="active=$event"
            />
        </van-popup>
    </div>
</template>
<script>
import { userChannlList } from '@/api/article'
import ArticleList from './components/article-list'
import ChannelEdit from '@/components/channel-edit/channel-edit'
import {mapState} from 'vuex'
export default {
    name:"home",
    data () {
        return {
            active: 0,   //当前选中列表
            channels:[], //频道列表
            isEditShow:false //是否显示弹出层
        }
    },
    components: {
        ArticleList,
        ChannelEdit
    },
    computed: {
        ...mapState(['user'])
    },
    created () {
        this.loadChannl()   
    },
    methods: {
        //请求导航栏数据
        async loadChannl(){
            const { data } =await userChannlList()
            this.channels=data.data.channels
        }
    }
}
</script>
<style lang="less" scoped>
    /deep/.van-nav-bar__title{
        max-width: none;
    }
    .search-btn{
        width: 270px;
        height: 32px;
        background: #5babfb;
        border:none;
        .van-icon{
            font-size: 16px;
        }
        .van-button__text{
            font-size: 14px;
        }
    }
    /deep/.van-tab{
        border-right: 1px solid #edeff3;
        border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line{
        bottom: 20px;
        width: 17px !important;
        height: 3px;
        background: #3296fa;
    }
    .wap-nav-wrap{
        position: fixed;
        right: 0;
        width: 33px;
        height: 43px;
        background-color: #fff;
        opacity: .9;
        display: flex;
        justify-content: center;
        align-items: center;
        .van-icon{
            font-size: 24px;
        }
    }
    .no{
        width: 33px;
        flex-shrink: 0;
    }
</style>