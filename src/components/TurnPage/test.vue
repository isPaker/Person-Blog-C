<template>
  <div>
    <h1>App组件</h1>
    <TurnPage
     :current="current"
     :total="total"
     @pageChange="handlePageChange($event)"
    />
  </div>
</template>

<script>
import TurnPage from './TurnPage.vue'

export default {
  components: {
    TurnPage
  },
  data(){
    return {
      current: 1,
      total: 203
    }
  },
  methods: {
    handlePageChange(newPage){
      this.current = newPage;
      console.log("数据加载完成")
    }
  }
}
</script>
