<template>
  <el-card class="box-card">
    <!-- 1、面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 2、搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          @clear="loadUserlist()"
          placeholder="请输入内容"
          v-model="query"
          class="inputSearch"
          clearable
        >
          <el-button
            @click.prevent="searchUser()"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button type="success" plain @click="showAddUserDia()"
          >添加用户</el-button
        >
      </el-col>
    </el-row>

    <!-- 3、表格 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column type="index" label="#" width="60"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="160"> </el-table-column>
      <el-table-column prop="mobile" label="电话" width="140">
      </el-table-column>
      <el-table-column label="创建日期" width="160">
        <!--
            如果单元格内显示的内容不是字符串（文本）
            需要给被显示的内容外层包裹一个template
           -->
        <!-- 
            template内部要用数据 设置slot-scope属性
            该属性的值是要用数据create_time的数据源userlist
        -->
        <!--
            slot-scope的值userlist其实就是el-table绑定的数据userlist
            userlist.row---》数组中的每个对象
        -->
        <template slot-scope="userlist">
          {{ userlist.row.create_time | formatdate }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态" width="160">
        <template slot-scope="scope">
          <el-switch
            @change="changeMgStats(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click="showEditUserDia(scope.row)"
            size="mini"
            type="primary"
            icon="el-icon-edit"
            plain
            circle
          ></el-button>
          <el-button
            @click="showDeleUserMsgBox(scope.row.id)"
            size="mini"
            type="danger"
            icon="el-icon-delete"
            plain
            circle
          ></el-button>
          <el-button
            size="mini"
            type="success"
            icon="el-icon-check"
            plain
            circle
            @click="showSetUserRoleDia(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 4、分页 -->
    <!--
      该接口支持分页 url参数中有pagenum pagesize
      @size-change:每页显示条数变化时触发
      @current-change：当前页改变时 触发
      current-page：设置当前页是第几页
      page-sizes：每页多少条的数据数组
      page-size：设置显示多少条
      total：数据总数
     -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 对话框 -->
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <!-- required="true" 必填的五角星 -->
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密 码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input
            disabled
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          {{ currUsername }}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <!-- 
              如果外层select绑定的数据的值和option的value一样 
              就会显示该option的label值
          -->
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              :label="item.roleName"
              :value="item.id"
              v-for="(item, i) in roles"
              :key="i"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      // 表格绑定的数据
      userlist: [],
      // 分页相关的数据
      total: -1,
      pagenum: 1,
      pagesize: 2,
      // 添加对话框的属性
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false,
      dialogFormVisibleRol: false,
      // 添加用户的表单数据
      form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 分配角色
      currRoleId: -1,
      currUserId: -1,
      currUsername: "",
      // 保存所有的角色数据
      roles: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    //   获取用户列表的请求
    async getUserList() {
      //   query 查询参数 可以为空
      // pagenum 当前页码 不能为空
      // pagesize 每页显示条数 不能为空

      // 需要授权的API 必须在请求头中使用 Authorization 字段提供token令牌
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}
              &pagesize=${this.pagesize}
              `
      );
      console.log(res);
      const {
        meta: { status, msg },
        data: { users, total },
      } = res.data;
      if (status === 200) {
        // 1、给表格数据赋值
        this.userlist = users;
        // 2、给total赋值
        this.total = total;
        // 3、提示
        this.$message.success(msg);
      } else {
        // 提示
        this.$message.warning(msg);
      }
    },
    // 分页相关的方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // 每页显示条数改变
      this.pagesize = val;
      this.pagenum = 1;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      // 页码改变时
      this.pagenum = val;
      this.getUserList();
    },
    // 搜索用户
    searchUser() {
      this.getUserList();
    },
    // 清空搜索框 重新获取数据
    loadUserlist() {
      this.getUserList();
    },
    // 添加用户--显示对话框
    showAddUserDia() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    // 添加用户--发送请求
    async addUser() {
      // 2、关闭对话框
      this.dialogFormVisibleAdd = false;

      const res = await this.$http.post(`users`, this.form);
      console.log(res);
      const {
        meta: { status, msg },
        data,
      } = res.data;
      if (status === 201) {
        // 1、提示成功
        this.$message.success(msg);
        // 3、更新视图
        this.getUserList();
        // 4、清空文本框
        // this.form.username = ""
        this.form = {};
        /* 循环清空文本框
        for (const key in this.form) {
          if (this.form.hasOwnProperty(key)) {
            this.form[key] = "";
          }
        } */
      } else {
        this.$message.warning(msg);
      }
    },
    //删除用户--打开消息盒子 confirm
    showDeleUserMsgBox(userId) {
      this.$confirm("删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // v 注意async的位置 它在离await最近的函数
          // 发送删除的请求：id---用户id
          // 1、data中找到userId
          // 2、把userId以showDeleUserMsgBox参数形式传进来
          const res = await this.$http.delete(`users/${userId}`);
          console.log(res);
          if (res.data.meta.status === 200) {
            // 页码回到第一页
            this.pagenum = 1;
            // 提示
            this.$message({
              type: "success",
              message: res.data.meta.msg,
            });
            // 更新视图
            this.getUserList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 编辑用户---显示对话框
    showEditUserDia(user) {
      console.log(user);
      // 获取用户数据
      this.form = user;
      // user 其实是调方法传过来的scope.row
      this.dialogFormVisibleEdit = true;
    },
    // 编辑用户-发送请求
    async editUser() {
      // users/:id
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      console.log(res);
      // 1、关闭对话框
      this.dialogFormVisibleEdit = false;
      // 2、更新视图
      this.getUserList();
    },
    // 修改状态
    async changeMgStats(user) {
      // 发送请求
      // users/:uId/state/:type
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      console.log(res);
    },
    // 分配角色 打开对话框
    async showSetUserRoleDia(user) {
      this.currUsername = user.username;
      // 给currUserId赋值
      this.currUserId = user.id;
      // 获取当前用户角色的id->rid
      const res = await this.$http.get(`users/${user.id}`);
      // console.log(res);
      // 接口文档的key名是role_id 其实是rid
      this.currRoleId = res.data.data.rid;
      // 获取所有的角色
      const res1 = await this.$http.get(`roles`);
      console.log(res1);
      this.roles = res1.data.data;
      this.dialogFormVisibleRol = true;
    },
    //分配角色 发送请求
    async setRole() {
      // users/:id/role
      // :id 要修改的用户的id的值
      // 请求体中rid修改的新值角色id
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.currRoleId,
      });
      console.log(res);
      // 关闭对话框
      this.dialogFormVisibleRol = false;
    },
  },
};
</script>

<style>
.box-card {
  height: 100%;
}
.inputSearch {
  width: 300px;
}
.searchRow {
  margin-top: 20px;
}
</style>
