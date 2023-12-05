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
    {
        path: '/404',
        component: () => import('@/views/error/404.vue'),
        hidden: true,
    },
    {
        path: '/401',
        component: () => import('@/views/error/401.vue'),
        hidden: true,
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.length === 0) {
        from.path ? next({name: from.name}) : next('/404')
    } else {
        next()
    }
})

export default router
