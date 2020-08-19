<template>

  <div class="main">
    <div class="container" ref="cont">
      <div class="item" v-for="(item) of home_list" :key="item.id" @click="enter_detail(item.id)">
        <div class="img">
          <img
            v-lazy="item.img"
            alt
            width="100%"
          />

          <div class="Label">
            <span class="ite" v-if="item.hot">热门</span>
          </div>
        </div>

        <div class="words">
          <span class="title">{{item.good_name}}</span>
          <span class="describe">{{item.good_des}}</span>
        </div>
        <div class="price">
          <p class="nowprice">{{item.price|handle_price}}</p>
          <p class="oldprice">{{item.old_price}}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { home_list } from "@/api/list";
import BScroll from "better-scroll";
export default {
  name: "home_list",
  data() {
    return {
      home_list:[]
    };
  },
  created() {
    this.getList(1);
  },
  mounted() {
   
  },
  components: {
    
  },
  methods: {
    async getList(index) {
      let { list } = await home_list(index);
      this.home_list = list
    },
    enter_detail(id){
      this.$router.push({path:`/details/${id}`,params:{id}})
    }
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 15px;

  .container {
    
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(2, 50%);
    &::after{
        content: '';
        display: block;
        width: 100%;
        height: 55px;
      }
    .item {
      padding: 5px;
      box-sizing: border-box;
      
      .img {
        background-color: #fff;
        position: relative;
        img {
          vertical-align: middle;
        }
        .Label {
          width: 100%;
          .ite {
            position: absolute;
            bottom: 0;
            padding: 1px 5px;
            box-sizing: border-box;
            color: #fff;
            background-color: rgb(217, 107, 108);
            margin-right: 5px;
          }
        }
      }

      .words {
        display: flex;
        flex-direction: column;
        .title {
          box-sizing: border-box;
          padding: 2px 2px;
          font-size: 15px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .describe {
          box-sizing: border-box;
          padding: 0 2px;
          font-size: 13px;
          color: rgb(153, 153, 153);
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .price {
        display: flex;
        align-items: center;
        .nowprice {
          font-size: 17px;
          color: red;
          margin-right: 3px;
        }
        .oldprice {
          text-decoration: line-through;
          font-size: 14px;
          color: rgb(153, 153, 153);
        }
      }
    }
  }
 
}
</style>