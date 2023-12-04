import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)

const routes = [
    {path: "/login", component: () => import("@/views/LoginNew.vue")},
    {path: "/register", component: () => import("@/views/Register.vue")},
    // aside路由
    {
        path: '/',
        name: 'Index',
        redirect: '/dashboard',
        component: Index,
        children: [
            // 发布视频按钮
            {path: "publish", component: () => import("@/views/Publish.vue")},
            // 首页
            {path: "dashboard", component: () => import("@/views/Dashboard.vue")},
            // 内容管理
            {path: "content/post", component: () => import("@/views/content/Post.vue")},
            {path: "content/compilation", component: () => import("@/views/content/Compilation.vue")},
            // 互动管理
            {path: "interact/follow", component: () => import("@/views/interact/Follow.vue")},
            {path: "interact/fans", component: () => import("@/views/interact/Fans.vue")},

        ],
    },
    // 内容管理
    // {
    //     path: '/content',
    //     name: 'Content',
    //     children: [
    //
    //     ],
    // },
    // 互动管理

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
