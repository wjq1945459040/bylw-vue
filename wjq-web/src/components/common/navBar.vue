<template>
  <div>
    <nav id="nav" class="gird-header" align="center">
      <ul align="center" class="">
        <li>
          <h2 class="small-bt" style="font-family: STSong">ONESTAR</h2>
        </li>
        <li><a href="#"><i class="el-icon-s-home"></i>首页</a></li>
        <li><a href="#"><i class="el-icon-menu"></i>资源库</a></li>
        <li><a href="#"><i class="el-icon-reading"></i>资源库</a></li>
        <li><a href="#">资源库</a></li>
        <li><a href="#">资源库</a></li>
      </ul>
      <div class="search">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="请选择">
            <el-option label="餐厅名" value="1"></el-option>
            <el-option label="订单号" value="2"></el-option>
            <el-option label="用户电话" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  data () {
    return {
      input3: '',
      select: ''
    }
  }
}
</script>

<style scoped>
/*导航栏样式*/
.gird-header {
    width: 100%;
    min-height: 60px;
    opacity: 0.8;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.8);
    top: 0;
    left: 0;
    font-size: 15px;
}
.gird-header ul {
    width: 1200px;
    margin: 0 auto;
    list-style-type: none;
}
.gird-header li {
    width: 100px;
    margin-left: 20px;
    text-align: center;
    float: left;
    font-size: 20px;
    margin-top: 15px;
}
.gird-header li:first-child {
    width: 250px;
    margin-left: 20px;
    margin-top: 0px;
}
.gird-header a {
    color: #ffffffb3;
}
.small-bt {
    font-size: 40px;
    color: #b5cc18;
}
.el-select .el-input {
    width: 130px;
}
.input-with-select .el-input-group__prepend {
    background-color: rgba(0, 0, 0, 0.8);
}
.search {
    width: 300px;
    float: right;
    margin-top: 15px;
    margin-right: 50px;
}
</style>

