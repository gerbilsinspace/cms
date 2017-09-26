import Vue from 'vue'
import Vuetify from 'vuetify'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import firebase from 'firebase'
import './stylus/main.styl'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import { store } from './store'
import { firebaseConfig } from './config'

Vue.use(Vuetify)
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      store.dispatch('autoSignIn', firebaseUser)
      store.dispatch('watchContentTypes')
      store.dispatch('watchImageData')
      store.dispatch('watchData')
    }
  })

  unsubscribe()
})
