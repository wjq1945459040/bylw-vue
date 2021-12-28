<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">欢迎注册</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="logid">
          <el-input v-model="param.logid" placeholder="用户名">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="nickname">
          <el-input v-model="param.nickname" placeholder="昵称">
            <el-button slot="prepend" icon="el-icon-s-custom"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="param.password" @keyup.enter.native="submitForm()"
            @focus.capture.native='changePasswordTip(true)' @blur.capture.native='changePasswordTip(false)'>
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
          <div style="position: absolute" class="p10">
            <verify-pass-word-tip :password="param.password" :isShowTip='isShowTip'></verify-pass-word-tip>
          </div>
        </el-form-item>
        <router-link class="pass-fgtpwd" type="primary" :to="{name:'login'}">登录</router-link>
        <span class="white pass-fgtpwd">已有账号?</span>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">注册</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import verifyPassWordTip from '../common/verifyPassWordTip.vue'
export default {
  name: "VerifyPassWord",
  components: {
    verifyPassWordTip
  },
  data: function () {
    return {
      param: {
        logid: '',
        nickname: '',
        password: '',
      },
      rules: {
        logid: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }, {
            min: 4,
            max: 15,
            message: "字符长度在 4 到 15",
            trigger: "blur",
          }
        ],
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      isShowTip: false
    };
  },
  methods: {
    submitForm () {
      this.$refs.login.validate(valid => {
        if (valid) {
          const _this = this;
          this.$axios.post("/register", this.param)
            .then((result) => {

              if (result.data.code === 200) {
                Message({
                  showClose: true,
                  message: "用户注册成功，请登录",
                  type: 'success',
                  center: true
                })
                //注册成功后跳到登录页登录
                _this.$router.push("/login");
              } else {
                Message({
                  showClose: true,
                  message: "用户名重复，请重新创建",
                  type: 'error',
                  center: true
                })
              }

            })
            .catch((err) => {

              //打印错误信息
              Message({
                showClose: true,
                message: err.response.data.msg,
                type: 'error',
                center: true
              })

            });
        } else {
          this.$message.error('请填入完整信息');
          return false;
        }
      });
    },
    changePasswordTip (isShow) {
      if (isShow) {
        this.isShowTip = true;
      } else {
        this.isShowTip = false;
      }
    },
  },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: rgb(0, 162, 255);
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.pass-fgtpwd {
    float: right;
    font-size: 14px;
    margin-right: 5px;
    margin-bottom: 10px;
    color: rgb(0, 68, 255);
}
.white {
    color: #9b9b9b;
}
.p10 {
    padding: -10px;
}
</style>