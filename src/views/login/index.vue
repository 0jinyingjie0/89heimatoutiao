<template>
  <div class="login">
      <el-card class="login-card">
          <div class="title">
              <img src="../../assets/img/logo_index.png" alt="">
          </div>
          <!-- 登录表单 -->
          <el-form ref="myForm" style="margin-top:25px" :model="loginForm" :rules="loginRules">
              <el-form-item prop="mobile">
                  <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                  <el-input style="width:68%" v-model="loginForm.code" placeholder="请输入密码"></el-input>
                   <el-button style="float:right" plain>发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="check">
                   <el-checkbox v-model="loginForm.check">我已阅读并同意！</el-checkbox>
              </el-form-item>
              <el-form-item>
                   <el-button @click="login" style="width:100%" type="primary">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '',
        code: '',
        check: false
      },
      loginRules: {
        mobile: [{
          required: true,
          message: '请输入你的手机号'
        }, { pattern: /^1[3456789]\d{9}$/, message: '请输入合法的手机号' }],
        code: [{
          required: true,
          message: '请输入验证码'
        },
        { pattern: /^\d{6}$/, message: '验证码为6位数字' }],
        // 自定义函数
        check: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('哎呀，点错了'))
          }
        } }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myForm.validate(function (isok) {
        if (isok) {
          console.log('哈哈，成功了')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
    background: url(../../assets/img/login_bg.jpg);
    background-size: cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card {
        width: 440px;
        height: 350px;
        .title{
            text-align: center;
            img {
                height: 40px;
            }
        }
    }
}
</style>
