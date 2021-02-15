<template>
    <div class="container">
        <van-nav-bar
            title="修改昵称"
            left-text="取消"
            right-text="完成"
            @click-left="$emit('close')"
            @click-right="onClickRight"
        />

        <!-- 输入框 -->
        <div class="input">
            <van-field
                v-model="message"
                rows="2"
                autosize
                type="textarea"
                maxlength="50"
                placeholder="请输入留言"
                show-word-limit
            />
        </div>
    </div>
</template>
<script>    
export default {
    name:"UserName",
    data () {
        return {
            message:'小飞飞'
        }
    },
    props:{
        
    },
    methods: {
        onClickRight(){

        }
    }
}
</script>
<style lang="less" scoped>
    .input{
        padding: 5px;
    }
</style>