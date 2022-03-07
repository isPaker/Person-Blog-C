<template>
  <form class="form-data-container" @submit.prevent="handleSubmit" ref="container">
    <div class="form-item">
      <div class="input-area">
        <input type="text" maxlength="10" placeholder="请输入昵称" v-model="formData.nickname">
        <span class="tip">{{formData.nickname.length}}/10</span>
      </div>
      <div class="error">{{error.nickname}}</div>
    </div>
    <div class="form-item">
      <div class="text-area">
        <textarea placeholder="请输入评论" maxlength="300" v-model="formData.content"></textarea>
        <span class="tip">{{formData.content.length}}/300</span>
      </div>
      <div class="error">{{error.content}}</div>
    </div>
    <div class="form-item">
      <button :disabled="isSubmiting">{{isSubmiting? "提交中..." : "提交"}}</button>
    </div>
  </form>
</template>

<script>
export default {
  data(){
      return {
        formData: {
          nickname: "",
          content: "",
        },
        error: {
          nickname: "",
          content: "",
        },
        isSubmiting: false,
      }
  },
  methods: {
    handleSubmit(){
      this.error.nickname = this.formData.nickname ? "" : "请输入用户名！";
      this.error.content = this.formData.content ? "" : "请输入评论内容！";
      if( this.error.nickname || this.error.content ){
        return; //有错误直接返回
      }
      this.isSubmiting = true; //提交中
      this.$emit("submit", this.formData, (successMsg)=>{
        this.$showMessage({
          content: successMsg,
          type: "success",
          duration: 1000,
          container: this.$refs.container,
          callback: ()=>{
            this.isSubmiting = false;
            this.formData.nickname = "";
            this.formData.content = "";
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.form-data-container {
  overflow: hidden;
  .form-item{
    margin-bottom: 8px;
  }
  .input-area{
    width: 50%;
    position: relative;
  }
  .text-area{
    position: relative;
  }
  .tip{
    position: absolute;
    right: 10px;
    bottom: 0px;
    font-size: 0.8em;
    color: @gray;
  }
  input, textarea{
    border: 1px dashed @gray;
    outline: none;
    width: 100%;
    display: block;
    box-sizing: border-box;
    border-radius: 4px;
    &:focus {
      border-color: @primary;
    }
  }
  input{
    padding: 0 15px;
    height: 2.5em;
  }
  textarea {
    height: 15em;
    resize: none;
    padding: 8px 15px;
  }
  .error{
    color: @danger;
    height: 20px;
    line-height: 20px;
  }
  button {
    width: 5em;
    height: 2em;
    font-size: 1em;
    outline: none;
    cursor: pointer;
    background: @primary;
    color: #fff;
    border: none;
    border-radius: 4px;
    white-space: nowrap;
    &:hover{
      background: darken(@primary, 10%);
    }
    &:disabled{
      background: lighten(@primary, 20%);
      cursor: not-allowed;
    }
  }
}
</style>