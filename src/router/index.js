import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import Landing from '@/components/Landing'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Home from '@/components/Home'
import Data from '@/components/Data'
import DataSingleEdit from '@/components/DataSingleEdit'
import DataMultiple from '@/components/DataMultiple'
import DataMultipleEdit from '@/components/DataMultipleEdit'
import Images from '@/components/Images'
import ContentTypes from '@/components/ContentTypes'
import ContentTypeEdit from '@/components/ContentTypeEdit'
import NotFound from '@/components/NotFound'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Landing, meta: { requiresUnauth: true } },
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/home', component: Home, meta: { requiresAuth: true } },
    { path: '/data', component: Data, meta: { requiresAuth: true } },
    { path: '/data/edit/:dataId', component: DataSingleEdit, meta: { requiresAuth: true } },
    { path: '/data/:dataId', component: DataMultiple, meta: { requiresAuth: true } },
    { path: '/data/:dataId/:dataItemId', component: DataMultipleEdit, meta: { requiresAuth: true } },
    { path: '/images', component: Images, meta: { requiresAuth: true } },
    { path: '/content-types', component: ContentTypes, meta: { requiresAuth: true } },
    { path: '/content-types/:contentTypeId', component: ContentTypeEdit, meta: { requiresAuth: true } },
    { path: '*', component: NotFound }
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresUnauth = to.matched.some(record => record.meta.requiresUnauth)
  const user = firebase.auth().currentUser

  if (requiresAuth && !user) {
    next('/signin')
  }

  if (requiresUnauth && user) {
    next('/home')
  }

  next()
})

export default router
