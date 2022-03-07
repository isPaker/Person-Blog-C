<template>
  <div class="test-container">
      <Menu />
  </div>
</template>

<script>
import "@/styles/reset.less";
import Menu from "./Menu.vue";
export default {
    components: {
        Menu
    }
}
</script>

<style>
.test-container {
    width: 250px;
    height: 300px;
    background: #000;
    margin-top: 100px;
    margin: 0 auto;
}
</style>