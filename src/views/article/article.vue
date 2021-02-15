<template>
    <div class="container">
        <van-nav-bar
            title="文章详情"               
            left-arrow
            @click-left="$router.back()"
            class="app-nav-bar"
        />

        <!-- 文章详情页 -->
        <div class="article-center">
            <h5 class="title">{{article.title}}</h5>

            <van-cell center class="user-info" :border="false">
                <div slot="title" class="name">{{article.name}}</div>
                <van-image
                    slot="icon"
                    round
                    size="small"
                    fit="cover"
                    class="image"
                    :src="article.aut_photo"
                />
                <div slot="label" class="pudata">
                    {{article.pubdate | relativeTim}}
                </div>
                <van-button
                    class="btn"
                    :type="article.is_followed ? 'default' :'info'"
                    :icon="article.is_followed ? '' :'plus'"
                    size="small"
                    round
                    :loading="isloadFollow"
                    @click.prevent="onFollow()"
                >
                {{article.is_followed ? '已关注' : '关注'}}
                </van-button>
            </van-cell>
            <div 
                class="markdown-body" 
                v-html="article.content"
                ref="article-content"
            >
            </div>
            <!-- 评论区 -->
        
        </div>

        

        <!-- 底部区域 -->
        <div class="article-bottom">
            <van-button
                class="commen-btn"
                type="default"
                round
                size="small"
            >
                写评论
            </van-button>
            <van-icon
                name="comment-o"
                badge="0"
                color="#777"
            />
            <van-icon
                :color="article.is_collected ? 'orange' : '#777'"
                :name="article.is_collected ? 'star' :'star-o'"
                @click="isCollect(article)"
                :loading="isloadCollected"
            />
            <van-icon
                color="#777"
                name="good-job-o"
            />
            <van-icon
                name="share"
                color="#777777"
            ></van-icon>
        </div>
    </div>
</template>
<script>
import './github-markdown.css'
import {getArticle,isCollected,unCollect} from '@/api/article'
import { ImagePreview } from 'vant';
import {isFollow,unfollow} from '@/api/user'

export default {
    name:"Article",
    data () {
        return {
            article:{} ,//文章数据
            isloadFollow:false,
            isloadCollected:false
        }
    },
    created () {
        this.loadArticle()  
    },
    props:{
        articleId:{
            type:[String,Number,Object],
            required:true
        }
    },
    methods: {
        async loadArticle() {
            const {data} =await getArticle(this.articleId)
            this.article=data.data

            //数据改变影响视图更新（DOM数据）不是立即的
            //如果需要再修改数据之后马上操作被该数据影响的视图DOM 需要使用$nextTick()
            //得到所有的img标签
            this.$nextTick(()=>{
                this.handPreviewimage()
            })

            //循环列表 给每个img添加点击事件
            //在事件处理函数中调用ImagePreview()预览
        },
        handPreviewimage(){
            //获取文章内容的DOM容器
            const articleContent = this.$refs["article-content"]
            const imgs=articleContent.querySelectorAll('img')
            const imgPth=[]
            imgs.forEach((img,index)=>{
                imgPth.push(img.src)
                img.onclick=function(){
                    ImagePreview({
                        images:imgPth,
                        startPosition:index
                    })
                }
            })
        },
        async onFollow(){
            this.isloadFollow=true
            if(this.article.is_followed){
                //已关注 取消关注
                await unfollow(this.article.aut_id)
            }else{
                //未关注 关注
                await isFollow(this.article.aut_id)
            }
            this.article.is_followed=!this.article.is_followed
            this.isloadFollow=false
        },

        async isCollect(article){
            this.isloadCollected=true
            if(article.is_collected){
                //已收藏 取消收藏
                await unCollect(this.articleId)
            }else{
                await isCollected(this.articleId)
            }
            article.is_collected=!article.is_collected
            this.isloadCollected=false
            this.$toast.success(`${this.article.is_collected ? '' : '取消'}收藏成功`)
        }
    }
}
</script>
<style lang="less" scoped>
    .article-center{
            position:fixed;
            left: 0;
            right: 0;
            top: 46px;
            bottom: 44px;
            overflow-y: auto;
        }
    .title{
        background-color: #fff;
        padding: 14px;
        font-size: 20px;
        color:#3a3a3a;
        margin:0
    }
    .image{
        width: 35px;
        height: 35px;
        margin-right: 8px;
    }
    .name{
        color: #333333;
        font-size: 12px;
    }
    .pudata{
        font-size: 11px;
        color: #b4b4b4;
    }
    .btn{
        width: 80px;
        height: 29px;
    }
    .markdown-body{
        padding:14px;
        background-color: #fff;
    }
    .article-bottom{
        width: 100%;
        height: 40px;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        right: 0px;
        left: 0px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 4px 0;
    }
    .commen-btn{
        width: 150px;
    }
    
</style>