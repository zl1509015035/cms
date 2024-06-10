<script setup>
import {reactive,onMounted,onUpdated} from 'vue'
import {useRoute} from "vue-router";
import {ElMessage,ElMessageBox} from "element-plus";
import NavAPI from "@/api/NavAPI.js";
import {useNavStore} from "@/stores/admin/nav.js";
import NavAdd from "@/components/admin/nav/NavAdd.vue";

//初始化
const route = useRoute()
const navStore = useNavStore()

//参数
let parentId = route.query.parent_id
console.log(parentId)


//在组件成功挂载到DOM并完成首次渲染后调用
onMounted(() => {
  funcGetList() //获取列表
})

//在组件更新之后调用
onUpdated(() => {
  if (parentId !== route.query.parent_id) { // 当路由参数 parent_id 发生变化时
    parentId = route.query.parent_id //重置
    //console.log("parentId:",parentId)

    funcGetList() //重新获取列表
  }
})

const pageAdd = () =>{
  console.log(navStore.data)
  navStore.data.pageAdd = true
}


const funcGetList = () => { //func - 获取列表
  NavAPI.getListByParentId(parentId).then(result => {
    //console.log(result)
    if(!result.status){
      ElMessage.error(result.msg)
      return
    }

    navStore.listData.path = result.data.path //重置
    navStore.listData.list = result.data.list

    navStore.update(data.path,parentId)//更新
  }).catch(err => {
    console.log("err:", err)
  })
}

const funcFormatDate = (time) => { //func - 格式化日期
  return time.slice(0, 10) //截取前10个字符
}
</script>

<template>
  <NavAdd/>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/admin/nav/list', query: { parent_id: 0 } }">
      <el-icon><House/></el-icon>
    </el-breadcrumb-item>

    <el-breadcrumb-item v-for="value in navStore.listData.path" :to="{path:'/admin/nav/list',query:{ parent_id: value.id}}"
                        :key="value.id">
      {{ value.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>

  <!-- 按钮 -->
  <el-button type="primary" @click="pageAdd">添加导航</el-button>

  <!-- 表格 -->
  <el-table :data="navStore.listData.list" border>
    <el-table-column prop="id" label="ID" width="60"/>

    <el-table-column prop="name" label="名称" width="100">
      <template #default="scope">
        <router-link :to="{ path: '/admin/nav/list', query: { parent_id: scope.row.id } }" class="blue">
          {{ scope.row.name }}
        </router-link>
      </template>
    </el-table-column>

    <el-table-column prop="icon" label="图标" width="60">
      <template #default="scope">
        <el-icon v-if="scope.row.icon">
          <component :is="scope.row.icon"/>
        </el-icon>
      </template>
    </el-table-column>

    <el-table-column prop="path" label="路径"/>

    <el-table-column prop="status" label="状态" width="60">
      <template #default="scope">
        <span v-if="scope.row.status === '1'" class="green">显示</span>
        <span v-else class="orange">隐藏</span>
      </template>
    </el-table-column>

    <!-- <el-table-column prop="create_time" label="日期" width="180" /> -->
    <el-table-column prop="create_time" label="日期" width="180">
      <template #default="scope">
        {{ funcFormatDate(scope.row.create_time) }}
      </template>
    </el-table-column>

    <el-table-column label="操作" width="150">
      <template #default="scope">
        <el-button size="small" type="primary">编辑</el-button>
        <el-button size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

</template>

<style scoped>

</style>
