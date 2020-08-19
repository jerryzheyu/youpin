<template>
  <van-tabbar v-model="active" active-color="#845F3F" inactive-color="#646566" route ref="tab">
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/kinds">分类</van-tabbar-item>
    <van-tabbar-item icon="cart-o" to="/cart" :badge="all_count">购物车</van-tabbar-item>
    <van-tabbar-item icon="manager-o" to="/user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex';
export default {
  name: "tabBar",
  data() {
    return {
     active:0,
     
    };
  },
  computed: {
    ...mapGetters(['all_count'])
  },
  created() {
    this.$nextTick(() => {
      this.getheight();
    });
  },
  methods: {
    ...mapMutations(['innerHeight']),
    getheight() {
     let h = this.$refs.tab.$refs.tabbar.clientHeight;
     this.innerHeight(h)
    },
  },

};
</script>


<style scoped lang="scss">

</style>
