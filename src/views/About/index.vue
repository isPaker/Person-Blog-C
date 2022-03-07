<template>
  <div class="about-container" v-loading="loading">
    <iframe
      v-if="src"
      :src="src"
      frameborder="0"
      class="about-content"
      @load="srcLoaded = true"
    ></iframe>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
  data(){
    return {
      srcLoaded: false,
    }
  },
  created(){
    this.$store.dispatch("about/fetchAbout")
  },
  computed: mapState("about", {
    src: "data",
    loading: "loading",
  })
}
</script>

<style lang="less" scoped>
.about-container{
  width: 100%;
  height: 100%;
  position: relative;
  .about-content{
    width: 100%;
    height: 100%;
  }
}
</style>