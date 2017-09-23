import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseAction, firebaseMutations } from 'vuexfire'
Vue.use(Vuex)

const state = {
  data: {},
  contentTypes: {},
  images: {}
}

const mutations = {
  ...firebaseMutations
}

const setDataRef = firebaseAction(({ bindFirebaseRef }, { ref }) => {
  bindFirebaseRef('data', ref)
})

const setContentTypeRef = firebaseAction(({ bindFirebaseRef }, { ref }) => {
  bindFirebaseRef('contentTypes', ref)
})

const setImageDataRef = firebaseAction(({ bindFirebaseRef }, { ref }) => {
  bindFirebaseRef('images', ref)
})

const actions = {
  setDataRef,
  setContentTypeRef,
  setImageDataRef
}

export default new Vuex.Store({
  state,
  actions,
  mutations
})
