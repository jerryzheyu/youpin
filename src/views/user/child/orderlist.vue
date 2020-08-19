<template>
  <div class="order">
     <head-info title="订单信息"></head-info>

    <van-tabs swipeable v-model="active" style="margin-top: 40px;" animated>
      <van-tab title="全部">
        <div class="des">
          <img src="../../../assets/noData.jpeg" alt style="display:block" />
          <p>暂时还没有相关订单</p>
        </div>
      </van-tab>
      <van-tab title="待支付">
         <div class="des">
          <img src="../../../assets/noData.jpeg" alt style="display:block" />
          <p>暂时还没有相关订单</p>
        </div>
      </van-tab>
      <van-tab title="待收货">
         <div class="des">
          <img src="../../../assets/noData.jpeg" alt style="display:block" />
          <p>暂时还没有相关订单</p>
        </div>
      </van-tab>
      <van-tab title="待评价">
        <div class="des">
          <img src="../../../assets/noData.jpeg" alt style="display:block" />
          <p>暂时还没有相关订单</p>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import headInfo from '@/components/headInfo';
export default {
  name: "orderlist",
  data() {
    return {
      active: this.$route.params.index,
    };
  },
  computed: {},
  components: {
    headInfo
  },
  methods: {},
  mounted() {
    console.log(this.$refs.f);
  },
};
</script>

<style lang="scss" scoped>
.order {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 999;
  .des {
    box-sizing: border-box;
    padding: 50px;
    text-align: center;
    color: #b1adad;
    img {
      width: 100%;
    }
  }
}
</style>