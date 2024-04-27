import * as VueRouter from 'vue-router';

const routes: VueRouter.RouteRecordRaw[] = [
    {
        path: '/',
        name: 'index',
        component: () => import('../views/Index.vue'),
        children: [
            {path: "", component: () => import("../views/Home.vue")},
            {path: "/test", component: () => import("../views/HelloWorld.vue")}
        ]
    },
]
const router = VueRouter.createRouter({
    history: VueRouter.createMemoryHistory(),
    routes: routes,
})

router.beforeEach((to, from, next) => {

    console.log(`from ${from} to ${to}`)
    next();
})


export default router;
