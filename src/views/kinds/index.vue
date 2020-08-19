<template>
  <div id="container">
    <search class="search" ref="serchH"></search>
    <div class="content" :style="{paddingTop:serchHeight+'px',paddingBottom:height+'px'}">
      <div class="sidebar" ref="left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            :title="item"
            v-for="(item,index) of goodsKinds"
            :key="item.index"
            @click="kinds(activeKey)"
          />
        </van-sidebar>
      </div>

      <div class="main" :style="left" >
        <div class="cont" :style="{paddingTop:serchHeight-40+'px '}">
          <div class="navimg">
            <img :src="subKinds.navUrl" alt />
          </div>

          <div class="item" v-for="(subItem ,index) in subKinds.Category">
            <p>{{subItem.subCategory}}</p>
            <div class="mainItem">
              <div
                class="listItem"
                v-for="(listItem ,index) of subItem.list"
                @click="kinds_list(listItem.id)"
              >
                <div class="pic">
                  <div class="picitem">
                    <img v-lazy="listItem.imgUrl" alt width="100%" />
                  </div>
                  <div class="itemlabel" v-show="listItem.label">
                    <img
                      src="https://img.youpin.mi-img.com/editor1/0295fc6232b4042f95f9ada568438ce0.png?w=60&h=60"
                      width="25px"
                      height="25px"
                      alt
                    />
                  </div>
                </div>
                <div class="itemTile">{{listItem.title}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Category } from "@/api/list";
import search from "@/components/search";
import { mapState } from "vuex";
import BScroll from "better-scroll";
export default {
  name: "Kinds",
  data() {
    return {
      activeKey: 0,
      goodsKinds: [
        "为你推荐",
        "今日上新",
        "手机电脑",
        "家用电器",
        "图书娱乐",
        "虚拟服务",
        "清洁用品",
        "男士服装",
        "鞋包头饰",
        "女士服装",
        "文化用品",
      ],
      subKinds: {},
      serchHeight: "",
      leftH: "",
      lis:{

      }
    };
  },
  components: {
    search,
  },
  computed: {
    ...mapState(["height"]),
    left() {
      return `width:calc(100% - ${this.leftH}px)`;
    },
  },
  created() {},
  mounted() {
    this.serchHeight = this.$refs.serchH.$el.clientHeight;
    this.leftH = this.$refs.left.clientWidth;
    this.kinds();
  },
  methods: {
    async kinds() {
      let { data } = await Category();

      this.subKinds = data;

      this.$nextTick(() => {
        let sider = document.querySelector(".sidebar");
        this.bscroll = new BScroll(sider, {
          tap: true,
          scrollY: true,
          probeType: 3,
          click: true,
        });


        let main = document.querySelector(".main");
        this.ma = new BScroll(main, {
          tap: true,
          scrollY: true,
          probeType: 3,
          click: true,
        });
        console.log(this.ma);
      });


    },
    kinds_list(id) {
      console.log(id);
      this.$router.push({ path: `/kinds_list/${id}`, params: { id } });
    },
  },
};
</script>

<style lang="scss" scoped>
#container {
  height: 100%;
  width: 100%;

  .search {
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
  }
  .content {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    overflow: hidden;
    height: 100%;


    .sidebar {
      height: 100%;
      overflow: auto;

      .van-sidebar {
        .van-sidebar-item--select::before {
          background-color: #845f3f;
        }
      }
    }
    .main {
      width: 100%;
      box-sizing: border-box;
      background-color: #f4f4f4;
      
      overflow: hidden;
      height: 100%;
      &::-webkit-scrollbar {
        display: none;
      }

      .cont {
        display: flex;
        flex-direction: column;
        align-items: center;
       
        
        .navimg {
          width: 260px;
          img {
            width: 100%;
            border-radius: 10px;
          }
        }
        .item {
          box-sizing: border-box;
          margin: 8px 0;
          width: 260px;
          background-color: #f7f8fa;
          padding: 5px 5px;

          border-radius: 10px;

          box-shadow: 20px 20px 60px #d2d3d5, -20px -20px 60px #ffffff;
          p {
            margin-bottom: 5px;
            font-weight: bold;
          }
          .mainItem {
            display: flex;
            flex-wrap: wrap;

            width: 249px;
            .listItem {
              width: calc(100% / 3);
              margin-bottom: 5px;
              .pic {
                position: relative;
                .picitem {
                  box-sizing: border-box;
                  padding: 5px;
                }
                .itemlabel {
                  position: absolute;
                  top: 0;
                }
              }
              .itemTile{
                width:100%;
                text-align:center;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                box-sizing: border-box;
                padding: 0 9px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
