<template>
  <div class="kdls">
    <div class="search">
      
       <search  ref="serchH">
         <template #left>
          <van-icon name="arrow-left" color="#f4f4f4" @click="$router.back()"/>
      </template>
       </search>
    <div class="sx" :style="{marginTop:searchH+'px'}" ref="sx">
      <van-dropdown-menu>
      <van-dropdown-item v-model="value1" :options="option1" />
      <van-dropdown-item v-model="value2" :options="option2" />
    </van-dropdown-menu>
    </div>
    </div>
    
    <div class="li" :style="{top:searchH+sx+'px'}">
      <div class="cont" ref="cont">
       <div class="load">
          <van-loading v-if="showLoading"/>
       </div>
        <van-card
          :tag="item.hot?'热门':''"
          :price="item.price"
          :desc="item.good_des"
          :title="item.good_name"
          :thumb="item.img"
          :origin-price="item.old_price"
          v-for="item of list"
          :key="item.id"
          @click="get_details(item.id)"
        >
          <template #price-top>{{item.num|list_num}}销量</template>
        </van-card>
        <img src="../../assets/noData.jpeg" alt style="display:block" width="100%" v-if="list.length !== 0"/>
      </div>
    </div>
  </div>
</template>

<script>
import search from "@/components/search";
import { home_list } from "@/api/list";
import BScroll from "better-scroll";

export default {
  name: "kinds_list",
  data() {
    return {
      showLoading:false,
      value1: 0,
      value2: "a",
      searchH:"",
      sx:'',
      option1: [
        { text: "全部商品", value: 0 },
        { text: "热门商品", value: 1 },
      ],
      option2: [
        { text: "默认排序", value: "a" },
        { text: "价格排序", value: "b" },
        { text: "销量排序", value: "c" },
      ],
      list: [],
    };
  },
  watch: {
    value1() {
      this.order_hot();
    },
    value2() {
      this.order_num();
    },
  },
  created() {},
  mounted() {
    this.getList(this.$route.params.id);
   this.searchH = this.$refs.serchH.$el.clientHeight;
   
   this.sx = this.$refs.sx.clientHeight
  },

  components: {
    search
  },
  methods: {
    async getList(id) {
      let { list } = await home_list(id);
      this.list = list;
      this.$nextTick(() => {
        let ls = document.querySelector(".li");
        if (!this.scroll) {
          this.scroll = new BScroll(ls, {
            tap: true,
            scrollY: true,
            probeType: 3,
            click: true,
            pullDownRefresh:{
              threshold:20,
              stop:20
            }
          });
         
        }
  this.scroll.on('pullingDown',()=>{
        this.showLoading = true
        setTimeout(()=>{
          this.getList(this.$route.params.id).then(()=>{
          this.showLoading = false
         this.$toast('已更新')
          this.scroll.finishPullDown()
        });
        },1000)
      })
      });
      
    },
    order_hot() {
      if (this.value1 === 1) {
        this.list = this.list.filter((item) => item.hot === true);
      } else {
        this.getList(1);
      }
    },
    order_num() {
      if (this.value2 === "b") {
        this.list = this.list.sort((a, b) => a.price - b.price);
      } else if (this.value2 === "c") {
        this.list = this.list.sort((a, b) => b.num - a.num);
      } else {
        this.getList(1);
      }
    },
    get_details(id) {
      this.$router.push(`/details/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.kdls {
  width: 100%;
  height: 100%;
  .search {
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
  .van-icon {
    margin-left: 15px;
    font-size: 20px;
  }
  }
  .li {
    width: 100%;
    height: 100%;
    position: absolute;
   bottom: 0;

    overflow: hidden;

    .cont {
      
    margin-bottom: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
     .van-card {
       width: 100%;
     }
      .van-card__price {
        margin-left: 5px;
      }
    }
  }
}
</style>