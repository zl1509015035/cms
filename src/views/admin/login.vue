<script setup>

import {useAdminStore} from '@/stores/admin/admin.js'

const adminStore = useAdminStore()

adminStore.save("juanwang","juanwang.com","2024-05-17")

console.log(adminStore.data);
</script>

<template>
    <h3>登录页</h3>

    <el-icon><User/></el-icon>

    <hr>

    <el-button type="primary">登录</el-button>
</template>

<style scoped>

</style>