<template>
   <!-- 面包屑 -->
   <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item><slot name="first-name"></slot></el-breadcrumb-item>
  <el-breadcrumb-item><slot name="second-name" ></slot></el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default{
  name:"Breadcrumb"
}
</script>

