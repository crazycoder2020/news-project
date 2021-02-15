<template>
    <div class="container">
        <van-nav-bar
            title="小智同学"               
            left-arrow
            @click-left="$router.back()"
            class="app-nav-bar"
        />

        <van-cell-group class="message-group">
            <van-cell
                :title="item.msg"
                v-for="(item,index) in messages"
                :key="index"
            >
            </van-cell>
        </van-cell-group>
        
        <van-cell-group class="message-wrap">
            <van-field
                v-model="message"
                placeholder="请输入消息"
                :boder="false"
            />
            <van-button
                type="primary"
                size="small"
                @click="onSend"
            >
                发送 
            </van-button>
        </van-cell-group>
    </div>
</template>
<script>
import io from 'socket.io-client'

export default {
    name:"WeChart",
    data () {
        return {
            message:'',
            messages:[], //接收和发送的数据
            socket:null,//创建的通信实例
        }
    },
    created () {
        //建立连接
        // const socket = io("http://ttapi.research.itcast.cn/app/socket.io")
        // this.socket=socket

        // socket.on("connect",()=>{
        //     console.log("建立连接成功!")
        // })

        // //断开连接
        // socket.on("disconnect",()=>{
        //     console.log("断开连接了")
        // })

        // //监听message变化 接收服务端的消息
        // socket.on('message',data=>{
        //     //把对方发给我的消息放到数据中
        //     this.messages.push(data)
        // })
    },
    methods: {
        onSend(){
            // //请求发送消息
            // const data={
            //     msg:this.message,
            //     timestamp:Date.now()
            // }
            // this.socket.emit("message",data)

            // //把用户发出去的消息存到数组中
            // this.messages.push(data)

            // //清空输入框
            // this.message=''
        }
    }
}
</script>
<style lang="less" scoped>
    .message-wrap{
        position:fixed;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 0 14px;
        display: flex;
        align-items: center;
    }
    .van-button__content{
        width: 50px;
    }
    .message-group{
        position: fixed;
        left:0;
        right: 0;
        top: 46px;
        bottom: 44px;
        overflow-y: auto;
    }
</style>