<template>
    <div class="search">
       <slot name="left"></slot>
        <van-search v-model="value" placeholder="请输入搜索关键词" shape="round" background="#845d32">
            
        </van-search>
        <slot name="right"></slot>
    </div>
</template>

<script>
export default {
  name: "search",
  data () {
    return {
        value:''
    }
  },
  components: {
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
    .search{
        display: flex;
        align-items: center;
        background-color: #845d32;
        box-sizing: border-box;
        .van-search{
            width: 100%;
        }
    }
</style>