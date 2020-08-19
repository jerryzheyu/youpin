<template>
  <div class="userset">
    <van-cell is-link to="login" :border="false" v-if="!token">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <div class="temp">
          <div class="userIcon">
            <img
              src="https://img.youpin.mi-img.com/shopcenter/415b0fd8150f58ee2b85caa2ee9cef8f.png"
              width="60px"
              alt
            />
          </div>
          <span>请登录</span>
        </div>
      </template>
    </van-cell>

    <van-cell is-link to="/user/userinfo" :border="false" v-else>
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <div class="temp">
          <div class="userIcon">
            <img :src="userInfo.icon" width="60px" alt />
          </div>
          <span>{{userInfo.username}}</span>
        </div>
      </template>
    </van-cell>
    <van-cell title="我的订单" is-link to="/user/orderlist" />
    <van-grid :border="false">
      <van-grid-item
        :icon="item.ic"
        :text="item.tit"
        v-for="(item,index) of order_ks"
        @click="goTomyOrder(index)"
        :key="index"
      />
    </van-grid>
    <van-cell title="我的优惠" is-link to="/user/assets" value="优惠券/积分" icon="balance-o" class="zc" />

    <van-cell title="地址管理" is-link to="/user/adress" icon="location-o" />
    <van-cell title="客服联系" is-link value="24小时服务" icon="balance-o" class="zc" />
    <van-cell title="意见反馈" is-link @click="showPopup" icon="newspaper-o" />
    <van-popup v-model="show">
      <img src="../../assets/6e29114e70070fe34984ceaeb502ed9.jpg" width="250px" alt />
    </van-popup>
    <transition name="router-slider" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "User",
  data() {
    return {
      show: false,
      order_ks: [
        { ic: "paid", tit: "待付款" },
        { ic: "logistics", tit: "待收货" },
        { ic: "comment-o", tit: "评价" },
        { ic: "cash-back-record", tit: "退款/售后" },
      ],
    };
  },
  components: {},
  computed: {
    ...mapState(["userInfo"]),
    ...mapState(["token"]),
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    goTomyOrder(index) {
      this.$router.push({ name: "orderlist", params: { index: index + 1 } });
    },
  },
};
</script>

<style lang="scss" scoped>
.userset {
  background-color: rgb(244, 244, 244);
  height: 100%;
  overflow: auto;
  .zc,
  .zz {
    margin-top: 5px;
  }
}

.van-cell {
  align-items: center;
  &:first-child {
    background: url(https://m.xiaomiyoupin.com/youpin/static/m/res/images/ucenter/ucenter_bg_top.png)
      no-repeat center;
    background-size: 100% 100px;
  }

  .temp {
    display: flex;
    align-items: center;
    padding: 10px 0;
    .userIcon {
      display: flex;
      align-items: center;
    }
    span {
      margin-left: 10px;
      color: #ffffff;
    }
  }
}
.router-slider-enter-active,
.router-slider-leave-active {
  transition: all 0.3s;
}

.router-slider-enter,
.router-slider-leave-active {
  opacity: 0;
}
</style>