<template>
  <div>
    <!-- 面包屑组件 -->
    <breadcrumb>
      <span slot="first-name">权限管理</span>
      <span slot="second-name">权限列表</span>
    </breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- 表格区域 -->
      <el-table :data="rightsList" style="width: 100%" max-height="340" size="mini" border stripe>
        <el-table-column type="index" width="50" label="#"> </el-table-column>
        <el-table-column prop="authname" label="权限名称" width="100"> </el-table-column>
        <el-table-column prop="path" label="路径" width="120"> </el-table-column>
        <el-table-column prop="order" label="权限等级" width="120">
          <template slot-scope="scope">
            <!-- 标签 -->
            <el-tag type="success" v-if="scope.row.order == 0">一级</el-tag>
            <el-tag type="info" v-if="scope.row.order == 1">二级</el-tag>
            <el-tag type="warning" v-if="scope.row.order == 2">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { getrightslistdata } from 'network/rights.js'

// 组件导入
import Breadcrumb from 'components/content/Breadcrumb'
export default {
  name: 'Rights',
  data() {
    return {
      rightsList: []
    }
  },
  components: {
    Breadcrumb
  },
  created() {
    this.getrightslistdata()
  },
  methods: {
    // 获取用户数据方法
    getrightslistdata() {
      getrightslistdata().then(res => {
        console.log('rightslist', res)
        if (res.meta.status !== 200) return
        this.rightsList = res.data
        console.log('d')
      })
    }
  }
}
</script>
