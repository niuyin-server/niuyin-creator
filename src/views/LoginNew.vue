<template xmlns="">
  <div class="container">
    <!-- <div class="logo"></div> -->
    <!-- 登录区域 -->
    <div class="content">
      <!-- 配图 -->
      <div class="pic"></div>
      <!-- 表单 -->
      <div class="field">
        <!-- [移动端]标题 -->
        <h2 class="mobile-title">
          <div class="title" style="padding: 10px;">欢迎使用牛音</div>
        </h2>
        <!-- 表单 -->
        <div class="form-cont">
          <el-tabs class="form" v-model="loginType" style="float:none;">
            <el-tab-pane label="账号密码登录" name="up"></el-tab-pane>
            <el-tab-pane label="手机短信登录" name="sms"></el-tab-pane>
          </el-tabs>
          <div>
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
              <!-- 账号密码登录 -->
              <div v-if="loginType === 'up'">
                <el-form-item prop="username">
                  <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
                    <template #prefix>
                      <el-icon class="el-input__icon">
                        <User/>
                      </el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="loginForm.password" type="password" auto-complete="off" placeholder="密码"
                            @keyup.enter.native="handleLogin">
                    <template #prefix>
                      <el-icon class="el-input__icon">
                        <Lock/>
                      </el-icon>
                    </template>
                  </el-input>
                </el-form-item>
              </div>

              <!-- 手机短信登录 -->
              <div v-if="loginType === 'sms'">
                <el-form-item prop="telephone">
                  <el-input v-model="loginForm.telephone" type="text" auto-complete="off" placeholder="请输入手机号">
                    <template #prefix>
                      <el-icon class="el-input__icon">
                        <Iphone/>
                      </el-icon>
                    </template>
                  </el-input>
                </el-form-item>
                <el-form-item prop="phoneCode">
                  <el-input v-model="loginForm.phoneCode" type="text" auto-complete="off" placeholder="短信验证码"
                            class="sms-login-mobile-code-prefix" @keyup.enter.native="handleLogin">
                    <template #prefix>
                      <el-icon class="el-input__icon">
                        <Key/>
                      </el-icon>
                    </template>
                    <template #append>
                      <span v-if="mobileCodeTimer <= 0" class="getMobileCode cb" @click="getSmsCode"
                            style="cursor: pointer;">获取验证码</span>
                      <span v-if="mobileCodeTimer > 0" class="getMobileCode">{{ mobileCodeTimer }}秒后重试</span>
                    </template>
                  </el-input>
                </el-form-item>
              </div>

              <!-- 登录按钮 -->
              <el-form-item class="w100" v-if="loginType != 'qr'">
                <el-button :loading="loading"
                           type="primary"
                           class="w100"
                           @click.native.prevent="handleLogin">
                  <span v-if="!loading">登 录</span>
                  <span v-else>登 录 中...</span>
                </el-button>
                <div style="float: right" v-if="register">
                  <router-link class="link-type" :to="'/register'">立即注册
                  </router-link>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <!-- footer -->
    <div class="footer">
      <span>Copyright © 2022-2023 niuyin All Rights Reserved</span>
    </div>
  </div>
</template>
<script>
import {login} from "@/api/member.js";
import {getToken, setToken} from "@/utils/auth.js";

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      // 二维码登录
      qrCodeUrl: "",
      uuid: "",
      qrCodeState: "",
      timer: "",
      showQRCodeErrorMask: false,
      mobileCodeTimer: 0,
      // 验证码开关
      captchaEnabled: true,
      // 注册开关
      register: true,
      loginType: "up",
      loginForm: {
        username: "",
        password: "",
        telephone: "",
        phoneCode: "",
      },
      loginRules: {
        username: [{required: true, trigger: "blur", message: "请输入您的账号"},],
        password: [{required: true, trigger: "blur", message: "请输入您的密码"},],
        code: [{required: true, trigger: "change", message: "请输入验证码"}],
        telephone: [{required: true, trigger: "blur", message: "手机号不能为空"},]
      },
      loading: false,
      redirect: undefined,
    };
  },
  watch: {},
  created() {
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          login(this.loginForm.username, this.loginForm.password).then(res => {
            if (res.code === 200) {
              setToken(res.data.token)
              this.$router.push('/')
            } else {
              this.$message.error(res.msg)
            }
            this.loading = false
          })
        }
      });
    },
    /** ========== 手机短信登录 ========== */
    getSmsCode() {
      // if (this.mobileCodeTimer > 0) return;
      // this.$refs.loginForm.validate(valid => {
      //   if (!valid) return;
      //   sendSmsCode(this.loginForm.telephone).then(res => {
      //     // this.$modal.msgSuccess("获取验证码成功")
      //     this.mobileCodeTimer = 60;
      //     let msgTimer = setInterval(() => {
      //       this.mobileCodeTimer = this.mobileCodeTimer - 1;
      //       if (this.mobileCodeTimer <= 0) {
      //         clearInterval(msgTimer);
      //       }
      //     }, 1000);
      //   });
      // });
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>

<style scoped>
@import "@/assets/styles/login-new.scss";

.container {
  width: inherit;
  height: inherit;
  min-width: 1080px;
  min-height: 620px;
  background-image: url("@/assets/images/index-bg.png");
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
}

.oauth-login-item img {
  height: 25px;
  width: 25px;
}

.oauth-login-item span:hover {
  text-decoration: underline red;
  color: red;
}

.sms-login-mobile-code-prefix {
  :deep(.el-input__prefix) {
    top: 22%;
  }
}
</style>
