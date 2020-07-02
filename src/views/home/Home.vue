<template>
  <div class="home_container">
  <el-button type="info" @click="loginOut">退出登录</el-button>
  </div>
</template>
<script>
export default{
  name:'Home',
  methods:{
    loginOut(){
      // 清空token值
      window.sessionStorage.clear();
    this.$router.push('/login')
    }
  }
}
</script>