<script setup>

import '@/assets/admin/login.css'
import {reactive} from 'vue'
import {User,Lock} from '@element-plus/icons-vue'//图标
import { messageConfig } from 'element-plus';

const data = reactive({
    name:'',
    password:'',
})

const login = () =>{
    console.log(data)
}


//校验规则
const rules = {
    name:[
        {required:true,messageConfig:'请输入用户名',trigger:'blur'},
        {min:2,max:10,message:'用户名长度限制[2-10]个字符',trigger:'blur'}
    ],
    password:[
        {require:true,message:'请填写密码',trigger:'blur'}
    ]

} 

const elFormRef = ref() //存储 <el-form> 组件实例的引用
</script>

<template>
    <div class="dr-login">
        <el-form :model="data">
            <div class="title">JW_CMS</div>

            <el-form-item>
                <el-input :prefix-icon="User" v-model="data.name"/>
            </el-form-item>

            <el-form-item>
                <el-input :prefix-icon="Lock" show-password v-model="data.password"/>
            </el-form-item>

            
            <el-form-item>
                <el-button type="primary" @click="login">登录</el-button>
            </el-form-item>
    </el-form>
    </div>
</template>

<style scoped></style>