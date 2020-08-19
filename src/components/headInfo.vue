<template>
    <van-nav-bar :title="title"
                 :fixed=true
                 :border=false
                 @click-left="$router.back()"
                 left-arrow
                 style="height:20px;padding:10px 5px;" />
</template>

<script>
export default {
  name: "headInfo",
  data () {
    return {
    }
  },
  props:['title'],
  components: {
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>

</style>