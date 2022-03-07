<template>
  <div class="test-container">
      <ImageLoader
      placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100"
      src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304" 
      @load="handleLoaded"
      />
  </div>
</template>

<script>
import ImageLoader from "./ImageLoader.vue";
export default {
    components: {
        ImageLoader
    },
    methods: {
        handleLoaded(){
            console.log("ImageLoader图片加载完成！！")
        }
    }
}
</script>

<style scoped lang="less">
.test-container {
    width: 500px;
    height: 400px;
    border: 2px solid;
    position: relative;
    margin: 0 auto;
}
</style>