const toolbarConfig = {
    toolbarKeys: [
        "clearStyle", // 清除格式
        "codeBlock", // 代码块
        "headerSelect", // 标题
        //"blockquote", // 引用
        "bold", // 粗体
        "underline", // 下划线
        "italic", // 斜体
        "through", // 删除线
        //"code", // 行内代码
        "sup", // 上标
        "sub", // 下标
        "color", // 文字颜色
        "bgColor", // 背景色
        "fontSize", // 字号
        //"fontFamily", // 字体
        "lineHeight", // 行高
        "bulletedList", // 无序列表
        "numberedList", // 有序列表
        //"todo", // 待办
        "justifyLeft", // 左对齐
        "justifyRight", // 右对齐
        "justifyCenter", // 居中对齐
        "justifyJustify", // 两端对齐
        //"indent", // 增加缩进
        //"delIndent", // 减少缩进
        //"emotion", // 表情
        "insertLink", // 插入链接
        //"insertImage", // 网络图片
        "uploadImage", // 上传图片
        //"insertVideo", // 插入视频
        //"uploadVideo", // 上传视频
        "insertTable", // 插入表格
        //"divider", // 分割线
        "undo", // 撤销
        "redo", // 重做
        //"fullScreen" // 全屏
    ]
}

const editorConfig = {
    MENU_CONF: {
        uploadImage: { //上传
            server: `${import.meta.env.VITE_API_URL}/api/article/wangEditor/uploadImg`,
            fieldName: 'file',//form-data fieldName 默认值 wangeditor-uploaded-image
            maxFileSize: 10 * 1024 * 1024, //单个文件大小 10M
            maxNumberOfFiles: 10, //最多可上传10个文件
            allowedFileTypes: ['image/*'], //文件类型限制, 无限制则设置为 []
            timeout: 5 * 1000, //超时时间 5秒

            onSuccess(file, res) {
                console.log("onSuccess file:",file.name, "res:",res)
            },

            onError(file, err) {
                console.log("onError file:",file.name, "err:",err)
            },

            //自定义插入
            customInsert(res, insertFn) {
                //console.log(res)

                if(!res.status){
                    ElMessage.error(res.msg)
                    return
                }

                //插入图片
                let path = import.meta.env.VITE_API_URL + res.data.filePath
                insertFn(path, res.data.alt, "")
            },
        }
    }
}

export default { toolbarConfig,editorConfig }