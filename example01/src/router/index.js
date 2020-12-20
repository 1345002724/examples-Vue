import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/Login";
import home from "@/components/home"
import welcome from "@/components/Welcome"
import Users from "@/components/user/Users"
import FineReport from "../components/FineReport/FineReport"
import message from "@/components/user/message";

/*const home=()=>import('../views/home/Home')
const cart=()=>import('../views/cart/Cart')
const profile=()=>import('../views/profile/Profile')
const category=()=>import('../views/category/Category')*/

Vue.use(Router)

const routes=[
    {
        path: '/',
        redirect: 'login',
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/home',
        component: home,
        redirect: '/welcome',
        children:[
            {
                path:'/welcome',
                component: welcome
            },
            {
                path:'/users',
                component: Users
            },
            {
                path:'/finereport',
                component: FineReport
            },
            {
                path:'/message',
                component: message
            }
            ]
    }

]

const router=new Router({
    routes:routes,
    mode:'history', //去除hash中的#
})

//为路由对象添加beforeEach导航守卫
//to表示去哪里，from表示来自哪里，next表示去往哪里
router.beforeEach((to,from,next)=>{
    //如果登录login则放行
    if(to.path==='/login') return next();
    //如果token为空则返回到login
    const token=window.sessionStorage.getItem('token')
    if(!token) return next('/login')
    //放行
    next()
})

export default  router
