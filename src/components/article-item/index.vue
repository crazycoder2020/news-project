<template>
    <van-cell 
        class="article-item"
        :to="{
            name:'article',
            params:{
                articleId : articles.art_id
            }
        }"                    
    >
        <div slot="title" class="title van-multi-ellipsis--l3">{{articles.title}}</div>

        <div slot="label">
            <div class="center-wrap" v-if="articles.cover.type===3">
                <div    class="center-item" 
                        v-for="(img,index) in articles.cover.images"
                        :key="index">
                    <van-image
                        width= "116"
                        height= "73"
                        fit="cover"
                        :src="img"
                    />
                </div>
            </div>

            <div class="footer">
                <span>{{articles.aut_name}}</span>
                <span>{{articles.comm_count}}评论</span>
                <span>{{articles.pubdate | relativeTim}}</span>
            </div>
        </div>

        <!-- 设置默认插槽 -->
        <van-image
            v-if="articles.cover.type===1"
            class="right-image"
            fit="cover"
            :src="articles.cover.images[0]"
        />
    </van-cell>
</template>
<script>
export default {
    name:"ArticleItem",
    data () {
        return {
            
        }
    },
    props:{
        articles:{
            type:Object,
            required:true
        }
    }
}
</script>
<style lang="less" scoped>
    .article-item{
        .title{
            font-size: 16px;
            color: #3a3a3a;
        }
        /deep/ .van-cell__value{
            flex: unset;
            width: 116px;
            height: 73px;
            margin-left: 12px;
        }
        .right-image{
            width: 116px;
            height: 73px;
        }
        /deep/.center-wrap{
            display: flex;
            flex-wrap: nowrap;
            padding: 13px 0;
            .center-item{
                &:not(:last-child){
                    padding-right: 4px;
                }
            }
        }
        .footer{
            font-size: 11px;
            color: #b4b4b4;
        }
        .footer span{
            margin-right: 12px;
        }
    }
</style>