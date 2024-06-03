<script setup>
import {ref, reactive} from 'vue'

//数据
const data = reactive({
  list: [
    {id: '1', title: 'Ubuntu从入门到精通', url: 'dengruicode.com', sort: '0', create_time: '2023-06-25'},
    {id: '2', title: '40分钟学会ElementPlus', url: 'www.dengruicode.com', sort: '0', create_time: '2023-06-25'},
    {id: '3', title: '3小时学会Vue3', url: 'dengruicode.com', sort: '0', create_time: '2023-06-26'},
    {id: '4', title: 'ES6从入门到精通', url: 'www.dengruicode.com', sort: '0', create_time: '2023-06-26'}
  ]
})

const page = ref(1) //当前页 默认第1页
const total = ref(20) //总记录数
let pageSize = Number(import.meta.env.VITE_PAGE_SIZE) //每页显示记录数

//获取新页码
const currentChange = (newPage) => {
  console.log(newPage)
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

