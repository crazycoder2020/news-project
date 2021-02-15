<template>
    <div class="container">
        <van-picker
            show-toolbar
            :columns="columns"
            @cancel="$emit('close')"
            @confirm="onConfirm"
            :default-index='0'
        />
    </div>
</template>
<script>
export default {
    name:"UserSex",
    data () {
        return {
            value: '',
            showPicker: false,
            columns: ['男','女'],
        }
    },
    methods: {
        onConfirm(value) {
            this.value = value;
            this.$emit('close')
        },
    },
}
</script>
<style lang="less" scoped>

</style>