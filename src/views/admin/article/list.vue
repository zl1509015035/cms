<script setup>
import {ref, reactive, onMounted,watch} from 'vue'
import ArticleAPI from "@/api/ArticleAPI.js";
import {ElMessage} from "element-plus";

//数据
const data = reactive({
  list: []
})

const page = ref(1) //当前页 默认第1页
const total = ref(0) //总记录数
let pageSize = Number(import.meta.env.VITE_PAGE_SIZE) //每页显示记录数

onMounted(() => {
  funcPageList()
})

watch(page,(newValue,oldValue) =>{
  console.log("oldValue:",oldValue,"newValue:",newValue)

  if(oldValue != newValue){
    funcPageList()
  }
})

//获取新页码
const currentChange = (newPage) => {
  console.log("当前页数", newPage)
  page.value = newPage
  // funcPageList()
}

const funcPageList = () => {

  ArticleAPI.pageList(page.value, pageSize).then(result => {
    if (!result.status) {
      ElMessage.error(result.msg)
      return
    }

    //更新条数
    data.list = result.data.list
    //设置总记录数
    total.value = result.data.pages.total
  }).catch(err => {
    console.log("err:", err)
  })
}


</script>

<template>
  <!-- 工具栏 -->
  <el-button-group size="small">
    <el-button type="primary"><el-icon><Plus/></el-icon></el-button>

    <el-button type="primary"><el-icon><Edit/></el-icon></el-button>

    <el-button type="primary"><el-icon><Delete/></el-icon></el-button>
  </el-button-group>

  <!-- 表格 -->
  <el-table :data="data.list" border>
    <el-table-column type="selection" width="55"></el-table-column>

    <el-table-column prop="id" label="ID" width="80"/>
    <el-table-column prop="title" label="标题" width="200"/>
    <el-table-column prop="url" label="网址" width="200"/>
    <el-table-column prop="status" label="状态" width="80">
      <template #default="scope">
        <span v-if="scope.row.status === '1'" class="green">显示</span>
        <span v-else class="orange">隐藏</span>
      </template>
    </el-table-column>
    <el-table-column prop="sort" label="排序" width="80"/>
    <el-table-column prop="create_time" label="日期" width="150"/>

    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" type="primary">编辑</el-button>
        <el-button size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination layout="prev, pager, next, jumper, total" :total="total" :page-size="pageSize" :current-page="page"
                 @current-change="currentChange"/>
</template>

<style scoped>

</style>

