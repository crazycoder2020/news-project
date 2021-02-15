<template>
    <div class="container">
        <van-cell
            v-for="(suggetion,index) in suggestions"
            :key="index"
            @click="$emit('search',suggetion)"
            icon="search"
        >
        <div slot="title" v-html="higthline(suggetion)"></div>
        </van-cell>
    </div>
</template>
<script>
import { searchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default { 
    name:"SearchSuggestion",
    data () {
        return {
            suggestions:[]
        }
    },
    props:{
        searchtext:{
            type:String,
            required:true
        }
    },
    watch: {
        //侦听输入内容发生变化
        searchtext:{ //侦听的数据名
            //debounce 函数防抖
            handler:debounce(async function(){
                const {data} =await searchSuggestions(this.searchtext)
                this.suggestions=data.data.options
            },200),

            //该回调会在侦听开始之后立即调用
            immediate:true
        }
    },
    methods: {
        higthline(suggetion){
            return suggetion.replace(
                //RegExp 正则表达式的构造函数
                new RegExp(this.searchtext,"gi"),
                `<span style="color:red">${this.searchtext}</span>`)
        }
    }
}
</script>
<style lang="less" scoped>

</style>