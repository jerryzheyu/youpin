<template>
  <div id="userCenter">
    
    <head-info title="用户信息"></head-info>

    <van-cell-group style="margin-top: 50px;">
      <van-cell title="用户名"
                :value="userInfo.username"
                />
      <van-cell title="性别"
                :value="userInfo.sex"
                />
      <van-cell title="账号"
                :value="userInfo.num"
                 />
    </van-cell-group>

    <van-button size=large
                style="margin-top: 300px"
                @click="login_out">退出</van-button>

  </div>

</template>

<script>
import { mapState,mapActions } from 'vuex';
import headInfo from '@/components/headInfo';
export default {
  name: "userinfo",
  data () {
    return {
     
    }
  },
  components: {
    headInfo
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapActions(['login_out'])
  },
}
</script>

<style lang="scss" scoped>
#userCenter {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 999;
  
  /*转场动画*/
  .router-slider-enter-active,
  .router-slider-leave-active {
    transition: all 0.3s;
  }

  .router-slider-enter,
  .router-slider-leave-active {
    transform: translate3d(10px, 0, 0);
    opacity: 0;
  }
}
</style>