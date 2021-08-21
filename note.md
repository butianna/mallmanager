>1.准备
1. api-server
    itcast.sql导入
    config/default.json->自己数据库配置信息
    start.bat
启动项目服务器

2. vue init webpack 项目名
    ESlint自动检查代码规范
    npm run dev 启动开发模式

>2.项目目录说明
1. src/
2. build/webpack相关代码
3. config/本地服务器配置
4. .eslintignore eslint排除文件
5. .eslinttrc eslint配置文件

>3.代码规范-自定义指令-lintfix
1. 结尾没有;
2. 必须用全等
3. 不允许出现未使用的变量
4. 不允许出现一行以上空行

在package.json中script 自定义指令：指令很长
npm run 自定义指令名(dev)
npm run lintfix(自动按照规范修正全部(但是多余变量这个err不会修正)的js代码)
npm run gitcus
自动打开浏览器 dev:"xxxx --open"
关闭eslint build/webpack.base.conf.js 注释掉

>4.项目-准备-element-ui文档分析
element-ui 饿了么开发团队
适用于vue项目-pc端项目
在main.js中引入

>5.项目-准备-element-ui-安装-引入
npm i element-ui -S
在main.js import
Vue.use(ElementUI)

>6.项目-准备-项目模板简化-调整
删除模板中我们用不到的文件/代码

>7.项目准备-git版本控制
git/svn
1. git init
2. git status
3. git add .
4. git commit -m "注释"
5. 在代码托管平台(github)新建远程仓库
6. git remote add origin 地址
7. git push -u origin master(之后再push 直接git push)

>8项目-登录-新建分支-login组件-配置路由
新建一个分支 专门写的登录功能
git branch
git checkout -b dev-login
新建组件+配置路由
注意：
1.commit每完成一个小功能就commit一次
2.push操作master去完成


>9项目-登录-引入表单组件
el-form
1. 引入
2. 调整标签(h2+el-button)
label-position = "top"

>10项目-登录-样式调整
height：100%
注意：div#app height：100%

>11项目-登录-axios插件
axios不是vue插件-Vue.use(axios)
// 插件模块
import axios from 'axios'
const MyHttpServer = {}
MyHttpServer.install = (Vue) => {
    // 添加实例方法
    Vue.prototype.$http = axios
}
export default MyHttpServer
在main.js中 导入之后Vue.use(插件名)
结果：this.$http.get()

>12项目-登录-发送登录请求
login.vue methods handleLogin()
1.this.$http.post('login')
2.对象结构赋值 res.data
const {
          data,
          meta: { msg, status },
} = res.data;

>13项目-登录-引入提示框组件
this.$message.waring(msg)

>14项目-登录成功-进入home组件
登录成功->来到home组件
1. js编程式导航this.$router.push({ name: "home" });
2. App.vue router-view
3. 新建hone组件
4. 路由index.js配置路由

>15项目-登录-简化登录请求代码-async和await
让异步代码ajax看起来像同步代码
1.找到异步操作有结果的代码 前面加await 同时接口异步操作的结果res
2.找到距离异步操作有结果的代码最近的方法 前面加async
async handleLogin() {
      /*  
      希望让异步操作的代码 看起来像同步代码
      ES7 async+await
      */
      const res = await this.$http.post("login", this.formdata);
      // console.log(res);
      const {
        data,
        meta: { msg, status },
      } = res.data;
      if (status === 200) {
        // console.log(res)
        // 1.登录成功 跳转home 提示成功
        this.$router.push({ name: "home" });
        this.$message.success(msg);
      } else {
        // 2.不成功 提示消息
        this.$message.waring(msg);
      }
},

>16项目-登录-保存taken值
目的：如果用户没登录->url直接来到home组件
在登录成功时 保存正确用户的token
localStorage.setItem('token','data.token');

>17项目-首页-布局容器 -使用-样式调整
引入布局容器

>18项目-首页-头部-样式调整
Layout布局
行el-row
列el-col
注意:24栏

>19项目-首页-侧边栏-导航组件-文档
el-menu
1.router 开启路由模式 true index值==path值
2.unique-opened是否只保持一个子菜单展开

>20项目-首页-侧边栏-引入导航组件-调整
调整el-menu
index值不能一样

>21项目-首页-进入首页的权限认证
如果没有登录过 就不能进入到home组件
//newVue之前自动触发
 beforeCreate() {
    // 获取tokem
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "login" });
    }
    // 如果有继续渲染组件
    // 没有 登录
  },

>22项目-首页-头部-退出功能
loginOut() {
      // 1.清除token
      localStorage.clear();
      // 2.提示
      this.$message.success("退出成功");
      // 3.来到login组件
      this.$router.push({ name: "login" });
    },

>23项目-首页-合并分支-新建用户分支
1. 切到master
2. git merge dev-login 合并分支
3. push 
4. 新建dev-users

>24项目-用户管理-用户列表-新建组件-路由配置
1. home.vue 开启了路由模式 index值->path值
2. home.vue main->router-view
3. 新建users.vue
4. router/index.js 在home中children配置users的路由

=============================================================================

>1项目-用户管理-用户列表-面包屑和搜索框
1. el-card 卡片 小容器
2. 面包屑
3. el-row>el-col>el-inpit+el-button
4. 调整样式

>2项目-用户管理-用户列表-引入表格组件
el-table(data数据源[]) > el-table-column(label表头/prop="数据")

>3项目-用户管理-用户列表-表头处理
按照效果 调整了表头的数量和lable
type="index" ->该列的每个单元格的内容从1开始的序号

>4项目-用户管理-用户列表-请求数据-设置请求头
1. create(){this.getUserList()}
2. methods:{getUserList(){发送请求}}
3. 接口文档中 除了登录之外的所有请求都需要进行授权->设置请求头
4. 找axios中关于请求头设置的代码
const AUTH_TOKEN = localStorage.getItem;
this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

>5项目-用户管理-用户列表-渲染数据-一般数据
1.解构赋值 给this.userlist = res.data.data.users
2.prop=""
<!-- username -->
<!-- email -->
<!-- mobile -->
<!-- create_time -->
<!-- mg_state -->

>6项目-用户管理-用户列表-渲染数据-日期格式处理
1. main.js 全局过滤器 format
2. 
  2.1 prop="create_time | formate" 不行！
  2.2 单元格内容只能显示文本
  2.3 需要给该内容加容器template
  >不同组件的数据不是共享 独立作用域
  2.4最终写法
  >slot-scope 作用:传值
  >slot-scope的值会自动去上一级找最外层标签el-table所绑定的数据userlist
  >slot-scope="scope" 此时"scope"==userlist数组
  >scope.row是数组的每个对象
  >scope.row.create_time我们要用的数据
  <el-table-column prop="create_time" label="创建日期">
        <template slot-scope="scope">
          {{ scope.row.create_time | formatdate }}
        </template>
  </el-table-column>

>7项目-用户管理-用户列表-渲染数据-用户状态开关
el-switch v-model="bool"
<el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
</el-table-column>

>8项目-用户管理-用户列表-渲染数据-操作
操作里面不是字符串
1. template容器
2. el-button
>size="mini" plain

>9项目-用户管理-用户列表-分页组件-文档-引入
>该接口支持分页  url参数中有pagenum pagesize
1. @size-change 每页显示条数变化时候 触发
2. @current-change 当前页面改变时,触发
3. current-page  设置当前页是第几页
4. page-sizes=[2,4,6,8] 每页多少条的数据数组
5. page-size 设置显示多少条
6. total 数据总数

>10项目-用户管理-用户列表-分页组件0配置数据
1. current-page = "pagenum"
2. page-size = 2
3. :total = "total"

>11项目-用户管理-用户列表-分页组件-分页请求
1. 每页显示条数改变 ->this.pagesize = val ->this.getUserList()
2. 页码改变时 -> this.pagenum = val ->this.getUserList()
希望当每页条数改变时 从第一页开始显示 this.pagenum=1 ->currPage=1

>12项目-用户管理-用户列表-搜索用户
1. 给搜索输入款绑定query v-model="query"
2. 点击搜索按钮发送请求
3. 一键清除 clearable
4. 点击清除按钮 ->重新获取数据

>13项目-用户管理-用户列表-添加用户-显示对话框
1. 引入对话框 > el-from
2. 点击添加用户的按钮->显示对话框 this.dialogFormVisibleAdd = true
3. 配置对话框
  3.1 dialogFormVisibleAdd:false
  3.2 el-form>el-input v-model="form.xxx"

>14项目-用户管理-用户列表-添加用户-发送请求
1. post this.form
2. 关闭对话框
3. 清空文本框this.form={}
4. 更新视图
5. 提示框
post status===201

>15项目-用户管理-用户列表-添加用户-处理响应

>16项目-用户管理-用户列表-删除用户-打开确认框
this.$confirm().then().catch()
点击确定->.then的参数
点击取消->.catch的参数

>17项目-用户管理-用户列表-编辑用户-显示对话框
1. 点击确定->发送delete请求
1.1 提示
1.2 更新数据
1.3 回到第一页
>注意async的位置
this.$confirm("删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(async () => {
          // 发送删除请求 :id --->用户id
          // 1.data中找userId
          // 2.把userId以showDeleUserMsgBox参数形式传进来
          const res = await this.$http.delete("users/${userId}");
          console.log(res);
          if (res.data.meta.status === 200) {
            this.pagenum = 1;
            // 更新视图
            this.getUserList();
            // 提示
            this.$message({
              type: "success",
              message: res.data.meta.msg,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });

>18项目-用户管理-用户列表-编辑用户-显示对话框
>点击操作中的编辑按钮--打开编辑对话框
0. 提供对话框显示/隐藏控制属性 dialogFormVisibleEdit
1. 找到编辑按钮@click
2. 打对开话框
3. 把之前添加对话框进行复制-修改
form用的是之前按添加用户的form

>19项目-用户管理-用户列表-补充
1. 之前分页 回到第一页的写法 this.pagenum = 1
2. el-table 固定表头 height = "250px"
   overflow:auto

>20扩展-git的使用
1. gitbash -> 指令操作
2. gitGUI -> 图形页面 -> 一个操作git的软件
实际开发中 bash频率多

=============================================================================

>1项目-用户管理-用户列表-编辑用户-显示编辑数据
1. 点击edit编辑按钮 scope.row
2. 在showEditUserDia方法中 this.form = user  user其实是scope.row
用户名 禁用

>2项目-用户管理-用户列表-编辑用户-发送请求
1. 找到对话框的确定按钮 -> editUser() -> 发送请求
this.form = user
id -> this.form.id
先点编辑 再点添加 ->打开添加对话框之前 this.form={}

>3项目-用户管理-用户列表-修改用户状态
1. 找到开关 @change = "changeMgState()"
2. changeMgState(){发送请求}
users/:uId/state/:type uid用户id

>4项目-用户管理-用户列表-分配角色=功能演示
1. 点击按钮 ->打开对话框
2. 对话框 中有下拉框
3. 修改当前用户的角色
4. 5个角色来源于请求
每个角色的权限是不同的

>5项目-用户管理-用户列表-分配角色-显示对话框
1. 点击操作中的按钮->打开对话框
2. 移入对话框(有下拉框)
  下拉框的特性：如果select绑定的数据的值和potion的value值一样 此时显示的是该option的label值
3. 把option分成了两类 请选择(-1) 和 v-for遍历option
4. data提供了el-select的v-model所绑定的数据currRoleId = -1

>6项目-用户管理-用户列表-分配角色-显示对话框-下拉框
el-select 和 el-option
改变label时->该label显示->改变了value->el-select v-model绑定的数据 自动关联

>7项目-用户管理-用户列表-分配角色-显示当前用户角色
1. 通过请求所有角色 roles
2. v-for el-option :label="item.roleName" :value="item.id"
3. 通过请求获取当前用户的rod

4. 给el-select中vomodel绑定的数据赋值 this.currRoleId = res.data.data.rid
rid接口文档的参数名时role_id

>8项目-用户管理-用户列表-分配角色-修改用户角色
1. 通过视图操作->修改了label->value值变化->el-select v-model绑定的数据变化
2. currRoleId
在setRole方法中要使用用户id 在data声明currUserId：-1
3. 在showSetUserRoleDia(){this.curruserId=user.id} 

>9项目-用户管理-用户列表-合并分支-推送
1. git add .
2. git commit -m "注释"
3. git branch
4. git checkout master
5. git merge dev-users
6. git push


>10项目-权限管理-权限列表-新建组件-路由配置
1. 新建right.vue
2. home.vue改标识
3. 配置路由

>11项目-权限管理-权限列表-自定义面包屑组件
好多组件都有面包->二次封装了面包屑组件
1. 新建.vue文件 
2. 在自定义组件中提供数据 level1 levle2->props:[]
3. main.js引入
4. Vue.component('my-bread',MyBread)

>12项目-权限管理-权限列表-获取权限列表数据  
type参数 值list 或者 tree

>13项目-权限管理-权限列表-axios拦截器-同意这是请求头
在请求发起之前 都需要设置头部信息
在请求发起之前 要添加头部->axios文档
请求拦截器 config.header
响应拦截器 (目前没使用)

>14项目-权限管理-权限列表-表格展示
引入el-table 绑定数据 rightlist (authName path level)

>15项目-权限管理-权限列表-表格展示-层级显示
level==='0' 一级
1. template slot-scope="scope"
2. v-if="scope.row.level==='0'" 一级

>16项目-权限管理-权限列表-表格展示-滚顶表头
给el-tabel设置固定高
overflow：auto

>17项目-权限管理-角色列表-面包屑和配置路由
1. 新建role.vue组件
2. 配置路由

>18项目-权限管理-角色列表-面包屑和添加按钮
1. 自定义面包屑 
2. 添加按钮

>19项目-权限管理-角色列表-获取角色列表数据
发送请求 this.$http.get(`roles`)

>20项目-权限管理-角色列表-表格展示
将users.vue中的表格进行复制 修改
1. :data = 'rolelist'
2. roleName
3. rolDesc
4. 操作

>21项目-权限管理-角色列表-表格展示-展开行功能分析
1. type="expand"
2. template > 该角色的权限(三级)
3. 页面布局如果是行列问题->for循环 >v-if嵌套 el-tag

>22项目-权限管理-角色列表-表格展示-展开行-一级权限
1. 分析数据rolelist > 每个对象中的children中authName
2. 布局 一行>(列A>(el-tag)+列B>(一行el-row))>两列((el-colA>el-tag+el)-colB>el-tag)
3. 一级权限展示 v-for 最外层的el-row scope.row.children
 
=============================================================================

>1项目-权限管理-角色列表-表格展示-展开行-二级权限
<el-row v-for="(item2, i) in item1.children" :key="i">
  <el-col :span="4">
    <el-tag>{{ item2.authName }}</el-tag>
  </el-col>
  <el-col :span="20"></el-col>
</el-row>

>2项目-权限管理-角色列表-表格展示-展开行-三级权限
在二级权限展示完毕基础上
v-fot遍历的是item2.children el-tag

>3.项目-权限管理-角色列表-表格展示-展开行-样式调整
1. el-tag颜色 type="success"
2. closable
3. <i class=""></i>

>4.项目-权限管理-角色列表-表格展示-展开行-处理无权限的展示
角色无权限时 提示
<span v-if="scope.row.children.length === 0">未分配权限</span>

>5.项目-权限管理-角色列表-表格展示-展开行-取消权限
点击X按钮 取消该角色的权限
1. 给el-tag @close="deleRight(scope.row.id,itemx.id)"
2. deleRight(roleId,rightId){发送请求}
3. this.$http.delete(`roles/${roleId}/rights/${rightId}`)
4. 更新视图
删除成功 返回了该角色的剩余权限

>6.项目-权限管理-角色列表-表格展示-展开行-取消权限-优化
删除成功->更新整个表格->没必要
删除成功 返回了该角色的剩余权限
删除成功->更新了当前角色的children

>7.项目-权限管理-角色列表-表格展示-修改权限-显示对话框
点击操作的check按钮->打开对话框
1. 提供对话框
2. check按钮 @click="showSetRightDia(scope.row)"

>8.项目-权限管理-角色列表-表格展示-修改权限-树形结构-文档分析
树形结构el-tree
  date->数据源[]
  show-checkbox->选择框
  node-key 每个节点的唯一标识 通常是data数据源中key名id
  default-expanded-keys 默认展开[要展开的节点的id]
  default-checked-keys  [要选择的节点的id]
  props 配置项{label,children}
  label节点的文字标题和children节点的子节点
  值都来源于data绑定的数据源中的该数据的key名 'label' 和'childern'

  >9.项目-权限管理-角色列表-表格展示-修改权限-树形结构-配置数据
  1. data中treelist
  2. 打开对话框时 获取属性结构的权限列表数据
  const res = await this.$http.get(`rights/tree`)
  this.treelist = res.data.data
  3. el-tree :data="datalist"
  4. el-tree node-key="id"
  5. :props={label: "authName",children: "children"}
  默认展开项和选中还没写

>10.项目-权限管理-角色列表-表格展示-修改权限-树形结构-展开所有项
el-tree default-expand-all
default-expanded-keys = "[所有权限的id]" for嵌套

>11.项目-权限管理-角色列表-表格展示-修改权限-树形结构-显示角色拥有的权限
el-tree default-checked-key="arrcheck"
1. data arrcheck
2. role for嵌套最里层的叶子节点的id
3. this.arrcheck = arrtemp1

>12-13.项目-权限管理-角色列表-表格展示-修改权限-树形结构-分配权限-分析和实现
1. 点击对话框的确定 发送请求
    roleId rids
2. roleId 在打开对话框的方法中this.currRoleId = role.id
3. 
    3.1 获取全选的id的数组 getCheckedKeys()
    3.2 获取半选的id的数组 getHalfCheckedKeys()
4. 在js中调用el-tree的js方法
    4.1给el-tree设置ref 
    4.2this.$refs.ref的值tree.js方法(3.1和3.2的方法名)
    4.3返回两个数组arr1 和 arr2
5. ES6 展开运算符
    let arr = [...arr1,...arr2]
6. this.$http.post(`roles/${this.currRoleId}/rights`, {rids: arr.join(","),});
7. 更新视图关闭对话框
rids是树形节点中 所有全选和半选的label的id[]
获取全选的id的数组arr1 getCheckedKeys()
获取半选的id的数组arr2 getHalfCheckedKeys()
arr = arr1 + arr2
el-tree->js方法
1.给要操作的dom元素 设置ref属性值 input ref = "txt"
2.this.$refs.ref属性值.js方法名() this.$refs.txt.focus() 

>14.项目-首页-侧边导航栏-动态导航

>15.

>16.项目-不同的
