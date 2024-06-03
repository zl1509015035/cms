<script setup>
import {ref, reactive, inject, onUpdated} from 'vue'
import {ElMessage} from "element-plus";
import TimeUtil from "@/Utils/TimeUtil.js";
import CategoryAPI from "@/api/CategoryAPI.js";

const injectData = inject("provideData")
const injectFuncGetList = inject("provideFuncGetList")
console.log("injectData:", injectData)


const data = reactive({ //数据
  name: '',
  sort: '0',
  status: '1'
})


onUpdated(() => {
  if (injectData.pageEdit) {
    // console.log("卷王编辑")
    CategoryAPI.getById(injectData.id).then(result => {
      if (!result.status) {
        ElMessage.error(result.msg)
        return
      }

      data.name = result.data.name
      data.sort = result.data.sort
      data.status = result.data.status
    }).catch(err => {
      console.log("err:", err)
    })

  }
})

//编辑
const edit = () => {
  console.log(data)
  if (data.name == '') {
    ElMessage.error("请填写名称")
    return
  }

  let values = {
    id: String(injectData.id),
    name: data.name,
    sort: data.sort,
    status: data.status,
  }

  CategoryAPI.edit(values).then(result => {

    console.log(result)

    if (!result.status) {
      ElMessage.error(result.msg)
      return
    }

    ElMessage.success("编辑成功！")
    //关闭对话框
    injectData.pageEdit = false
    //重新获取列表
    injectFuncGetList()

  }).catch(err => {
    console.log("err:", err)
  })
}

//关闭对话框
const close = () => {
  data.name = ''
  data.sort = '0'
  data.status = '1'
}
</script>

<template>
  <el-dialog v-model="injectData.pageEdit" draggable @close="close" width="600" title="添加类别">
    <el-form label-width="80">
      <el-form-item label="名称">
        <el-input v-model="data.name" placeholder="请填写名称"/>
      </el-form-item>

      <el-form-item label="排序">
        <el-input v-model="data.sort"/>
      </el-form-item>

      <el-form-item label="状态">
        <el-radio-group v-model="data.status">
          <el-radio value="1">显示</el-radio>
          <el-radio value="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="edit">编辑</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>

</style>