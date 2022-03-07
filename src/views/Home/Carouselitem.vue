<template>
  <div class="carousel-item-container" 
  @mousemove="handleMousemove"
  @mouseleave="handleMouseleave"
   ref="container">
    <div class="image-container" ref="image" :style="imagePosition">
      <ImageLoader :src="carousel.bigImg" :placeholder="carousel.midImg" @load="showWords" />
    </div>
    <div class="title" ref="title">{{carousel.title}}</div>
    <div class="desc" ref="desc">{{carousel.description}}</div>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader/ImageLoader.vue";
export default {
  props: ["carousel"],
  components: {
    ImageLoader,
  },
  data(){
    return {
      titleWidth: 0, //标题文字宽度
      descWidth: 0,  //说明文字宽度
      mouseX: 0,  //鼠标坐标
      mouseY: 0,
      imageSize: null,  //图片尺寸
      containerSize: null,  //容器尺寸
    }
  },
  computed: {
    imagePosition(){
      if(!this.imageSize || !this.containerSize){
        return
      }
      // 图片和容器之间的间距
      const disX = this.imageSize.width - this.containerSize.width;
      const disY = this.imageSize.height - this.containerSize.height;
      // 图片移动的距离
      const x = (-disX / this.containerSize.width) * this.mouseX;
      const y = (-disY / this.containerSize.height) * this.mouseY;
      return {
        transform: `translate(${x}px, ${y}px)`,
      }
    },
    center() {
      if(!this.imageSize || !this.containerSize){
        return
      }; //去掉containerSize错误
      return {
        x0: this.containerSize.width / 2,
        y0: this.containerSize.height / 2,
      };
    },
  },
  mounted(){
    this.titleWidth = this.$refs.title.clientWidth;
    this.descWidth = this.$refs.desc.clientWidth;
    this.setSize();
    this.mouseX = this.center.x0;
    this.mouseY = this.center.y0;
    window.addEventListener("resize", this.handleResize)
  },
  destoryed(){
    window.removeEventListener("resize", this.handleResize)
  },
  methods: {
    showWords(){
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      this.$refs.title.clientWidth;  //重新渲染一次
      this.$refs.title.style.width = this.titleWidth + "px";

      this.$refs.desc.style.opacity = 1;
      this.$refs.desc.style.width = 0;
      this.$refs.desc.clientWidth;  //重新渲染一次
      this.$refs.desc.style.width = this.descWidth + "px";
    },
    handleMousemove(e){
      const rect = this.$refs.container.getBoundingClientRect();
      //鼠标相对于容器的距离
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    },
    handleMouseleave(){
      this.mouseX = this.center.x0;
      this.mouseY = this.center.y0;
    },
    setSize(){
      if( !this.$refs.image || !this.$refs.container ){
        return;
      }
      this.imageSize = {
        width: this.$refs.image.clientWidth,
        height: this.$refs.image.clientHeight
      };
      this.containerSize = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight
      };
    },
    handleResize(){
      this.mouseX = this.center.x0;
      this.mouseY = this.center.y0;
      this.setSize();
    }
  },
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.carousel-item-container {
    width: 100%;
    height: 100%;
    color: #fff;
    position: relative;
    overflow: hidden;
    .image-container {
      width: 110%;
      height: 110%;
      transition: 0.3s;
      position: absolute;
      top: 0;
      left: 0;
    }
    .title, .desc {
      position: absolute;
      left: 3vw;
      opacity: 0;
      overflow: hidden;
      white-space: nowrap;
      letter-spacing: 8px;
      color: #fff;
      text-shadow: 1px 0 0 rgba(0,0,0,0.5), 
                    -1px 0 0 rgba(0,0,0,0.5), 
                    0 1px 0 rgba(0,0,0,0.5), 
                    0 -1px 0 rgba(0,0,0,0.5);
    }
    .title {
      top: 50%;
      font-size: 2em;
      transition: 1s;
    }
    .desc {
      top: calc(50% + 60px);
      font-size: 1.1em;
      transition: 2s 1s;
      color: lighten(@gray, 20%);
    }
}
</style>