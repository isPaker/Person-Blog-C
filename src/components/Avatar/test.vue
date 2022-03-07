<template>
  <div>
    <h1>App组件</h1>
    <Avatar url="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic182.nipic.com%2Ffile%2F20180921%2F10673188_200707941089_2.jpg&refer=http%3A%2F%2Fpic182.nipic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1636194834&t=82b488319c0afe5deec6654a7b697107" 
    :size="50" />
  </div>
</template>

<script>
import Avatar from "./Avatar.vue";
export default {
    name: 'App',
    components: {
        Avatar
    }
}
</script>

<style scoped>

</style>