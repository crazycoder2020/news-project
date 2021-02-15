<template>
    <div class="login-container">
        <van-nav-bar
            title="注册/登录"               
            left-arrow
            @click-left="$router.back()"
            class="app-nav-bar"
        />
        <!-- 显示输入手机号 -->
        <van-form 
            :show-error="false"
            :show-error-message="false"
            ref="coded"
            validate-first
            @submit="Onlogin"
            @failed="faile"
        >
            <van-field
                icon-prefix="iconfont icon"
                v-model="user.mobile"
                left-icon="shouji"
                placeholder="请输入手机号"
                name="mobile"
                center
                :rules="formDate.mobile"
            />
            <van-field
                icon-prefix="iconfont icon"
                v-model="user.code"
                clearabl
                left-icon="yanzhengma"
                placeholder="请输入验证码"
                name="code"
                :rules="formDate.code"
                center
            >
            <template #button>
                <van-count-down
                    v-if="iscountShow" 
                    :time="1000*60" 
                    @finish="iscountShow=false"
                    format="ss s"
                />
                <van-button 
                   v-else
                   class="send-code"
                   size="small" 
                   round
                   :loading="isshowLoding"
                   @click.prevent="sendcode"
                >
                发送验证码</van-button>
            </template>
            </van-field>
        <div class="login">   
            <van-button 
                class="login-btn" 
                type="info" 
                block
            >登录</van-button>
        </div>
        </van-form>
    </div>
</template>
<script>
import {userlogin,usercode} from '@/api/user'
import {Toast} from 'vant'
export default {
    name:"login",
    data () {
        return {
            user:{
                mobile:"", //手机号
                code:""    //验证码
            },
            formDate:{
                mobile:[
                    { required: true, message: '请输入手机号' },
                    { pattern:/^1(3|4|5|6|7|8|9)\d{9}$/,message:'手机号格式错误'}
                ],
                code:[ 
                    {required: true, message: '请输入验证码'},
                    { pattern:/^\d{6}$/,message:'验证码格式错误'} 
                ]
            },
            iscountShow:false,
            isshowLoding:false
        }
    },
    methods: {
        //点击登录操作
        async Onlogin(){ 
            Toast.loading({
                message: '登录中...',
                forbidClick: true,
                duration:0
            });
            try{
                const { data }= await userlogin(this.user)
                //处理响应结果
                Toast.success('登录成功');

                //将后端返回的token等数据放到vuex容器
                this.$store.commit('setUser',data.data)

                //登录后跳转到个人页面
                this.$router.back()
            }catch(err){
                console.dir(err)
                Toast.fail('登录失败,手机号或验证码不正确');
            }
        },

        //提交表单验证失败操作
        faile(error){
            if(error.errors[0]){
                Toast({
                    message:error.errors[0].message,
                    position:"top"
                })
            }
        },

        //获取验证码
        async sendcode(){
            try {
                await this.$refs["coded"].validate('mobile');
                this.isshowLoding=true
                //验证通过 请求发送验证码
                const res=await usercode(this.user.mobile)
                //点击发送启动倒计时
                this.iscountShow=true
            }catch(err){
                let message=""
                if(err && err.response && err.response.status===429){
                        message="发送的太频繁了,请稍后重试"
                }else if(err.name==="mobile"){
                        message=err.message
                }else{
                    message="发送失败,请稍后重试"
                }
                //提示用户
                Toast({
                    message,
                    position:"top"
                })
            }
            this.isshowLoding=false
        }
    }
}
</script>
<style lang="less" scoped>
    .login{
        padding:26px 16px;
        .login-btn{
            background-color: #6db4fb;
            border: none;
            font-size: 15px;
        }
    }
    .send-code{
        width: 78px;
        height: 23px;
        background-color:#ededed;
        .van-button__text{
            font-size: 12px;
            color: #666666;
        }
    }
    
    .bgc{
        background-color: #ffffff;
    }
    
</style>