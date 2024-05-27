<script setup>

import {reactive} from "vue";
import {ElMessage} from "element-plus";
import AxiosUtil from "@/Utils/AxiosUtil.js";
import TimeUtil from "@/Utils/TimeUtil.js";

const data = reactive({
  name:'',
  password:'',
  email:'',
  gender:'0',
  remark:'juanwangcode.com'
})

const add = () =>{
  console.log(data)

if(data.name == '') {
  ElMessage.error("姓名不能为空！")
  return
}
if(data.password == '') {
  ElMessage.error("密码不能为空！")
  return
}

data.create_time = TimeUtil.now()

AxiosUtil.post('/api/adm/add',data)
    .then(result => {
      console.log(result)
    if(!result.status){
      ElMessage.error(result.msg)
      return
    }
      ElMessage.success("添加成功")
    }).catch(err =>{
      console.error("添加管理员用户失败:",err)
})





}

const reset = () =>{
  data.name = ''
  data.password = ''
  data.email = ''
  data.gender = ''
  data.remark = ''
}



</script>

<template>
  <el-form label-width="80" style="width:400px">
    <el-form-item label="名称">
      <el-input v-model="data.name" placeholder="请填写名称"/>
    </el-form-item>

    <el-form-item label="密码">
      <el-input v-model="data.password" show-password placeholder="请填写密码"/>
    </el-form-item>

    <el-form-item label="邮箱">
      <el-input v-model="data.email"/>
    </el-form-item>

    <el-form-item label="备注">
      <el-input type="textarea" v-model="data.remark" rows="4"/>
    </el-form-item>

    <el-form-item label="性别">
      <el-radio-group v-model="data.gender">
        <el-radio value="0">未知</el-radio>
        <el-radio value="1">男</el-radio>
        <el-radio value="2">女</el-radio>
      </el-radio-group>
    </el-form-item>


    <el-form-item >
      <el-button type="primary" @click="add">添加</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>

</template>

<style scoped></style>