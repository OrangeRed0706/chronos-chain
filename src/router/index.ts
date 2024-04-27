import * as VueRouter from 'vue-router';
import Index from '../views/Index.vue'
import Home from '../views/Home.vue'
import HelloWorld from "../views/HelloWorld.vue";
import Login from "../views/Login.vue";

const routes: VueRouter.RouteRecordRaw[] = [
    {
        path: '/',
        name: 'index',
        component: () => Index,
        children: [
            {path: "", component: () => Home},
            {path: "/test", component: () => HelloWorld},
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => Login
    },
]
const router = VueRouter.createRouter({
    history: VueRouter.createMemoryHistory(),
    routes: routes,
})

router.beforeEach((to, from, next) => {

    console.log(`from ${from} to ${to}`)
    const isLogin:Boolean = localStorage.token ? true : false;

    if(to.path === "/login" || to.path === "/register"){
        next()
    }
    else {
        isLogin ? next() : next("/login")
    }
})


export default router;
