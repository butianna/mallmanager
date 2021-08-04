<template>
  <div class="login-warp">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button
      @click.prevent="handleLogin()"
      class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    // 登录请求
    async handleLogin () {
      // ES7 async await(让异步操作 看起来像同步操作)
      const res = await this.$http.post('login', this.formdata)

      //   console.log(res)
      const { data, meta: { msg, status } } = res.data

      if (status === 200) {
        // 登录成功
        // 0、保存token
        // 如果用户没登录--url直接来到home组件
        // 在登录成功时 保存正确用户的token
        localStorage.setItem('token', data.token)
        // 1、跳转home
        this.$router.push({name: 'home'})
        // 2、提示成功
        this.$message.success(msg)
      } else {
        // 不成功
        // 1、提示消息
        this.$message.error(msg)
      }

      /* this.$http.post('login', this.formdata)
        .then((res) => {
        //   console.log(res)
          const { data, meta: { msg, status } } = res.data

          if (status === 200) {
            // 登录成功
            // 1、跳转home
            this.$router.push({name: 'home'})
            // 2、提示成功
            this.$message.success(msg)
          } else {
            // 不成功
            // 1、提示消息
            this.$message.error(msg)
          }
        }) */
    }
  }
}
</script>

<style>
.login-warp{
    /* 最外层的div也要设置 height:100%; */
    height: 100%;
    background-color: #324152;
    /* 弹性盒布局 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-warp .login-form{
    width: 400px;
    background-color: #fff;
    border-radius: 5px;
    padding: 30px;
}

.login-warp .login-btn{
    width: 100%;
}
</style>
