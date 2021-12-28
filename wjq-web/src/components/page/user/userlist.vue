<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 用户列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAllSelection">批量删除
        </el-button>
        <el-select v-model="query.status" placeholder="用户状态" class="handle-select mr10" clearable
          @keyup.enter.native="handleSearch">

          <el-option v-for="item in state" :label="item.text" :key="item.value" :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="query.name" placeholder="用户名" class="handle-input mr10" @keyup.enter.native="handleSearch">
        </el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索
        </el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="logid" label="ID" width="100" align="center"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width='100' align="center"></el-table-column>
        <el-table-column label="头像(查看大图)" align="center">
          <template slot-scope="scope">
            <el-image class="table-td-thumb" :src="scope.row.avatar" :preview-src-list="[scope.row.avatar]"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="status" :formatter="onLineStatus" label="状态" align="center">
          <!-- <template slot-scope="scope">
            <el-tag :type="scope.row.status==='登录中'?'success':
                    (scope.row.status==='已注销'?'warning':
                    (scope.row.status==='锁定'?'danger':''))">{{scope.row.status}}
            </el-tag>
          </template> -->
        </el-table-column>

        <el-table-column prop="createDate" label="注册时间" width="250" :formatter="dateFormat" align="center">
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">查看</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" icon="el-icon-delete" class="red" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next,sizes,jumper" :page-sizes="[5, 10, 15]"
          :current-page="query.pageIndex" :page-size="query.pageSize" :total="pageTotal"
          @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :model="form" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.logid"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex" size="small">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="个性签名">
          <el-input v-model="form.signature"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;">
            </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="权限">
          <el-checkbox-group v-model="authority">
            <el-checkbox v-for="(key, value) in auths" :label="value" :key="value"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import moment from 'moment'
export default {
  inject: ['reload'],
  name: 'basetable',
  data () {
    return {
      query: {
        status: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      reload: this.reload,
      userstatus: [],
      authority: [],
      auths: [],
      state: [],
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created () {
    this.getData();
    this.getAuthority();
    this.getUserStatus();
  },
  methods: {
    //表格时间格式化
    dateFormat (row, column) {
      let date = row[column.property];
      if (date === undefined) {
        return '';
      }
      return moment(date).format('YYYY-MM-DD HH:mm') // 这里可修改的格式
    },
    //用户状态渲染
    onLineStatus (row, column) {
      let sta = row[column.property];
      if (sta === undefined) {
        return '';
      }
      console.log("sta: " + sta);
      for (let i = 0; i < this.state.length; i++) {
        console.log("value" + this.state[i].value);
        let value = this.state[i].value;
        if (sta === value) {
          console.log(this.state[i].text);
          return this.state[i].text;
        }
      }
    },
    // 获取列表数据
    getData () {
      const _this = this;
      _this.$axios.post('/userlist', this.query, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        }
      }).then(res => {
        console.log(res);
        this.tableData = res.data.data.records;
        this.pageTotal = res.data.data.total;
      });
    },
    //获取权限
    getAuthority () {
      const _this = this;
      _this.$axios.post('/getAuthority').then(res => {
        this.auths = res.data.data;
      });
    },
    //获取用户状态
    getUserStatus () {
      const _this = this;
      _this.$axios.post('/getUserStatus').then(res => {
        this.state = res.data.data;
      });
    },
    // 触发搜索按钮
    handleSearch () {
      this.$set(this.query, 'pageIndex', 1);
      this.getData();
    },
    // 删除操作
    handleDelete (index, row) {
      // 二次确认删除
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      }).then(() => {

        const _this = this;
        _this.$axios.post('/user/delete?id=' + row.id).then(res => {

          if (res.data.code === 200) {
            Message({
              showClose: true,
              message: "删除成功",
              type: 'success',
              center: true
            })
            //注册成功后跳到登录页登录
            this.reload();
          } else {
            Message({
              showClose: true,
              message: "删除失败，请联系管理员",
              type: 'error',
              center: true
            })
          }

        });
      })
        .catch(() => { });
    },
    // 多选操作
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    //多选删除
    delAllSelection () {
      this.$confirm('确定要删除吗？', '提示', {
        type: 'warning'
      }).then(() => {

        const length = this.multipleSelection.length;
        let str = [];
        this.delList = this.delList.concat(this.multipleSelection);
        for (let i = 0; i < length; i++) {
          str.push(this.multipleSelection[i].id);
        }

        let ids = str.join(',');
        const _this = this;
        _this.$axios.post('/user/delete?id=' + ids).then(res => {

          if (res.data.code === 200) {
            Message({
              showClose: true,
              message: "删除成功",
              type: 'success',
              center: true
            })
            //注册成功后跳到登录页登录
            this.reload();
          } else {
            Message({
              showClose: true,
              message: "删除失败，请联系管理员",
              type: 'error',
              center: true
            })
          }
        });
      }).catch(() => { });
    },
    // 编辑操作
    handleEdit (index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit () {
      this.editVisible = false;
      this.form.authority = this.authority;
      const _this = this;
      _this.$axios.post('/user/save', this.form, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        }
      }).then(res => {
        console.log(res);

      });

      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange (val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    }
  }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
