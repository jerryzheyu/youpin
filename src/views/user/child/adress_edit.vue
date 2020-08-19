<template>
  <div class="edit_main">
   <head-info title="地址管理"></head-info>
    <van-address-edit
      ref="form"
      style="margin-top: 40px;"
      :area-list="areaList"
      show-postal
      :addressInfo="addressInfo"
      show-set-default
      show-search-result
      show-delete
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import headInfo from "@/components/headInfo";
import { mapMutations } from "vuex";
import areaList from "../../../utils/area";
export default {
  name: "adress_edit",
  data() {
    return {
      areaList: areaList,
      searchResult: [],
      addressInfo: this.$route.params.content || {},
    };
  },
  components: {headInfo},
  methods: {
    ...mapMutations(["ADD_ADDRESS", "UPDATE_ADDRESS",'DEL_ADRESS']),
    onSave(content) {
      if (Object.keys(this.addressInfo).length > 0) {
       
        this.UPDATE_ADDRESS(content);
        this.$toast('已更新')
        this.$router.back();
      } else {
        
        content.id = this.ctId();
        content["address"] =
          content.province +
          content.city +
          content.county +
          content.addressDetail;
        this.ADD_ADDRESS(content);
        this.$toast('已添加')
        this.$router.back();
      }
    },
    ctId() {
      return new Date().getTime();
    },
    onDelete() {
      if (Object.keys(this.addressInfo).length > 0) {
        this.DEL_ADRESS(this.addressInfo.id)
        this.$toast('已删除')
        this.$router.back();
      }else{
       
      }
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.edit_main {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 999;
}
</style>