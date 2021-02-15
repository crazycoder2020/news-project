<template>
    <div class="container">
        <!-- 顶部搜索栏 -->
        <form action="/">
            <van-search
                v-model="searchText"
                show-action
                placeholder="请输入搜索关键词"
                @search="onSearch"
                @cancel="$router.back()"
                @focus="isResultsShow=false"
            />  
        </form>

        <!-- 搜索结果 -->
        <SearchResult 
            v-if="isResultsShow"
            :searchtext="searchText"
        />

        <!-- 联想建议 -->
        <SearchSuggestion 
            v-else-if="searchText"
            @search="onSearch"
            :searchtext="searchText"
        />

        <!-- 历史记录 -->
        <SearchHistory 
            v-else
            :searchhistory="searchHistory"
            @search="onSearch"
            @update="searchHistory=$event"
        />
    </div>
</template>
<script>
import SearchSuggestion from './components/search-suggestion'
import SearchHistory from './components/search-history'
import SearchResult from './components/search-results'
import {setItem,getItem} from '@/utils/storage'
import {searchHistorys} from '@/api/search'
import {mapState} from 'vuex'
export default {
    name:"SearchIndex",
    data () {   
        return {
           searchText:"" ,//输入框输入的内容
           isResultsShow:false,
           searchHistory:[]
        }
    },
    components: {
        SearchSuggestion,
        SearchHistory,
        SearchResult
    },
    created () {
        this.loadSearchhistory()
    },
    computed: {
        ...mapState(["user"])  
    },
    watch: {
        searchHistory(){
            setItem("search-history",this.searchHistory)
        }
    },
    methods: {
        //确认搜索
        onSearch(searchtext){
            this.searchText=searchtext

            const index =this.searchHistory.indexOf(searchtext)
            if(index!==-1){
                //把重复的删除
                this.searchHistory.splice(index,1)
            }
            //记录搜索历史放到顶部
            this.searchHistory.unshift(searchtext)

            //将搜索的结果放到本地存储
            
            this.isResultsShow=true
        },
    
        async loadSearchhistory(){
            const localhistory = getItem("search-history") || []
            // if(this.user){
            //     const {data} = await searchHistorys()
            //     console.log(data.data.keywords)
            //     //数组去重 合并          
            //     localhistory= [...new Set([
            //         ...localhistory,
            //         ...data.data.keywords
            //     ])] 
            // }

            this.searchHistory=localhistory
        }
    }
}
</script>
<style lang="less" scoped>

</style>                                                                                                