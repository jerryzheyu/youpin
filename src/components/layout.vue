<template>
    <div class="layout" :style="{bottom:height+'px',top:tH+'px'}">
        <slot></slot>
        
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "layout",
  data () {
    return {
    }
  },
  props:{
      tH:{
          type:Number,
          default:0
      }
  },
  computed: {
      ...mapState(['height'])
  },
  components: {
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.layout{
    width: 100%;
    position: absolute;
  
    background-color: #f4f4f4;
}
</style>