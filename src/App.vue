<template>
  <div id="app">
    <transition name="router-slider" mode="out-in">
      <router-view />
    </transition>

    <transition name="router-slider" mode="out-in">
      <tab-bar v-if="$route.meta.showTab"></tab-bar>
    </transition>
  </div>
</template>

<script>
import tabBar from "@/components/tabBar";
export default {
  components: {
    tabBar,
  },
  data() {
    return {
      url: "",
    };
  },
  mounted() {},
  methods: {},
};
</script>


<style lang="scss" scoped>
.router-slider-enter-active,
.router-slider-leave-active {
  transition: all 0.3s;
}

.router-slider-enter,
.router-slider-leave-active {
  opacity: 0;
}
body,html{
  overflow: hidden;
}
</style>
