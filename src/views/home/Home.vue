<template>
  <div>
    <!-- 整个container -->
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="header_left">
          <img src="~assets/img/login/logo.png" alt="" />
          <div class="header-info">电商后台管理系统</div>
        </div>
        <div class="header_right">
          <el-button type="info" @click="loginOut">退出登录</el-button>
        </div>
      </el-header>

      <el-container class="content-container">
        <!-- 左边导航栏 -->
        <el-aside :width="asideWidth + 'px'">
          <!-- 伸缩条 -->
          <div class="collapse-div" @click="collapseChange">
            |||
          </div>

          <!-- 侧边栏菜单区域 -->
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#409eff"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
            :default-active="this.$route.path"
          >
            <!-- 一级菜单 -->
            <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
              <!-- 一级菜单模板区域 -->
              <template slot="title">
                <!-- 一级菜单图标 -->
                <i :class="iconobj[item.id]"></i>
                <!-- 一级菜单文字 -->
                <span>{{ item.authName }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item class="menu_item" :index="'/'+listitem.path" v-for="listitem in item.children" :key="listitem.id">
                <!-- 二级菜单图标 -->
                <i class="el-icon-menu"></i>
                <!-- 二级菜单文字 -->
                <span>{{ listitem.authName }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 主体内容部分 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getmenusdata } from 'network/home.js'
export default {
  name: 'Home',
  data() {
    return {
      menuList: [
      ],
      iconobj: {
        '125': 'el-icon-user-solid',
        '103': 'el-icon-s-check',
        '101': 'el-icon-s-order',
        '102': 'el-icon-s-promotion',
        '145':'el-icon-s-data'
      },
      isCollapse: false,
      asideWidth: 200
    }
  },
  created() {
    this.getmenusdata()
  },
  methods: {
    getmenusdata() {
      getmenusdata().then(res => {
        console.log('getmenusdata', res)
        if(res.meta.status !==200)return ;
        this.menuList = res.data
      })
    },

    loginOut() {
      // 清空token值
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 伸缩
    collapseChange() {
      this.isCollapse = !this.isCollapse
      if (!this.isCollapse) return (this.asideWidth = 200)
      this.asideWidth = 64
    }
  }
}
</script>
<style lang="less">

.el-header {
  background-color: rgb(84, 92, 90);
  color: #333;
  line-height: 60px;

  .header_left {
    float: left;
    display: flex;
    align-items: center;

    img {
      width: 50px;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      margin-right: 15px;
    }
    .header-info {
      color: white;
      font-size: 18px;
      line-height: 60px;
    }
  }

  .header_right {
    float: right;
  }
}

.el-aside {
  background-color: var(--color-background);
  color: #333;
  line-height: 200px;
  .collapse-div {
    width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
    text-align: center;
    height: 30px;
    line-height: 30px;
  }

  .el-menu {
    border: none;
  }
}
.el-main {
  background-color: white;
  max-height: 100%;
}
</style>
