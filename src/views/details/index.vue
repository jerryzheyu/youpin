<template>
  <div class="main">
    <van-loading size="24px" v-if="show">加载中...</van-loading>
    <van-nav-bar
      title="商品详情"
      left-arrow
      @click-left="onClickLeft"
      fixed
      ref="head"
      :style="{marginBottom:height+'px'}"
    />
    <div class="head_img">
      <img
        src="https://img.youpin.mi-img.com/shopmain/a9782a34dac9a4acef69cbbbde86bfe2.jpg?w=1080&h=1080&w=1080&h=1270&crop=a_0_95_1080_1080"
        alt
        width="100%"
      />
    </div>
    <div class="des">
      <div class="price">
        <span class="nowPrice">{{goods.price|handle_price}}</span>
        <span class="oldPrice">{{goods.old_price|handle_price}}</span>
        <span class="label">热门</span>
      </div>

      <div class="title">{{goods.good_name}}</div>
      <div class="goods_des">{{goods.good_des}}</div>
    </div>

    <div class="info">
      <van-cell-group>
        <van-field name="stepper" label="已选" input-align="right">
          <template #input>
            <van-stepper v-model="num" />
          </template>
        </van-field>
        <van-cell title="质量" value="内容" />
        <van-cell title="保证" value="内容" />
      </van-cell-group>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" :badge="all_count" to="/cart" />
      <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
      <van-goods-action-button type="warning" text="加入购物车" @click="add_goods(goods)" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
    <div class="details_img">
      <img
        width="100%"
        src="https://img.youpin.mi-img.com/shopmain/f52e1a9a23b1e87e41762cc5ec8ade42.jpg?w=864&h=1560"
        alt
        style="display:block;"
      />
      <img
        width="100%"
        src="https://img.youpin.mi-img.com/shopmain/7bc65e625816a899312fb88d89b7f8bf.jpg?w=864&h=528"
        alt
        style="display:block;"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import { details } from "@/api/list";
export default {
  name: "index",
  data() {
    return {
      height: "46",
      goods: {},
      num: 1,
      show:false
    };
  },
  computed: {
    ...mapState(["shop_cart", "token"]),
    ...mapGetters(["all_count"]),
  },
  mounted() {
    
  },
  created() {
    this.show = true
    this.$nextTick(() => {
      this.getheight();
    });
    
    this.getGoodsInfo(this.$route.params.id).then(()=>{
      setTimeout(()=>{
          this.show = false
      },100)
    })
  },
  components: {},
  watch: {
    //   num(val, oldVal){
    //       this.goods.num = val
    //   }
  },
  methods: {
    ...mapActions(["goods_cart"]),
    onClickLeft() {
      this.$router.back();
    },
    getheight() {
      this.height = this.$refs.head.$refs.navBar.clientHeight;
    },
    async getGoodsInfo(id) {
      let { goods } = await details(id);
      this.goods = goods;
    },
    add_goods(data) {
      if (this.token !=='') {
     
        data.num = this.num;
        this.goods_cart(data);
        this.$toast('已添加')
      }else{
        this.$toast('未登录')
        this.$router.push('/login')
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding-bottom: 50px;
  .van-loading{
    height: 100vh;
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  .des {
    .price {
      display: flex;
      align-items: center;
      margin: 20px 0;
      .nowPrice {
        color: #b60909;
        font-size: 25px;
        font-weight: bold;
        margin: 5px 5px 5px 15px;
      }
      .oldPrice {
        color: rgb(153, 153, 153);
        text-decoration: line-through;
        text-decoration-line: line-through;
        text-decoration-style: initial;
        text-decoration-color: initial;
        font-size: 13px;
        margin-right: 5px;
      }
      .label {
        font-size: 9px;
        color: #bf1111;
        box-sizing: border-box;
        background-color: rgb(226, 221, 221);
        border-radius: 10px;
        padding: 4px;
      }
    }

    .title {
      color: rgb(51, 51, 51);
      font-size: 17px;
      font-weight: bold;
      margin-left: 15px;
    }
    .goods_des {
      font-size: 13px;
      color: rgb(51, 51, 51);
      margin: 10px 0 10px 15px;
    }
  }
}
</style>