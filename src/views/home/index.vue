<template>
  <layout>
    <search>
      <template #left>
        <img
          src="https://img.youpin.mi-img.com/static/weex_images/v1/m/navi_title_v6.png"
          alt
          style="    width: 36px;
    height: 28px;margin-left:10px"
        />
      </template>
    </search>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img
          src="https://img.youpin.mi-img.com/test/4059bd7f0e4ed910d1bd16ac8f9507f5.jpeg@base@tag=imgScale&h=320&w=750"
          alt
          style="     width: 100%;
    height: 160px;"
        />
      </van-swipe-item>
      <van-swipe-item>
        <img
          src="https://img.youpin.mi-img.com/test/4059bd7f0e4ed910d1bd16ac8f9507f5.jpeg@base@tag=imgScale&h=320&w=750"
          alt
          style="    width: 100%;
    height: 160px;"
        />
      </van-swipe-item>
      <van-swipe-item>
        <img
          src="https://img.youpin.mi-img.com/test/4059bd7f0e4ed910d1bd16ac8f9507f5.jpeg@base@tag=imgScale&h=320&w=750"
          alt
          style="    width: 100%;
    height: 160px;"
        />
      </van-swipe-item>
      <van-swipe-item>
        <img
          src="https://img.youpin.mi-img.com/test/4059bd7f0e4ed910d1bd16ac8f9507f5.jpeg@base@tag=imgScale&h=320&w=750"
          alt
          style="    width: 100%;
    height: 160px;"
        />
      </van-swipe-item>
    </van-swipe>

    <hot-icon></hot-icon>

    <div class="daymore">
      <div class="title">
        <h3>每日上新</h3>

        <span @click="kinds_list(12)">更多</span>
      </div>

      <div class="dayNew">
        <div class="main">
          <div class="item" v-for="(item) of dayNews" :key="item.id" @click="et_detail(item.id)">
            <img v-lazy="item.imgUrl" alt style="width:93px;height:93px" />
            <div>{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>

    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="item in kinds" :title="item">
        <homelist></homelist>
      </van-tab>
    </van-tabs>
  </layout>
</template>

<script>
import search from "@/components/search";
import layout from "@/components/layout";
import hotIcon from "./hotIcon";
import homelist from "./home_list";
import { mapState } from "vuex";
import { daynews } from "@/api/list";
import BScroll from "better-scroll";
export default {
  name: "Home",
  components: {
    search,
    hotIcon,
    homelist,
    layout,
  },
  data() {
    return {
      active: 0,
      dayNews: [],
      kinds: ["上衣", "手机", "家具", "图书"],
    };
  },
  mounted() {
    this.getDaynews();
  },
  computed: {
    ...mapState(["height"]),
  },
  methods: {
    async getDaynews() {
      let { img } = await daynews();
      this.dayNews = img;
    },
    et_detail(id) {
      this.$router.push({ path: `/details/${id}`, params: { id } });
    },
    kinds_list(id) {
      this.$router.push({ path: `/kinds_list/${id}`, params: { id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.daymore {
  .title {
    display: flex;
    justify-content: space-between;
    margin: 10px 15px;
    align-items: center;
  }
  .dayNew {
    width: 100%;
    overflow-x: scroll;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    &::-webkit-scrollbar {
      display: none; /*隐藏滚动条*/
    }
    .main {
      border: 0px solid black;
      box-sizing: border-box;
      padding: 0 0 0 15px;
      display: flex;
      width: 500px;
      margin-bottom: 10px;
      .item {
        width: 100px;

        margin-right: 15px;
        &:nth-child(odd) {
          background-color: rgb(252, 247, 241);
        }
        &:nth-child(even) {
          background-color: rgb(237, 246, 248);
        }
        text-align: center;
      }
    }
  }
}
</style>

