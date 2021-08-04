<template>
    <el-card class="box-card">
        <!-- 1、面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 2、搜索 -->
        <el-row>
            <el-col>
                <el-input placeholder="请输入内容" v-model="query" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
        </el-row>

        <!-- 3、表格 -->

        <!-- 4、分页 -->
    </el-card>
</template>

<script>
export default {
    data(){
        return {
            query:''
        }
    }
}
</script>

<style>
.box-card{
    height: 100%;
}
</style>
