<template>
  <div>
      <!-- 面包屑组件 -->
    <breadcrumb>
      <span slot="first-name">权限管理</span>
      <span slot="second-name">角色列表</span>
    </breadcrumb>
    <!-- 卡片 -->
    <el-card>

    </el-card>
  </div>
</template>
<script>
// 组件导入
import Breadcrumb from 'components/content/Breadcrumb'
export default {
  name: 'Roles',
  components: {
    Breadcrumb
  }
}
</script>
