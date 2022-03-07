<template>
    <div class="loading-container">
        <img src="@/assets/loading.svg" alt="">
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
.loading-container {
    .self-center();
    font-size: 30px;
}
</style>