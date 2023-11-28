import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)

const routes = [
    {path: "/login", component: () => import("@/views/LoginNew.vue")},
    {path: "/register", component: () => import("@/views/Register.vue")},
    {
        path: '/',
        name: 'Index',
        redirect: '/dashboard',
        component: Index,
        children: [
            {path: "dashboard", component: () => import("@/views/Dashboard.vue")}
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
