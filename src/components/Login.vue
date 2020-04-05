<template>
  <div class="content_login">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avatar_box">
        <router-link to='/' class='to_index'>
          <img src="../assets/images/logo.png" alt="头像" />
        </router-link>
      </div>

      <p class="login_title">{{$t('login.loginTitle')}}</p>
      <!-- 切换中英文 -->
      <el-switch
        class="change_language"
        v-model="changeLang"
        inactive-text="EN"
        active-text="CN"
        @change="changeLangEvent">
      </el-switch>

      <!-- <el-link class="user_register" type="info" :underline="false" href="/register">没有账号？<i class="iconfont icon-add-account "></i>
      </el-link> -->
      <router-link to="/register" class="user_register">
        <span>{{$t('login.noAccount')}}<i class="iconfont icon-add-account "></i></span>
      </router-link>

      <!-- 登录表单 -->
      <el-form label-width="0em" class="login_form" status-icon :rules="rules" :model="loginFormData">
        <el-form-item prop="userName">
          <el-input
            prefix-icon="iconfont icon-account"
            v-model="loginFormData.userName"
            :placeholder="$t('loginForm.inputName')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="userPassword">
          <el-input
            prefix-icon="iconfont icon-password"
            type="password"
            v-model="loginFormData.userPassword"
            :placeholder="$t('loginForm.inputPasswd')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="secode">
          <el-input
            clearable
            prefix-icon="iconfont icon-success-fill"
            v-model="loginFormData.secode"
            :placeholder="$t('loginForm.inputVerification')"
            @keydown.enter.native="btnLogin"
          ></el-input>
          <span class="check_code" @click="createCode">{{checkCode}}</span>
        </el-form-item>
        <br>
        <el-form-item class="btns">
          <el-button class="btn_login" type="primary" @click="btnLogin">{{$t('loginForm.btnLogin')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      placeholder: '',
      changeLang: true,
      loginFormData: {
        userName: '',
        userPassword: '',
        secode: ''
      },
      checkCode: '',
      rules: {
        userName: [{ required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }],
        userPassword: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        secode: [{ required: true, message: '请输验证码', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.createCode()
    // this.$refs.inputName.focus()
  },
  methods: {
    btnLogin () {
      console.log('this.loginFormData')
      var formData = this.loginFormData

      if (formData.secode !== this.checkCode) {
        this.$message({
          message: '验证码错误，注意大写字母',
          type: 'warning',
          center: true
        })
        this.createCode()
        this.loginFormData.secode = ''
      }

      // qs.stringify()  转换成查询字符串
      // qs.parse() 转换成json对象
      this.$axios.post('http://127.0.0.1:8090/login',
        this.qs.stringify(
          {
            username: formData.userName,
            userpasswd: formData.userPassword
          }
        )
      ).then(res => {
        if (res.status === 200) {
          this.$router.push({ path: res.data })
          console.log('登录成功')
          console.log(res)
        }
      }).catch(err => {
        this.$message({
          message: '用户名或密码错误',
          type: 'warning',
          center: true
        })
        this.$router.push({ path: err.data })
        console.log(err)
      })
    },
    createCode () {
      var code = ''
      const codeLength = 4 // 验证码的长度
      const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] // 随机数
      for (let i = 0; i < codeLength; i++) { // 循环操作
        let index = Math.floor(Math.random() * 36) // 取得随机数的索引（0~35）
        code += random[index] // 根据索引取得随机数加到code上
      }
      this.checkCode = code // 把code值赋给验证码
    },
    /**
     * 切换语言
     */
    changeLangEvent () {
      this.$confirm('确定切换语言吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        if (this.$i18n.locale === 'zh_cn') {
          this.lang = 'en_us'
          this.$i18n.locale = this.lang// 关键语句
        } else {
          this.lang = 'zh_cn'
          this.$i18n.locale = this.lang// 关键语句
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style scoped>
.content_login {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-size: 100% 100%;
}

.change_language{
  position: absolute;
  top: 30px;
  left: 75%;
}
</style>
