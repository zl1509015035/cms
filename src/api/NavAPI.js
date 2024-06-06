import AxiosUtil from "@/Utils/AxiosUtil.js";

//获取单条记录
const getById = (id) => {
    return AxiosUtil.get(`/api/nav/getById?id=${id}`)
}

//获取列表
const getListByParentId = (parent_id) => {
    return AxiosUtil.get(`/api/nav/getListByParentId?parent_id=${parent_id}`)
}

//获取列表 - all
const getAllById = (id) => {
    return AxiosUtil.get(`/api/nav/list?id=${id}`)
}

const getAll = () => {
    return AxiosUtil.get('/api/nav/tree')
}

//添加
const add = (data) => {
    return AxiosUtil.post('/api/nav/add',data)
}

//编辑
const edit = (data) => {
    return AxiosUtil.post('/api/nav/edit',data)
}

//删除
const del = (id) => {
    return AxiosUtil.post("/api/nav/del",{id: id})
}

export default { getById,getListByParentId,getAllById,getAll,add,edit,del }