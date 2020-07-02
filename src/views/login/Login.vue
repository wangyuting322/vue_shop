<template>
  <div class="login_container">
    <div class="login_box">
      <!-- logo区域 -->
      <div class="login_logo">
        <img src="~assets/img/login/logo.png" alt />
      </div>
      <!-- 表单区域 -->
      <el-form class="login_form" ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px">
        <!-- 用用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="fa fa-user" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input prefix-icon="fa fa-unlock-alt" placeholder="请输入密码" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <!-- 按钮i -->
        <el-form-item class="form_btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getlogindata } from 'network/login.js'
export default {
  name: 'Login',
  data() {
    return {
      // 表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 表单的验证规则对象
      loginFormRules: {
        username: [
          //  trigger: 'blur' 表示失去焦点时触发验证
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 位数', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      // console.log(this);
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      this.$refs.loginFormRef.validate((valid, obj) => {
        if (!valid) return
        getlogindata(this.loginForm.username, this.loginForm.password).then(res => {
          if (res.meta.status != 200) return this.$message.error('登录失败')
          this.$message.success('登录成功')

          // 将登录成功之后的token,保存到客户端的sessionStorage中
          // token只在当前网站打开期间生效,所以将token保存在sessionStroage中
          window.sessionStorage.setItem('token', res.data.token)
          this.$router.push('/home')
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100vh;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: white;
  border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .login_logo {
    width: 30%;
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    left: 50%;

    img {
      width: 100%;
      padding: 10px;
      border-radius: 50%;
    }
  }

  .login_form {
    width: 100%;
    padding: 0px 20px;
    position: absolute;
    bottom: 0px;

    .form_btn {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
