<template>
      <div class="icon">
    <div class="item" v-for="(item) of home_icon_list" :key="item.id" @click="kinds_list(item.id)">
      <img v-lazy="item.imgUrl"  style="width:50px;height:50px">
      <p>{{item.title}}</p>
    </div>
  </div>


</template>

<script>
import {home_icon} from '@/api/list';
export default {
  name: "hotIcon",
  data () {
    return {
      home_icon_list:[]
    }
  },
  mounted() {
    this.getHomeIcon()
  },
  components: {
  },
  methods: {
    async getHomeIcon(){
      let {img} = await home_icon()
      this.home_icon_list = img
    },
    kinds_list(id){
     
      this.$router.push({path:`/kinds_list/${id}`})
    }
  },
}
</script>

<style lang="scss" scoped>
      .icon{
    width: 375px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;  
    padding: 14px 10px;
    box-sizing: border-box;
    .item{
      width: 65px;
      
      display: flex;
      box-sizing: border-box;
      padding: 5px 0;
      justify-content: center;
      align-items: center;
      flex-direction: column;

    }
  }
</style>