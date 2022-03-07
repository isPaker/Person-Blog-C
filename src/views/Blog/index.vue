<template>
  <Layout>
    <BlogList />
    <template #rightCon>
      <BlogCategory />
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout/Layout.vue";
import BlogList from "./components/BlogList.vue";
import BlogCategory from "./components/BlogCategory.vue";

export default {
  components: {
    Layout,
    BlogList,
    BlogCategory,
  }
}
</script>

<style>

</style>