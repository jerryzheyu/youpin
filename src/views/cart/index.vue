<template>
  <div class="main">
    <div class="cont" :style="{paddingBottom:subHeight+'px'}">
      <div class="head">
        购物车
        <span @click="del_goods" v-if="shop_cart.length !==0">删除</span>
      </div>
      <div class="emt" v-if="shop_cart.length == 0">
        <img src="../../assets/noData.jpeg" alt style="display:block" />
        <van-button round type="info" color="#845F3F" @click="$router.push('/')">去首页</van-button>
      </div>
      <div class="cartsList" :style="{marginBottom:subHeight+'px'}">
        <div class="goods" v-for="(item) of shop_cart">
          <van-checkbox v-model="item.checked" checked-color="#07c160">
            <div class="main">
              <div class="goodsImg">
                <img
                  height="76px"
                  src="https://img.youpin.mi-img.com/shopmain/858d806e8e930f0b914d77f1f75a7947.jpg@base@tag=imgScale&h=186&w=186"
                  alt
                  style="display:block"
                />
              </div>
              <div class="info">
                <div class="goodsTitle">{{item.good_name}}</div>
                <div class="goodsNum" @click.stop>
                  <van-field name="stepper" :label="item.price|handle_price" input-align="right">
                    <template #input>
                      <van-stepper v-model="item.num" />
                    </template>
                  </van-field>
                </div>
              </div>
            </div>
          </van-checkbox>
        </div>
      </div>

      <van-submit-bar
        :price="total|total_price"
        button-text="提交订单"
        @submit="onSubmit"
        :style="{bottom:height+'px'}"
        v-show="shop_cart.length !==0"
        ref="sub"
      >
        <van-checkbox v-model="is_all">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Cart",
  data() {
    return {
      subHeight: "",
    };
  },
  components: {},
  mounted() {
    this.getSubHeight();
  },
  methods: {
    ...mapMutations(["SELECT_ALL", "DEL_GOODS_CART"]),
    onSubmit() {},
    del_goods() {
      if (this.is_all) {
        this.$dialog
          .confirm({
            title: "确认删除",
          })
          .then(() => {
            // on confirm
            this.DEL_GOODS_CART(this.is_all);
            this.$toast("已全删");
          })
          .catch(() => {
            // on cancel
          });
      }

      this.$dialog
        .confirm({
          title: "确认删除",
        })
        .then(() => {
          // on confirm
          this.shop_cart.forEach((item) => {
            if (item.checked) {
              this.DEL_GOODS_CART();
              this.$toast("已删除");
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    getSubHeight() {
      this.subHeight = this.$refs.sub.clientHeight;
    },
  },
  computed: {
    ...mapState(["shop_cart", "height"]),
    is_all: {
      get() {
        return this.shop_cart.every((item) => {
          return item.checked == true;
        });
      },
      set(value) {
        this.SELECT_ALL(value);
      },
    },
    total() {
      let sum = 0;

      this.shop_cart.forEach((item) => {
        if (item.checked) {
          sum += item.price * item.num;
        }
      });
      return sum;
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  background-color: #f4f4f4;
  height: 100%;

  .head {
    background-color: #fff;
    position: fixed;
    top: 0;
    z-index: 100;
    height: 46px;
    width: 100%;
    line-height: 46px;
    text-align: center;
    font-size: 17px;
    font-weight: bold;
    span {
      position: absolute;
      right: 10px;
      font-weight: normal;
    }
  }
  .emt {
    box-sizing: border-box;
    padding: 50px;
    text-align: center;
    color: #b1adad;
    img {
      width: 100%;
    }
  }
  .van-cell {
    padding: 0;
  }
  .cartsList {
    margin: 46px 0 0 0;

    .goods {
      margin-bottom: 10px;
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      padding: 10px 10px 10px 26px;
      margin: 10px 0;
      .main {
        background-color: #fff;
        display: flex;
        .goodsImg {
          margin: 0 5px 0 15px;
        }
        .info {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .goodsTitle {
            width: 150px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 14px;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>