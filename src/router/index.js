import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('views/login/Login.vue')
const Home = () => import('views/home/Home.vue')
const Welcome = () => import('views/welcome/Welcome.vue')
const Users = () => import('views/users/Users.vue')
const Rights = () => import('views/rights/Rights.vue')
const Roles = () => import('views/roles/Roles.vue')

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'

},
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children:[
      {
        path:'/',
        redirect:'/welcome'
      },{
        path: '/welcome',
    component: Welcome
      },{
        path: '/users',
    component: Users
      },{
        path: '/rights',
    component: Rights
      },{
        path: '/roles',
    component: Roles
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

router.beforeEach((to,from ,next) => {
  if(to.path === '/login') return next();
  if(!window.sessionStorage.getItem('mytoken')) return next('/login');
  next();
})

export default router
