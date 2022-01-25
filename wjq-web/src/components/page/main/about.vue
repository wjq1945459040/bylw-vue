<template>
  <div class="about">

    <nav-bar></nav-bar>
    <el-container class="analysis">
      <el-header class="m-bg">
        <!--顶部背景图片-->
        <div class="m-margin-top-maxx" align="center">
          <img class="image-me" align="center" src="../../../assets/img/me.jpg" style="width: 150px;height: 150px;">
          <div class="m-font-size-title-large" align="center">wjq</div>

        </div>
      </el-header>
      <el-main class="main">
        <!--导航-->
        <my-tag content="最新推荐"></my-tag>
        mian
      </el-main>
      <el-footer class=" footer">
        <div class="box" align="center">
          <ul style="overflow:hidden;clear:both;">
            <li>

              <span style="font-size: large;font-weight: bold;color: #000;"
                class="m-text-thin m-text-spaced m-margin-top-max">联系我
              </span>
              <br>
              <span href="#" class="m-text-thin" style="color:rgba(255,255,255,.9)">Email：onestarlr@hotmail.com</span>
              <br>
              <span href="#" class="m-text-thin" style="color:rgba(255,255,255,.9)">QQ：316392836</span>

            </li>
            <li>
              <div class="ui inverted link list">
                <div href="#" class="m-text-thin" style="color:rgba(255,255,255,.9)">Email：onestarlr@hotmail.com</div>
                <div href="#" class="m-text-thin" style="color:rgba(255,255,255,.9)">QQ：316392836</div>
              </div>
            </li>
            <li>
              <!--博客运行时间统计-->
              <span class="small-bt">客栈信息
              </span>
              <div id="blog-message">
                <div class="ui inverted link list" style="align-content: center;margin-top: 10px">
                  <div class="m-text-thin" style="text-align: left;">
                    留言总数：14条
                  </div>
                  <div class="m-text-thin" style="text-align: left;">
                    留言总数：14条
                  </div>
                  <div class="m-text-thin" style="text-align: left;">
                    留言总数：14条
                  </div>
                  <div class="m-text-thin" style="text-align: left;">
                    留言总数：14条
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div style="color: #F08047;" align="center" class="db-1">
          <el-divider></el-divider>
          <span class="m-text-thin">我的客栈已营业： (*๓´╰╯`๓)</span>
        </div>
      </el-footer>

      <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap" :bottom="100">
        <div style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }">
          UP
        </div>
      </el-backtop> -->
    </el-container>
  </div>
</template>

<script>
import navBar from "../../common/navBar";
import myTag from "../../common/myTag";
export default {
  name: "About",
  components: {
    navBar,
    myTag,
  },
  data () {
  },
  /**
   * 
   * */
  mounted () {

  },
  methods: {

  }
}

</script>

<style scoped>
.about {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.analysis {
    width: 100%;
    height: calc(100%);
    background: url('../../../assets/img/bk_img1.png') no-repeat;
    background-attachment: fixed;
    background-size: 100% 100%;
    font-size: 20px;
    overflow-y: scroll;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.m-bg {
    min-height: 100%;
    background: url('../../../assets/img/frontPage.jpg') no-repeat;
    background-attachment: relative;
    background-size: 100% 100%;
    font-size: 20px;
}
.m-font-size-title-large {
    font-size: 30px;
    color: #ffffff;
    font-family: STSong;
}
.image-me {
    margin-top: 75px;
    border-radius: 50%;
}
.main {
    min-height: 1200px;
}
.footer {
    width: 100%;
    min-height: 300px;
    background: #1b1c1d;
    background-color: rgba(0, 0, 0, 0.7);
}
.db-1 {
    position: relative;
    bottom: -35px;
}
.m-text-thin {
    font-weight: 15px;
    font-size: 15px;
}
.m-margin-top-max {
    margin-top: 35px;
}
.m-text-spaced {
    letter-spacing: 1px;
}

.box ul {
    padding-top: 70px;
    width: 1000px;
    height: auto;
    list-style-type: none;
    margin: 0 auto;
}
.box li {
    width: 300px;
    text-align: center;
    float: left;
}
.small-bt {
    font-size: large;
    color: #fff;
}
</style>

