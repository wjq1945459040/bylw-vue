<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">欢迎登录</div>
      <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
        <el-form-item prop="logid">
          <el-input v-model="param.logid" placeholder="用户名">
            <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="param.password" @keyup.enter.native="submitForm()">
            <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
          </el-input>
        </el-form-item>
        <el-link class="pass-fgtpwd" type="primary">忘记密码?</el-link>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()">登录</el-button>
        </div>
        <router-link class="pass-fgtpwd" type="primary" :to="{name:'register'}">立即注册</router-link>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  data: function () {
    return {
      param: {
        logid: 'admin',
        password: '11111',
      },
      rules: {
        logid: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    };
  },
  methods: {
    submitForm () {
      this.$refs.login.validate(valid => {
        if (valid) {
          const _this = this;
          this.$axios.post("/login", this.param)
            .then((result) => {
              console.log(result);
              if (result.data.code === 200) {
                const jwt = result.headers["authorization"];
                const userinfo = result.data.data;

                _this.$store.commit("SET_TOKEN", jwt);
                _this.$store.commit("SET_USERINFO", userinfo);

                _this.$router.push("/");
              } else {
                Message({
                  showClose: true,
                  message: result.data.msg,
                  type: 'error',
                  center: true
                })
              }
            })
            .catch((err) => {

              Message({
                showClose: true,
                message: err.response.data.msg,
                type: 'error',
                center: true
              })

            });
          // this.$message.success('登录成功');
          // localStorage.setItem('ms_username', this.param.username);
          // this.$router.push('/');
        } else {
          this.$message.error('请输入账号和密码');
          console.log('error submit!!');
          return false;
        }
      });
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
</style>