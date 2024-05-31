<script setup>
import { ref,reactive } from 'vue'

const data = reactive({ //数据
  name: '',
  sort: '0',
  status: '1'
})

const show = ref(true) //默认显示

const add = () => { //添加
  console.log(data)
}

const close = () => { //关闭对话框
  data.name = ''
  data.sort = '0'
  data.status = '1'
}
</script>

<template>
  <el-dialog v-model="show" draggable @close="close" width="600" title="添加类别">
    <el-form label-width="80">
      <el-form-item label="名称">
        <el-input v-model="data.name" placeholder="请填写名称" />
      </el-form-item>

      <el-form-item label="排序">
        <el-input v-model="data.sort" />
      </el-form-item>

      <el-form-item label="状态">
        <el-radio-group v-model="data.status">
          <el-radio value="1">显示</el-radio>
          <el-radio value="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="add">添加</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>

</style>