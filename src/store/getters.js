export const getters = {
  getAppTitle (state) {
    return state.appTitle
  },
  getUser (state) {
    return state.user
  },
  getError (state) {
    return state.error
  },
  getLoading (state) {
    return state.loading
  },
  getContentTypes (state) {
    return state.contentTypes
  },
  getData (state) {
    return state.data
  },
  getImageData (state) {
    return state.imageData
  }
}
