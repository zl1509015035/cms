import { createRouter, createWebHistory } from "vue-router";
import { useAdminStore } from "@/stores/admin/admin.js";

const routes = [
    {
        path: "/",// http://localhost:5173/login
        //重定向
        redirect:"/admin"
      },
  {
    path: "/login",
    // component:() => import("../views/admin/login.vue")
    component: () => import("@/views/admin/login.vue"),
  },
  {
    path: "/admin",
    // component:() => import("../views/admin/admin.vue")
    component: () => import("@/views/admin/home.vue"),
    //身份校验
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to,from,next) =>{
    // console.log(to.meta.requiresAuth)
    if(to.meta.requiresAuth){
        console.log("需要身份验证");
        //从pinia中拿出状态判断

        //初始化
        const adminStore = useAdminStore()

        if(adminStore.data.token === "" ){
            console.log("未登录")

            router.push("/login")
        }
        next()

    }else{
        console.log("不需要身份验证");
        next()
    }
})

export default router;
