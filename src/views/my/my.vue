<template>
    <div class="home">
       <van-cell-group v-if="user" class="group">
            <van-cell 
                center 
                class="base-info"
                :border="false"
            >
                <van-image 
                    slot="icon"
                    fit="cover"
                    class="image"
                    round
                    src="https://img.yzcdn.cn/vant/cat.jpeg" 
                />
                <div class="name" slot="title">小飞飞</div>
                <van-button
                    
                    size="small"
                    round
                    class="editor"
                    to="/userprofile"
                >
                    编辑资料
                </van-button>
            </van-cell>

            <van-grid :border="false">
                <van-grid-item class="items-info">
                    <div slot="text" class="item">
                        <div class="content">1223</div>
                        <div class="text">关注</div>
                    </div>
                </van-grid-item>
                <van-grid-item class="items-info">
                    <div slot="text" class="item">
                        <div class="content">236</div>
                        <div class="text">收藏</div>
                    </div>
                </van-grid-item>
                <van-grid-item class="items-info">
                    <div slot="text" class="item">
                        <div class="content">4263</div>
                        <div class="text">粉丝</div>
                    </div>
                </van-grid-item>
                <van-grid-item class="items-info">
                    <div slot="text" class="item">
                        <div class="content">234332</div>
                        <div class="text">获赞</div>
                    </div>
                </van-grid-item>
            </van-grid>      
       </van-cell-group>

       <div v-else class="onlogin">
           <div class="image" @click="$router.push('/login')">
               <img src="./phone.png" alt="">
           </div>
           <div 
             class="text">登陆/注册</div>
       </div>

       <van-grid :column-num="2">
            <van-grid-item 
                class="grid-item"
                icon-prefix="iconfont icon"
                icon="shoucang" 
                text="收藏" 
            />
            <van-grid-item 
                class="grid-item"
                icon-prefix="iconfont icon"
                icon="lishi" 
                text="历史" 
            />
       </van-grid>

       <van-cell title="消息通知" is-link to="" />

       <van-cell title="小智同学"
            is-link to="/wechart" 
        />

       <van-cell 
            v-if="user"
            class="loginout" 
            title="退出登录"
            @click="logout"
        />
    </div>
</template> 
<script>
import {mapState} from 'vuex'
import {userMessage} from '@/api/user'
import { Dialog } from 'vant';
export default {
    name:"home",
    data () {
        return {
            currentUser:{}  //用户个人信息
        }
    },
    computed: {
        ...mapState(["user"])
    },
    created () {
        // this.loadcurrentUser()
    },
    methods: {
        //加载用户信息
        // async loadcurrentUser(){
        //     const {data} = await userMessage()
        //     console.log(data)
        //     this.currentUser=data.data
        // },
        logout(){
            Dialog.confirm({
                title: '确认退出吗?',
                message: '如果退出了需要重新登录噢',
            })
            .then(() => {
                // 清除用户token
                this.$store.commit("setUser",null)
            })
            .catch(() => {
                // on cancel
            });
        },
    }
}
</script>
<style lang="less" scoped>
    .base-info{
        box-sizing: border-box;
        height: 115px;
        padding-top: 38px;
        padding-bottom: 11px;
    }
    .group{
        background: url("./手机.png") no-repeat;
        background-size: cover;
        .base-info{
            background: unset;
        }
        /deep/.van-grid-item__content{
            background: unset;
        }
    }
    .image{
        box-sizing: border-box;
        width:66px ;
        height:66px ;
        border: 1px solid #ffffff;
        margin-right: 11px;
    }
    .name{
        font-size: 15px;
        color: #fff;
    }
    .editor{
        height: 18px;
        font-size: 10px;
        color: #666666;
    }
    .items-info{
        height: 65px;
    }
    .content{
        font-size: 17px;
        color: #fff;
    }
    .text{
        color: #fff;
        font-size: 11px;
    }
    .item{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    /deep/.grid-item{
        height: 70px;
        .iconfont{
            font-size: 22px;
        }
        .icon-shoucang{
            color: #eb5253;
        }
        .van-grid-item__text{
            font-size: 14px;
            color: #333333;
        }
        .icon-lishi{
            color: #ff9d1d;
        }
    }
    .loginout{
        text-align: center;
        color: #d86262;
        margin-top: 10px;
    }
    .onlogin{
        height: 180px;
        background: url("./手机.png") no-repeat;
        background-size: cover;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .image{
            width: 66px;
            height: 66px;
            border: none;
        }
        .text{
            font-size: 15px;
            color: #fff;
            margin-top: 10px;
        }
    }
</style>