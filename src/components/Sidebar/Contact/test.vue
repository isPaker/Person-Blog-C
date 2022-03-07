<template>
  <div class="test-container">
      <Contact />
  </div>
</template>

<script>
import "@/styles/reset.less";
import Contact from "./Contact.vue";
export default {
    components: {
        Contact
    }
}
</script>

<style scoped lang="less">
.test-container {
    width: 300px;
    height: 300px;
    background: #000;
    border: 2px solid red;
    margin: 0 auto;
    margin-top: 100px;
}
</style>