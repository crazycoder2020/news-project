<template>
    <div class="container">
        <van-nav-bar
            title="个人信息"               
            left-arrow
            @click-left="$router.back()"
            class="app-nav-bar"
        />
        <van-cell title="头像" is-link center>
            <van-image
                width="30"
                height="30"
                round
                size="small"
                fit="cover"
                src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
        </van-cell>
        <van-cell title="昵称" is-link value="小飞飞" @click="show=true"></van-cell>
        <van-cell title="性别" is-link value="男" @click="Sexshow=true"></van-cell>
        <van-cell title="生日" is-link value="1999-11-20"></van-cell>

         <van-popup 
            v-model="show" 
            position="bottom" 
            :style="{ height: '100%' }" 
        >
           <UserName
                @close="show=false"
           />
        </van-popup>

        <van-popup 
            v-model="Sexshow" 
            position="bottom" 
            :style="{ height: '35%' }" 
        >
           <UserSex
                @close="Sexshow=false"
           />
        </van-popup>

    </div>                      
</template>
<script>
import {getUserProfile} from '@/api/user'
import UserName from './components/UserName'
import UserSex from './components/UserSex'
export default {
    name:"userProfile",
    data () {
        return {
            show:false ,
            Sexshow:false                     
        }
    },
    created(){
        // this.loaduserProfile()
    },
    components:{
        UserName,
        UserSex
    },
    methods:{
    //    async loaduserProfile(){
    //        const {data} = await getUserProfile()
    //        console.log(data)
    //     }
    }
}
</script>
<style lang="less" scoped>
    .van-popup{
        background-color:#f5f7f9 ;
    }
</style>