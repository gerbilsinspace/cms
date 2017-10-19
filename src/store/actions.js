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

      if (payload.callback) {
        payload.callback()
      }
    }).catch((error) => {
      commit('setError', error.message)
      commit('setLoading', false)

      if (payload.callback) {
        payload.callback()
      }
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

      if (payload.callback) {
        payload.callback()
      }
    }).catch((error) => {
      commit('setError', error.message)
      commit('setLoading', false)

      if (payload.callback) {
        payload.callback()
      }
    })
  },

  autoSignIn ({ commit }, payload) {
    commit('setUser', payload)
  },

  userSignOut ({ commit }, cb) {
    firebase.auth().signOut()
    commit('setUser', null)
    router.push('/')

    if (cb) {
      cb()
    }
  },

  watchContentTypes ({ commit }, cb) {
    firebase.database().ref('contentType').on('value', (snapshot) => {
      console.log(snapshot)
      commit('setContentTypes', snapshot.val())
    })

    if (cb) {
      cb()
    }
  },

  watchImageData ({ commit }, cb) {
    firebase.database().ref('images').on('value', (snapshot) => {
      commit('setImageData', snapshot.val())
    })

    if (cb) {
      cb()
    }
  },

  watchData ({ commit }, cb) {
    firebase.database().ref('data').on('value', (snapshot) => {
      commit('setData', snapshot.val())
    })

    if (cb) {
      cb()
    }
  },

  uploadImage ({ commit }, payload) {
    const imageRef = firebase
      .storage()
      .ref()
      .child('images/' + payload.file.name)

    imageRef.put(payload.file).then(snapshot => {
      const postKey = firebase.database().ref('images').push().key
      let postUpdate = {}

      postUpdate[postKey] = 'https://storage.googleapis.com/' + process.env.FIREBASE_STORAGE_BUCKET + '/' + snapshot.metadata.fullPath
      firebase.database().ref('images').update(postUpdate).then(() => {
        payload.onSuccess()

        if (payload.db) {
          payload.db()
        }
      })
    })
  },

  createContentType ({ commit }, payload) {
    commit('setLoading', true)
    firebase.database().ref('contentType/' + payload.name).set(payload).then(() => {
      commit('setLoading', false)
      commit('setError', false)
      router.push('/content-types/' + payload.name)

      if (payload.db) {
        payload.db()
      }
    }).catch((error) => {
      commit('setError', error.message)
      commit('setLoading', false)

      if (payload.db) {
        payload.db()
      }
    })
  },

  saveContentType ({ commit }, payload) {
    payload.ref.update({
      controls: payload.controls
    }).then(() => {
      router.push('/content-types')

      if (payload.db) {
        payload.db()
      }
    })
  },

  setItemData ({ commit }, payload) {
    commit('setLoading', true)
    firebase
      .database()
      .ref('data/' + payload.name)
      .set(payload.dataset)
      .then(() => {
        commit('setLoading', false)
        commit('setError', false)
        router.push('/data')

        if (payload.db) {
          payload.db()
        }
      }).catch((error) => {
        commit('setLoading', false)
        commit('setError', error.message)

        if (payload.db) {
          payload.db()
        }
      })
  },

  setMultipleItemData ({ commit }, payload) {
    commit('setLoading', true)
    firebase
      .database()
      .ref('data/' + payload.name + '/items/' + payload.itemName)
      .set(payload.dataset)
      .then(() => {
        commit('setLoading', false)
        commit('setError', false)
        router.push('/data')

        if (payload.db) {
          payload.db()
        }
      }).catch((error) => {
        commit('setLoading', false)
        commit('setError', error.message)

        if (payload.db) {
          payload.db()
        }
      })
  }
}
