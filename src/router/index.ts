import * as VueRouter from 'vue-router';
import Index from '../views/Index.vue'
import inbox from '../views/Inbox.vue'
import deployment from '../views/Deployment.vue'
import HelloWorld from "../views/HelloWorld.vue";
import Login from "../views/Account/Login.vue";

const routes: VueRouter.RouteRecordRaw[] = [
    {
        path: '/',
        component: () => Promise.resolve(Index),
        children: [
            {path: "/", component: () => Promise.resolve(inbox), name: "inbox"},
            {path: "/test", component: () => Promise.resolve(HelloWorld), name: "test"},
            {path: "/deployment", component: () => Promise.resolve(deployment), name: "deployment"}
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: () => Promise.resolve(Login)
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notFound",
        component: () => Promise.resolve(Index)
    }
]
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: routes,
})

router.beforeEach((to, from, next) => {

    console.log(`from ${from} to ${to}`)
    const isLogin: Boolean = !!localStorage.token;
    if (to.path === "/login" || to.path === "/register") {
        next()
    } else {
        isLogin ? next() : next("/login")
    }
})


export default router;
