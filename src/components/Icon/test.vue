<template>
    <div>
        <h1>APP组件</h1>
        <Icon type="home" />
    </div>
</template>

<script>
import Icon from "./Icon.vue";
export default {
    components: {
        Icon
    }
}
</script>

<style scoped>
.iconfont {
    color: red
}
</style>