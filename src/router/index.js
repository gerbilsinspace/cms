import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Pages from '@/components/Pages'
import Profile from '@/components/Profile'
import Register from '@/components/Register'

import { auth } from '@/firebase'

Vue.use(Router)

const routesToRedirectIfLoggedOut = [
  '/cms',
  '/cms/pages',
  '/cms/profile'
]

const routesToRedirectIfLoggedIn = [
  '/login',
  '/register'
]

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/cms',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/cms/pages',
      name: 'Pages',
      component: Pages
    },
    {
      path: '/cms/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
  ]
})

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged(function (user) {
    let redirectToLogin = false
    for (var i = 0; i < routesToRedirectIfLoggedOut.length; i++) {
      const route = routesToRedirectIfLoggedOut[i]

      if (!user && to.path === route) {
        redirectToLogin = true
      }
    }

    let redirectToDashboard = false
    for (var j = 0; j < routesToRedirectIfLoggedIn.length; j++) {
      const route = routesToRedirectIfLoggedIn[j]

      if (user && to.path === route) {
        redirectToDashboard = true
      }
    }

    if (redirectToLogin) {
      next('/login')
    } else if (redirectToDashboard) {
      next('/cms')
    } else {
      next()
    }
  })
})

export default router
