<template>
    <div class="content_register">
        <div class="register_box">
            <!-- 头像 -->
            <div class="avatar_box">
              <router-link to='/' class='to_index'>
                <img src="../assets/images/logo.png" alt="头像" />
              </router-link>
            </div>
            <!-- 用户注册 -->
            <p class="register_title">用户注册</p>

            <router-link to="/login" class="user_login">
                <span>直接登录?<i class="iconfont icon-account "></i></span>
            </router-link>

            <!-- 注册表单 -->
            <el-form label-width="0em" class="register_form" status-icon :rules="rules" :model="registerFormData">
                <el-form-item prop="userName">
                <el-input
                    prefix-icon="iconfont icon-account"
                    v-model="registerFormData.userName"
                    placeholder="输入用户名称"
                ></el-input>
                </el-form-item>
                <el-form-item prop="userPassword">
                <el-input
                    prefix-icon="iconfont icon-password"
                    type="password"
                    v-model="registerFormData.userPassword"
                    placeholder="输入用户密码"
                ></el-input>
                </el-form-item>
                <el-form-item prop="checkUserPassword">
                <el-input
                    prefix-icon="iconfont icon-password"
                    type="password"
                    v-model="registerFormData.checkUserPassword"
                    placeholder="确认用户密码"
                ></el-input>
                </el-form-item>
                <el-form-item prop="secode">
                <el-input
                    prefix-icon="iconfont icon-success-fill"
                    v-model="registerFormData.secode"
                    placeholder="输入右方验证码"
                    @keydown.enter.native="btnRegister"
                ></el-input>
                <span class="check_code" @click="createCode">{{checkCode}}</span>
                </el-form-item>
                <br>
                <el-form-item class="btns">
                <el-button class="btn_register" type="primary" @click="btnRegister">注册用户</el-button>
                <!-- <el-button type="success">重置</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      registerFormData: {
        userName: '',
        userPassword: '',
        checkUserPassword: '',
        secode: ''
      },
      checkCode: '',
      rules: {
        userName: [{ required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
        userPassword: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码在 6 到 15 个字符之间', trigger: 'blur' }],
        checkUserPassword: [{ required: true, validator: this.checkPasswd, trigger: 'blur' }],
        secode: [{ required: true, message: '请输验证码', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.createCode()
  },
  methods: {
    createCode () {
      var code = ''
      const codeLength = 4 // 验证码的长度
      const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] // 随机数
      for (let i = 0; i < codeLength; i++) { // 循环操作
        let index = Math.floor(Math.random() * 36) // 取得随机数的索引（0~35）
        code += random[index] // 根据索引取得随机数加到code上
      }
      this.checkCode = code // 把code值赋给验证码
      // console.log('code:' + code)
    },
    btnRegister () {
      var formData = this.registerFormData
      // console.log(formData)
      if (formData.secode !== this.checkCode) {
        this.$message({
          message: '验证码错误，注意大写字母',
          type: 'warning',
          center: true
        })
        this.createCode()
        return false
      }

      this.$axios.post('http://127.0.0.1:8090/register',
        this.qs.stringify(
          {
            username: formData.userName,
            userpassword: formData.userPassword
          }
        )
      ).then(res => {
        if (res.status === '200') {
          alert('注册成功！')
          this.$router.push({ path: res.data })
        } else {
          this.$router.push({ path: '/register' })
        }
      }).catch(err => {
        console.log(err.data)
      })
    },
    checkPasswd () {
      var formData = this.registerFormData
      if (formData.checkUserPassword === '') {
        this.message('不能为空')
      } else if (formData.userPassword !== formData.checkUserPassword) {
        this.$message({
          message: '两次密码不一致！！！',
          type: 'warning',
          center: true
        })
      } else {
        this.message('密码一致！')
      }
    }
  }
}
</script>

<style scoped>
.content_register {
  height: 100%;
  background-size: cover;
  background-size: 100% 100%;
}

</style>
