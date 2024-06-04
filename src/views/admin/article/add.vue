<script setup>
    import { reactive } from 'vue'

    //数据
    const data = reactive({
        category_id: '',
        title: '',
        author: 'juanwang',
        url: 'juanwang.com',
        content: '',
        sort: '0',
        status: '1'
    })

    const category = reactive({ //下拉框
        list: [
            { id: '1', parent_id: '0', name: '类别', level: '1', level_padding: '', sort: '0', status: '1' },
            { id: '2', parent_id: '1', name: '前端', level: '2', level_padding: '···', sort: '0', status: '1' },
            { id: '3', parent_id: '1', name: '后端', level: '2', level_padding: '···', sort: '0', status: '1' },
            { id: '4', parent_id: '1', name: '服务端', level: '2', level_padding: '···', sort: '0', status: '1' }
        ]
    })

    //添加
    const add = () => {
        console.log(data)
    }

    //重置
    const reset = () => {
        data.category_id = ''
        data.title = ''
        data.author = '邓瑞'
        data.url = 'dengruicode.com'
        data.content = ''
        data.sort = '0'
        data.status = '1'
    }
</script>

<template>
    <el-form label-width="80" style="width: 400px;">
        <el-form-item label="类别">
            <el-select v-model="data.category_id" placeholder="请选择">
                <el-option v-for="value in category.list" :value="value.id" :label="value.level_padding + value.name" :key="value.id" />
            </el-select>
        </el-form-item>

        <el-form-item label="标题">
            <el-input v-model="data.title" placeholder="请填写标题" />
        </el-form-item>

        <el-form-item label="作者">
            <el-input v-model="data.author" />
        </el-form-item>

        <el-form-item label="作者网站">
            <el-input v-model="data.url" />
        </el-form-item>        

        <el-form-item label="内容">
            <el-input type="textarea" v-model="data.content" rows="4" />
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
            <el-button @click="reset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped>

</style>