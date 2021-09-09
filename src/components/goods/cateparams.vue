<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1="商品列表" level2="商品列表"></my-bread>
    <!-- 提示 -->
    <el-alert
      class="alert"
      title="只允许为第三季分类设置参数"
      type="error"
    ></el-alert>
    <!-- 级联选择器 -->
    <el-form label-position="left" label-width="80px" style="margin-top: 20px">
      <el-form-item label="商品分类">
        <el-cascader
          :show-all-levels="false"
          props.expandTrigger="hover"
          :options="options"
          v-model="selectOptions"
          :props="defaultProp"
          @change="handleChange"
          clearable
        >
        </el-cascader>
      </el-form-item>
    </el-form>
    <!-- 标签页 -->
    <el-tabs v-model="active" type="card" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="1">
        <!-- 按钮 -->
        <el-button type="danger">设置动态参数</el-button>
        <!-- 表格 -->
        <el-table :data="arrDyparams" style="width: 100%">
          <el-table-column type="expand" label="#">
            <template slot-scope="scope">
              <el-tag
                :key="tag"
                v-for="tag in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row.attr_vals,scope.row.attr_id,scope.row.attr_name,tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row.attr_vals,scope.row.attr_id,scope.row.attr_name)"
                @blur="handleInputConfirm(scope.row.attr_vals,scope.row.attr_id,scope.row.attr_name)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name"> </el-table-column>
          <el-table-column label="操作">
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
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">
        <!-- 按钮 -->
        <el-button type="danger">设置静态参数</el-button>
        <!-- 表格 -->
        <el-table :data="arrStaticparams" style="width: 100%">
          <el-table-column type="index" label="#">

          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name"> </el-table-column>
          <el-table-column label="属性值" prop="attr_vals"> </el-table-column>
          <el-table-column label="操作">
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
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import myBread from '../cuscom/myBread.vue'
export default {
  components: { myBread },
  data () {
    return {
      // 级联选择器绑定的数据
      options: [],
      selectOptions: [],
      defaultProp: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 动态参数的数据数组
      arrDyparams: [],
      active: '1',
      inputVisible: false,
      inputValue: '',
      arrStaticparams: []
    }
  },
  created () {
    this.getGoodCate()
  },
  methods: {
    // 级联选择器改变
    async handleChange () {
      if (this.selectOptions.length === 3) {
        // 获取动态数据
        const res = await this.$http.get(
          `categories/${this.selectOptions[2]}/attributes?sel=many`
        )

        this.arrDyparams = res.data.data
        this.arrDyparams.forEach((item) => {
          item.attr_vals =
            item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(',')
        })
        // console.log(this.arrDyparams);
      }
    },
    // 获取三级分类的信息
    async getGoodCate () {
      const res = await this.$http.get(`categories?type=3`)
      // console.log(res);
      this.options = res.data.data
    },
    // tab切换时
    async handleClick () {
      if (this.active === '2') {
        if (this.selectOptions.length === 3) {
          // 获取静态数据
          // 获取静态参数的数据
          const res = await this.$http.get(
            `categories/${this.selectOptions[2]}/attributes?sel=only`
          )
          // console.log(res);
          this.arrStaticparams = res.data.data
        }
      }
    },
    // 点击x按钮
    async  handleClose (attr_vals, attr_id, attr_name, tag) {
      attr_vals.splice(attr_vals.indexOf(tag), 1)
      // 发送请求
      // put请求体{attr_name:?,attr_sel:?,attr_vals:?}
      // attr_name	参数名称	不能为空
      // attr_sel	[only,many]	不能为空
      // attr_vals	如果是 many 就需要填写值的选项，以逗号分隔
      let putData = {
        attr_name: attr_name,
        attr_sel: 'many',
        attr_vals: attr_vals.join(',')
      }
      const res = await this.$http.put(`categories/${this.selectOptions[2]}/attributes/${attr_id}`, putData)
      console.log(res)
    },
    // 点击+newTag按钮
    showInput () {
      this.inputVisible = true
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 回车键or失去焦点
    async handleInputConfirm (attr_vals, attr_id, attr_name) {
      let inputValue = this.inputValue
      if (inputValue) {
        attr_vals.push(inputValue)
        // 发送请求
        let putData = {
          attr_name: attr_name,
          attr_sel: 'many',
          attr_vals: attr_vals.join(',')
        }
        const res = await this.$http.put(`categories/${this.selectOptions[2]}/attributes/${attr_id}`, putData)
        console.log(res)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style>
.alert {
  margin-top: 20px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
