<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 个人信息维护
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="登录名">
            <el-input v-model="form.logid" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <div class="crop-demo">
              <img :src="cropImg" class="pre-img">
              <div class="crop-demo-btn">选择图片
                <input class="crop-input" type="file" name="image" accept="image/*" @change="setImage" />
              </div>
            </div>
            <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
              <vue-cropper ref='cropper' :src="imgSrc" :ready="cropImage" :zoom="cropImage" :cropmove="cropImage"
                style="width:100%;height:300px;"></vue-cropper>
              <span slot="footer" class="dialog-footer">
                <el-button @click="cancelCrop">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="form.nickname" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="form.password"
              @focus.capture.native='changePasswordTip(true)' @blur.capture.native='changePasswordTip(false)'>
            </el-input>
            <div style="position: absolute" class="p10">
              <verify-pass-word-tip :password="form.password" :isShowTip='isShowTip'></verify-pass-word-tip>
            </div>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="职业">
            <el-select v-model="form.profession" clearable placeholder="请选择">
              <el-option key="bbk" label="鸡" value="bbk"></el-option>
              <el-option key="xtc" label="狗" value="xtc"></el-option>
              <el-option key="imoo" label="程序员" value="imoo"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-row>
            <el-col :span="11">
              <el-form-item label="生日">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" @change="onAgeChanged"
                  style="width: 100%;">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="年龄">
                <el-input v-model="form.age" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="爱好">
            <el-checkbox-group v-model="form.hobby">
              <el-checkbox label="步步高" name="type"></el-checkbox>
              <el-checkbox label="小天才" name="type"></el-checkbox>
              <el-checkbox label="imoo" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="个性签名">
            <el-input type="textarea" rows="8" v-model="form.signature"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import verifyPassWordTip from '../../common/verifyPassWordTip.vue'
export default {
  name: 'baseform',
  components: {
    VueCropper,
    verifyPassWordTip,
  },
  data () {
    return {
      form: {
        logid: '',
        nickname: '',
        password: '',
        age: '',
        birthday: '',
        email: '',
        phone: '',
        profession: '',
        sex: '',
        hobby: ['步步高'],
        profession: '小天才',
      },
      rules: {
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z._~!@#$^&*]+$)(?![a-z0-9]+$)(?![a-z._~!@#$^&*]+$)(?![0-9._~!@#$^&*]+$)[a-zA-Z0-9._~!@#$^&*]{8,}$$/,
            message: '密码必须是包含大小写字母、数字、特殊符号的8位以上组合，请重新输入', trigger: 'blur',
          }
        ],
        phone: [
          {
            pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '手机号码格式不正确，请重新输入', trigger: 'blur',
          },
        ],
        email: [
          {
            pattern: /^[a-z0-9A-Z]+[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-z]{2,}$/,
            message: '邮箱格式不正确，请重新输入', trigger: 'blur',
          },
        ],
      },
      defaultSrc: require('../../../assets/img/img.jpg'),
      fileList: [],
      imgSrc: '',
      cropImg: '',
      dialogVisible: false,
      isShowTip: false
    };
  },
  methods: {
    onSubmit () {
      this.$message.success('提交成功！');
    },
    setImage (e) {
      const file = e.target.files[0];
      if (!file.type.includes('image/')) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        this.dialogVisible = true;
        this.imgSrc = event.target.result;
        this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
      };
      reader.readAsDataURL(file);
    },
    cropImage () {
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    cancelCrop () {
      this.dialogVisible = false;
      this.cropImg = this.defaultSrc;
    },
    imageuploaded (res) {
      console.log(res)
    },
    handleError () {
      this.$notify.error({
        title: '上传失败',
        message: '图片上传接口上传失败，可更改为自己的服务器接口'
      });
    },
    //年龄联动
    onAgeChanged () {
      let thisYear = new Date();
      let year = thisYear.getFullYear();
      if (this.form.birthday) {
        let tYear = this.form.birthday.getFullYear();
        this.form.age = year - tYear;
      }
      else {
        this.form.age = '';
      }
    },
    changePasswordTip (isShow) {
      if (isShow) {
        this.isShowTip = true;
      } else {
        this.isShowTip = false;
      }
    },
  }
};
</script>
<style scoped>
.content-title {
    font-weight: 400;
    line-height: 50px;
    margin: 10px 0;
    font-size: 22px;
    color: #1f2f3d;
}
.pre-img {
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
}
.crop-demo {
    display: flex;
    align-items: flex-end;
}
.crop-demo-btn {
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-left: 30px;
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
}
.crop-input {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
</style>