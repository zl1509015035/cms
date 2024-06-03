import AxiosUtil from '@/Utils/AxiosUtil'

//获取单条记录
const getById = (id) => {
    return AxiosUtil.get(`/api/article/getById?id=${id}`)
}

//获取列表 - 分页
const pageList = (page,pageSize) => {
    return AxiosUtil.get(`/api/article/pageList?page=${page}&pageSize=${pageSize}`)
}

//添加
const add = (data) => {
    return AxiosUtil.post('/api/article/add',data)
}

//编辑
const edit = (data) => {
    return AxiosUtil.post('/api/article/edit',data)
}

//删除
const del = (id) => {
    return AxiosUtil.post("/api/article/del",{id: id})
}

//上传图片
const uploadImg = (data) => {
    return AxiosUtil.postFile('/api/article/uploadImg',data)
}

//wangEditor - 上传图片
const editorUploadImg = (data) => {
    return AxiosUtil.postFile('/api/article/wangEditor/uploadImg',data)
}

export default { getById,pageList,add,edit,del,uploadImg,editorUploadImg }