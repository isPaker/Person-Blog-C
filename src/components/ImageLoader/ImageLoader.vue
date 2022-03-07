<template>
  <div class="image-loader-container">
      <img v-if="!everythingDone" :src="placeholder" class="placeholder">
      <img 
      @load="handleLoad" 
      :src="src" 
      :style="{opacity: originOpacity, transition: `${duration}ms`}">
  </div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            default: 500
        }
    },
    data(){
        return {
            originLoaded: false,
            everythingDone: false
        }
    },
    methods: {
        handleLoad(){
            this.originLoaded =  true
            setTimeout(()=>{
                this.everythingDone = true;
                this.$emit("load")
            }, this.duration)
        }
    },
    computed: {
        originOpacity(){
            return this.originLoaded ? 1 : 0
        }
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.image-loader-container {
    .self-center();
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    img{
        .self-fill();
        object-fit: cover;
    }
    .placeholder {
        filter: blur(2vw);
    }
}
</style>