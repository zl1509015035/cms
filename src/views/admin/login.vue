<script setup>

import '@/assets/admin/css/login.css'
import axios from 'axios'
import {reactive, ref} from 'vue'
import {ElMessage} from 'element-plus';
import { User,Lock } from '@element-plus/icons-vue' //图标
import { useAdminStore } from '@/stores/admin/admin.js';
import { useRouter } from 'vue-router';

//初始化
const adminStore = useAdminStore()
const router = useRouter()

//数据
const data = reactive({
  name: '',
  password: '',
})


//校验规则
const rules = {
  name: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 2, max: 10, message: '用户名长度限制[2-10]个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ]

}

const elFormRef = ref() //存储 <el-form> 组件实例的引用

const login = () => {

  elFormRef.value.validate((valid, fields) => {//校验
    console.log("valid:", valid, "fields", fields);
    if (!valid) {
      return
    }

    //axios
    axios.post('http://127.0.0.1:8008/api/adm/login', data).then(response => {
      console.log("data", response.data)

      if (!response.data.status) {
        ElMessage.error(response.data.msg);
        return
      }

      //token解码
      let token = response.data.data.token
      let [headerBase64,payloadBase64,signBase64] = token.split('.')
      //base64解码
      let payload = atob(payloadBase64)
      //将json字符串转换位对象
      let payloadObj = JSON.parse(payload)
      console.log("payloadObj:", payloadObj);

    //管理员状态存储pinia（持久化存储到localStorage中）
    adminStore.save(payloadObj.name,token,payloadObj.expireDate)

    console.log(adminStore.data);

    //跳转至后台
    router.push("/admin")

    }).catch(err => {
      console.log("err:", err)
    })

  })
}

</script>

<template>
  <div class="dr-login">
    <el-form :model="data" :rules="rules" ref="elFormRef">
      <div class="title">JW_CMS</div>

      <el-form-item prop="name">
        <el-input :prefix-icon="User" v-model="data.name"/>
      </el-form-item>

      <el-form-item prop="password">
        <el-input :prefix-icon="Lock" show-password v-model="data.password"/>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped></style>