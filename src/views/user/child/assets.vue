<!--
 * @Author: 极客James
 * @Motto: 求知若渴,虚心若愚
 * @Github: https://github.com/Geek-James/ddBuy
 * @掘金: https://juejin.im/user/5c4ebc72e51d4511dc7306ce
 * @LastEditTime : 2019-12-24 14:01:13
 * @Description: 我的->我的优惠券
 * @FilePath: /ddBuy/src/views/mine/Children/CouponList.vue
 -->
<template>
  <div id="couponList">
    <head-info title="优惠券"></head-info>
    <!--优惠券列表-->
    <van-coupon-list
      :coupons="coupons"
      :chosen-coupon="chosenCoupon"
      style="margin-top:50px"
      input-placeholder="请输入520it兑换"
      @change="onChange"
      @exchange="onExchange"
    />
  </div>
</template>

<script type="text/javascript">
import headInfo from "@/components/headInfo";
export default {
  data() {
    return {
      chosenCoupon: 0,
      coupons: [
        {
          // 优惠券信息
          available: 1,
          condition: "无使用门槛\n最多优惠12元",
          reason: "",
          value: 150,
          name: "优惠券",
          startAt: 1549104000,
          endAt: 1614592000,
          valueDesc: "1.5",
          unitDesc: "元",
        },
        {
          // 优惠券信息
          available: 1,
          condition: "无使用门槛\n最多优惠32元",
          reason: "",
          value: 200,
          name: "优惠券",
          startAt: 1549104000,
          endAt: 1614592000,
          valueDesc: "1.5",
          unitDesc: "元",
        },
      ],
    };
  },
  components: {
    headInfo,
  },
  methods: {
    // 返回到上个界面
    onClickLeft() {
      this.$router.go(-1);
    },

    onExchange(code) {
      // 兑换优惠券
      if (code == "520it") {
        this.coupons.push(this.coupons[0]);
      }
    },
    onChange(index) {
      this.chosenCoupon = index;
    },
  },
};
</script>

<style lang="scss" scoped>
#couponList {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 999;
  .van-nav-bar__title {
    color: black;
  }
  .van-icon {
    color: #dedede;
  }
}
</style>
