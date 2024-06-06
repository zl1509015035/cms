<script setup>
import {ref, reactive, onMounted,watch} from 'vue'
import ArticleAPI from "@/api/ArticleAPI.js";
import { useRoute,useRouter } from 'vue-router'
import {ElMessage, ElMessageBox} from "element-plus";
import CategoryAPI from "@/api/CategoryAPI.js";

//初始化
const router = useRouter()

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
  funcPageList()
}

//编辑
const edit = (row) => {
  //console.log("row:", row)

  router.push({ path: '/admin/article/edit', query: { id: row.id } })
}

//工具栏 - 编辑
const toolEdit = () => {
  if(selectedIdArr.length == 0){
    ElMessage.error("请勾选需要编辑记录")
    return
  }

  if(selectedIdArr.length != 1){
    ElMessage.error("请勾选单条记录")
    return
  }

  router.push({ path: '/admin/article/edit', query: { id: String(selectedIdArr) } })
}

//工具栏 - 添加
const toolAdd = () => {
  router.push("/admin/article/add")
}



//删除
const del = (row) =>{
  funcDel(String(row.id))
}

//工具栏 - 删除
let selectedIdArr = []
const selectionChange = (data) =>{
  //重置
  selectedIdArr = []

  data.forEach((row) =>{
    selectedIdArr.push(row.id)
  })

  console.log("selectedIdArr:",selectedIdArr)
}

const toolDel = () =>{
  if(selectedIdArr.length == 0){
    ElMessage.error("请勾选要删除的记录")
    return
  }

  funcDel(String(selectedIdArr))
}


const funcPageList = () => {

  ArticleAPI.pageList(page.value, pageSize).then(result => {

    //判空
    if(result.data == null){
      data.list = []
      total.value = 0
      return
    }


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

const funcDel = async (id) =>{
  try {
    await ElMessageBox.confirm('确认删除?', '标题', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })

    //删除
    let delResult = await ArticleAPI.del(id)
    if (!delResult.status) {
      ElMessage.error(delResult.msg)
      return
    }

    //回到第一页
    if(page.value != 1){
      page.value = 1
    }else{
      //刷新页面
      funcPageList()
    }
  } catch (err) {
    console.log("err:", err)
  }
}


</script>

<template>
  <!-- 工具栏 -->
  <el-button-group size="small">
    <el-button type="primary" @click="toolAdd"><el-icon><Plus/></el-icon></el-button>

    <el-button type="primary" @click="toolEdit"><el-icon><Edit/></el-icon></el-button>

    <el-button type="primary" @click="toolDel"><el-icon><Delete/></el-icon></el-button>
  </el-button-group>

  <!-- 表格 -->
  <el-table :data="data.list" @selection-change="selectionChange" border>
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
        <el-button size="small" type="primary" @click="edit(scope.row)">编辑</el-button>
        <el-button size="small" @click="del(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 分页 -->
  <el-pagination layout="prev, pager, next, jumper, total" :total="total" :page-size="pageSize" :current-page="page"
                 @current-change="currentChange"/>
</template>

<style scoped>

</style>

