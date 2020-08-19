<template>
  <div id="main">
   <head-info title="地址管理"></head-info>
    <div class="emt" v-if="Object.keys(shippingAddress).length == 0">
      <img src="../../../assets/noData.jpeg" alt="" style="display:block">
      <p>还没添加地址呢</p>
    </div>
    <van-address-list
    style="margin-top: 40px;"
      v-model="chosenAddressId"
      :list="shippingAddress"
     
      
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
    <transition name="router-slider"
                mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import headInfo from "@/components/headInfo";
import { mapState } from 'vuex';
export default {
  name: "adress",
  data() {
    return {
      chosenAddressId: '1',
    };
  },
  computed: {
    ...mapState(['shippingAddress'])
  },
  components: {
    headInfo
  },
  methods: {
    onAdd(){
      this.$router.push('/user/adress/adress_edit')
    },
    onEdit (item) {
      this.$router.push({ name: 'adress_edit', params: { content: item } });
    },
  },
};
</script>

<style lang="scss" scoped>
#main {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 999;
    .emt {
    box-sizing: border-box;
    padding: 50px;
    text-align: center;
    color: #b1adad;
    img {
      width: 100%;
    }
  }
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