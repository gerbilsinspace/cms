import Vue from 'vue'
import Router from 'vue-router'

import ContentTypeEdit from '@/components/ContentTypeEdit'
import ContentTypes from '@/components/ContentTypes'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import PageMissing from '@/components/PageMissing'
import Profile from '@/components/Profile'
import Register from '@/components/Register'

import { auth } from '@/firebase'

Vue.use(Router)

const routesToRedirectIfLoggedOut = [
  '/',
  '/content-types',
  '/content-types/:contentTypeId',
  '/profile'
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
      path: '/content-types',
      name: 'ContentTypes',
      component: ContentTypes
    },
    {
      path: '/content-types/:contentTypeId',
      name: 'ContentTypeEdit',
      component: ContentTypeEdit
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '*',
      name: 'PageMissing',
      component: PageMissing
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
      next('/')
    } else {
      next()
    }
  })
})

export default router
