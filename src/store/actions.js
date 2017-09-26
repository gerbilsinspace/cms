import firebase from 'firebase'
import router from '@/router'

export const actions = {
  userSignUp ({ commit }, payload) {
    commit('setLoading', true)
    firebase.auth().createUserWithEmailAndPassword(
      payload.email,
      payload.password
    ).then((firebaseUser) => {
      commit('setUser', firebaseUser)
      commit('setLoading', false)
      commit('setError', null)
      router.push('/home')
    }).catch((error) => {
      commit('setError', error.message)
      commit('setLoading', false)
    })
  },

  userSignIn ({ commit }, payload) {
    commit('setLoading', true)
    firebase.auth().signInWithEmailAndPassword(
      payload.email,
      payload.password
    ).then((firebaseUser) => {
      commit('setUser', firebaseUser)
      commit('setLoading', false)
      commit('setError', null)
      router.push('/home')
    }).catch((error) => {
      commit('setError', error.message)
      commit('setLoading', false)
    })
  },

  autoSignIn ({ commit }, payload) {
    commit('setUser', payload)
  },

  userSignOut ({ commit }) {
    firebase.auth().signOut()
    commit('setUser', null)
    router.push('/')
  },

  watchContentTypes ({ commit }) {
    firebase.database().ref('contentType').on('value', (snapshot) => {
      commit('setContentTypes', snapshot.val())
    })
  },

  watchImageData ({ commit }) {
    firebase.database().ref('images').on('value', (snapshot) => {
      commit('setImageData', snapshot.val())
    })
  },

  watchData ({ commit }) {
    firebase.database().ref('data').on('value', (snapshot) => {
      commit('setData', snapshot.val())
    })
  },

  uploadImage ({ commit }, payload) {
    const imageRef = firebase
      .storage()
      .ref()
      .child('images/' + payload.file.name)

    imageRef.put(payload.file).then(function (snapshot) {
      payload.onSuccess()
      firebase.database().ref('images').push({
        name: snapshot.metadata.name,
        fullPath: snapshot.metadata.fullPath
      })
    })
  },

  createContentType ({ commit }, payload) {
    commit('setLoading', true)
    firebase.database().ref('contentType/' + payload.name).set(payload).then(() => {
      commit('setLoading', false)
      commit('setError', false)
      router.push('/content-types/' + payload.name)
    }).catch((error) => {
      commit('setError', error.message)
      commit('setLoading', false)
    })
  },

  saveContentType ({ commit }, payload) {
    payload.ref.update({
      controls: payload.controls
    }).then(() => {
      router.push('/content-types')
    })
  },

  setItemData ({ commit }, payload) {
    commit('setLoading', true)
    firebase
      .database()
      .ref('data/' + payload.name)
      .set(payload)
      .then(() => {
        commit('setLoading', false)
        commit('setError', false)
        router.push('/data')
      }).catch((error) => {
        commit('setLoading', false)
        commit('setError', error.message)
      })
  },

  setMultipleItemData ({ commit }, payload) {
    commit('setLoading', true)
    firebase
      .database()
      .ref('data/' + payload.name + '/items/' + payload.itemName)
      .set({
        dataset: payload.dataset,
        name: payload.itemName
      })
      .then(() => {
        commit('setLoading', false)
        commit('setError', false)
        router.push('/data')
      }).catch((error) => {
        commit('setLoading', false)
        commit('setError', error.message)
      })
  }
}