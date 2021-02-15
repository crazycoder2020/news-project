<template>
    <div class="container">
        <van-cell
            title="历史记录"
        >
            <div v-if="isShow">
                <span @click="$emit('update',[])">全部删除</span>
                &nbsp;&nbsp;
                <span @click="isShow=false">完成</span>
            </div>
            <van-icon 
                v-else
                name="delete"
                @click="isShow=true"
            />
        </van-cell>
        <van-cell
            v-for="(searchhistorys,index) in searchhistory"
            :key="index"
            :title="searchhistorys"
            @click="deletehistory(searchhistorys,index)"
        >   
            <van-icon 
                v-show="isShow" 
                name="close"
            />
        </van-cell>
    </div>
</template>
<script>
import {setItem} from '@/utils/storage'
export default {
    name:"SearchHistory",
    data () {
        return {
            isShow:false
        }
    },
    props:{
        searchhistory:{
            type:Array,
            required:true
        }
    },
    methods: {
        deletehistory(searchhistorys,index){
            if(this.isShow){ //如果是删除状态则删除
                this.searchhistory.splice(index,1)
                //数据持久化
                //1.修改本地储存数据
                setItem("search-history",this.searchhistory)
                return
                //2.请求接口修改线上数据
            }

            //非删除状态执行搜索
            this.$emit("search",searchhistorys)
        },
    }
}
</script>
<style lang="less" scoped>

</style>