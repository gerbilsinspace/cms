export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  setError (state, payload) {
    state.error = payload
  },
  setLoading (state, payload) {
    state.loading = payload
  },
  setContentTypes (state, payload) {
    state.contentTypes = payload
  },
  setImageData (state, payload) {
    state.imageData = payload
  },
  setData (state, payload) {
    state.data = payload
  }
}
