<script setup>
import {reactive} from "vue";


const data = reactive({
  list:[
    {id:'1',name:"卷王",email:'',remark:'juwangcode.com',create_time:'2024-05-26'},
    {id:'2',name:"juwanKing",email:'king',remark:'juanKingcode.com',create_time:'2024-05-26'}
  ]
})
</script>

<template>
  <el-table :data="data.list" border>
    <el-table-column prop="id" label="ID" width="60" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="remark" label="备注"/>

    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button size="small" type="primary">编辑</el-button>
        <el-button size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped></style>