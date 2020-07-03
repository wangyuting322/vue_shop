<template>
  <div>
    <!-- 面包屑组件 -->
    <breadcrumb>
      <span slot="first-name">用户管理</span>
      <span slot="second-name">用户列表</span>
    </breadcrumb>
    <!-- 卡片 -->
    <el-card>
      <!-- layout布局 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <!-- 搜索 -->
          <el-input size="mini" placeholder="请输入搜索内容" v-model="queryInfo.query" clearable @clear="getuserlistdata">
            <el-button slot="append" icon="el-icon-search" @click="getuserlistdata()"></el-button>
          </el-input>
        </el-col>

        <!-- 添加用户按钮 -->
        <el-col :span="4">
          <el-button size="mini" type="primary" @click="dialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 表格区域 -->
      <el-table :data="userList" style="width: 100%" max-height="340" size="mini" border stripe>
        <el-table-column type="index" width="50" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="100"> </el-table-column>
        <el-table-column prop="mobile" label="手机号" width="120"> </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
        <el-table-column prop="address" label="地址" width="180"> </el-table-column>
        <el-table-column prop="charactor" label="角色" width="120"> </el-table-column>
        <el-table-column prop="state" label="状态" width="120">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <!-- 状态开关按钮 -->
            <el-switch v-model="scope.row.state" @change="userStateChange(scoped.row)"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 添加用户dialog提示框 -->
      <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" @close="addDialogClosed">
        <!-- 内容表单 -->
        <el-form :model="addForm" :rules="addFormrules" ref="addFormRef" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="addForm.address"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 编辑用户dialog提示框 -->
      <el-dialog title="编辑用户信息" :visible.sync="editdialogVisible" width="30%" @close="editDialogClosed">
        <!-- 内容表单 -->
        <el-form :model="editForm" :rules="addFormrules" ref="editFormRef" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="editForm.address"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部按钮 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
// 请求数据
import { getuserlistdata, changeuserstate, addusers, geteditdata, editusers, removeuser } from 'network/user.js'

// 组件导入
import Breadcrumb from 'components/content/Breadcrumb'
export default {
  name: 'Users',
  data() {
    // 验证邮箱的规则
    var checkEmail = (rule, value, callback) => {
      var regEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      if (!regEmail.test(value)) {
        return callback(new Error('请输入正确格式的邮箱'))
      }
      return callback()
    }
    // 验证手机号的规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[3456789]{1}\d{9}$/
      if (!regMobile.test(value)) {
        return callback(new Error('请输入正确格式的手机号'))
      }
      return callback()
    }
    return {
      userList: [
        {
          email: '2fe01@qq.com',
          username: '王小虎',
          mobile: '135555555',
          address: '上海市普陀区金沙江路 1518 弄',
          charactor: '管理员',
          state: true
        },
        { email: '2fe01@qq.com', email: '2016-05-02', username: '王小虎', mobile: '135555555', address: '上海市普陀区金沙江路 1518 弄', charactor: '管理员', state: true },
        {
          email: '2fe01@qq.com',
          username: '王小虎',
          mobile: '135555555',
          address: '上海市普陀区金沙江路 1518 弄',
          charactor: '管理员',
          state: false
        },
        {
          email: '2fe01@qq.com',
          username: '王小虎',
          mobile: '135555555',
          address: '上海市普陀区金沙江路 1518 弄',
          charactor: '管理员',
          state: true
        },
        {
          email: '2fe01@qq.com',
          username: '王小虎',
          mobile: '135555555',
          address: '上海市普陀区金沙江路 1518 弄',
          charactor: '管理员',
          state: true
        },
        {
          email: '2fe01@qq.com',
          username: '王小虎',
          mobile: '135555555',
          address: '上海市普陀区金沙江路 1518 弄',
          charactor: '管理员',
          state: true
        },
        {
          email: '2fe01@qq.com',
          username: '王小虎',
          mobile: '135555555',
          address: '上海市普陀区金沙江路 1518 弄',
          charactor: '管理员',
          state: true
        }
      ],
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      total:0,
      // 对话框显示
      dialogVisible: false,
      editdialogVisible: false,
      // 保存添加用户的信息
      addForm: {
        username: '',
        email: '',
        address: '',
        mobile: ''
      },
      // 添加用户的验证规则
      addFormrules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '请输入 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '请输入 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      },
      // 保存编辑的用户的信息
      editForm: {
        username: '',
        email: '',
        address: '',
        mobile: ''
      },
      // 添加用户的验证规则
      editFormrules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '请输入 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  components: {
    Breadcrumb
  },
  created() {
    this.getuserlistdata()
  },
  methods: {
    // 获取用户数据方法
    getuserlistdata() {
      getuserlistdata(this.queryInfo).then(res => {
        console.log('userlist', res)
        if(res.meta.status !==200) return ;

        this.userList = res.data.users
       this.total = res.data.total
      })
    },
    // 切换pagesize时重新调数据
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.queryInfo.pagesize = val
      this.getuserlistdata()
    },
    // 切换pagenum时重新调数据
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.queryInfo.pagenum = val
      this.getuserlistdata().then(res=>{
      })
    },
    // 用户state状态改变时put数据更新数据
    userStateChange(info) {
      changeuserstate(info.id, info.state).then(res => {
        if (res.meta.status !== 200) {
          info.state = !info.state
          return this.$message.error('更新用户状态失败')
        }
        this.$message.success('更新用户状态成功')
      })
    },
    // 关闭添加用户对话框时表单重置
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    //点击对象框中的确定进行数据验证，发送数据，关闭对话框，重新获取数据
    addUser() {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        addusers(this.addForm).then(res => {
          if (res.meta.status !== 201) return this.$message.error('添加用户失败')

          this.$message.success('添加用户成功')
          // 关闭对话框
          this.dialogVisible = false
          // 重新获取用户信息
          this.getuserlistdata()
        })
      })
    },
    // 点击编辑按钮显示编辑对话框，获取该条数据的信息并保存
    showEditDialog(info) {
      this.editForm = info
      this.editdialogVisible = true
      // geteditdata(info.id).then(res => {
      //   if (res.meta.status != 200) {
      //     return this.$message.error('查询用户信息失败!')
      //   }
      //   this.editForm = res.data
      //   this.editdialogVisible = true
      // })
    },
    // 关闭编辑用户信息对话框时表单重置
    editDialogClosed() {
      his.$refs.editFormRef.resetFields()
    },
    //点击对象框中的确定进行数据验证，发送数据，关闭对话框
    editUser() {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        editusers(this.addForm).then(res => {
          if (res.meta.status !== 200) return this.$message.error('编辑用户信息失败')
          this.$message.success('编辑用户信息成功')
          // 关闭对话框
          this.dialogVisible = false
          // 重新获取用户信息
          this.getuserlistdata()
        })
      })
    },
    // 点击删除按钮跳出弹窗
    removeUserById(id) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          removeuser(id).then(res => {
            if (res.meta.status != 200) {
              return this.$message.error('删除数据失败')
            }
            // 删除成功后重新获取数据
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getuserlistdata()
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="less" scoped></style>
