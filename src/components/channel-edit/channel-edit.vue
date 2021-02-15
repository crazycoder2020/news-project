<template>
    <div class="channel-edit">
        <van-cell center :border="false">
            <div slot="title" class="title">我的频道</div>
            <van-button
                type="danger"
                plain
                round
                size="mini "
                @click="isEdit=!isEdit"
            >
                {{isEdit ? '完成' : '编 辑'}}
            </van-button>
        </van-cell>

        <van-grid :gutter="10" :border="false">
            <van-grid-item 
                v-for="(channel,index) in userchannels" 
                :icon="(isEdit && index!==0) ? 'clear' : ''"
                :key="index"  
                class="grid-item"
                :class="{active:index===active}"
                :text="channel.name"
                @click="onUserChannelChange(index)"   
            />
        </van-grid>


        <van-cell center :border="false">
            <div slot="title" class="title">推荐频道</div>
        </van-cell>

        <van-grid :gutter="10">
            <van-grid-item 
                v-for="(channeledit,index) in recommendChannels" 
                :key="index"  
                :text="channeledit.name" 
                class="grid-item"
                @click="onAdd(channeledit)"
            />
        </van-grid>
    </div>
</template>
<script>
import {userChannel,addChannels} from '@/api/article'
import {mapState} from 'vuex'
import {setItem} from '@/utils/storage'
export default {
    name:"ChannelEdit",
    data () {
        return {
            allChannel:[] ,//所有频道列表数据
            isEdit:false 
        }
    },
    props:{
        userchannels:{
            type:Array,
            required:true
        },
        active:{
            type:Number,
            required:true
        }
    },
    created () {
        this.getChannel()
    },
    computed: {
    ...mapState(['user']),

    recommendChannels(){
        //filter方法过滤数据通过返回的布尔值true来收集数据
        return this.allChannel.filter(channel=>{
            //判断channel是否属于用户频道
            //find方法查找满足条件的单个元素
            return !this.userchannels.find(userchannels=>{
                //找到满足条件的元素
                return userchannels.id===channel.id
            })
        })
      }
    },
    methods: {
        async getChannel(){
            const {data} = await userChannel()
            this.allChannel=data.data.channels
        },

        async onAdd(channeledit){
            this.userchannels.push(channeledit)                              
            if(this.user){  //已登录在线储存 
               await addChannels({
                   channels:[
                       {
                           id:channeledit.id,
                           seq:this.userchannels.length
                       }
                   ]
               })
            }else{
                //未登录储存在本地
                setItem("onlogin-channels",this.userchannels)
            }
        },

        onUserChannelChange(index){
            //如果是编辑状态则删除
            if(this.isEdit && index!==0){
                this.onDelet(index);
            }else{
                //如果是完成状态则跳转
                this.onPush(index);
            }
        },
        onDelet(index){
            //解决删除后索引变化问题
            if(index<=this.active){
                this.$emit("pushactive",this.active-1)
            }
            this.userchannels.splice(index,1)
            //数据持久化
            
        },
        onPush(index){
            //关闭弹层
            this.$emit("close")

            //切换到相对应的频道数据列表
            this.$emit("pushactive",index)
        }
    },
}
</script>
<style lang="less" scoped>
    .channel-edit{
        padding-top: 54px;
        .title{
            font-size: 16px;
            color: #333333;
        }
        .van-button{
            width: 60px;
        }
        .grid-item{
            width: 80px;
            height: 43px;
        }
        /deep/.van-grid-item__content{
            background-color: #f4f5f6;
            .van-grid-item__text{
                font-size: 14px;
                color: #222;
                margin-top: 0;
            }
        }
        /deep/.van-grid-item__icon{
            position: absolute;
            right: 2px;
            top: -5px;
            font-size: 20px;
            color: #ccc;
        } 
        .active{
            /deep/.van-grid-item__text{
                color: red;
            }
        }  
    }
</style>