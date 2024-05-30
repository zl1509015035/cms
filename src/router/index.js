import { createRouter, createWebHistory } from "vue-router";
import {ElMessage} from "element-plus";
import { useAdminStore } from "@/stores/admin/admin.js";
import TimeUtil from "@/Utils/TimeUtil.js";
import LocalJW from "@/Utils/LocalJW";

const routes = [
  {
    path: "/", // http://localhost:5173/login
    //重定向
    redirect: "/admin",
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
    children: [
      //管理员
      {
        path: "administrator/add", // http://localhost:5173/admin/administrator/add
        component: () => import("@/views/admin/administrator/add.vue"),
      },
      {
        path: "administrator/edit", // http://localhost:5173/admin/administrator/edit
        component: () => import("@/views/admin/administrator/edit.vue"),
      },
      {
        path: "administrator/list", // http://localhost:5173/admin/administrator/list
        component: () => import("@/views/admin/administrator/list.vue"),
      },
      //类别管理
      {
        path: "category/list", // http://localhost:5173/admin/category/list
        component: () => import("@/views/admin/category/list.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // console.log(to.meta.requiresAuth)
  if (to.meta.requiresAuth) {
    console.log("需要身份验证");
    //从pinia中拿出状态判断

    //初始化
    const adminStore = useAdminStore();

    if (adminStore.data.token === "") {
      console.log("未登录");

      router.push("/login");
    }

    let startTime = "2024-05-21 11:30:00"
    let endTime = "2024-05-21 22:00:00"

    /*let startTime = TimeUtil.now()
    let endTime = adminStore.data.expireDate*/

    let timeSubResult = TimeUtil.timeSub(startTime,endTime)

    console.log("timeSubResult:",timeSubResult)

    if(timeSubResult.expire){
      ElMessage.error("登录已过期,请重新登录")

      LocalJW.remove("admin")

      router.push("/login")
    }

    next();
  } else {
    console.log("不需要身份验证");
    next();
  }
});

export default router;
