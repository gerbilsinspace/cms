import { mutations } from '@/store/mutations.js'

describe('vuex store', () => {
  it('should have a setUser method that should set the user state', () => {
    const { setUser } = mutations
    const state = {
      user: {}
    }

    setUser(state, {
      name: 'Bob'
    })

    expect(state).toEqual({
      user: {
        name: 'Bob'
      }
    })
  })

  it('should have a setError methods that sets the error in the store', () => {
    const { setError } = mutations
    const state = {
      error: {}
    }

    setError(state, {
      code: 404,
      message: 'Error Message'
    })

    expect(state).toEqual({
      error: {
        code: 404,
        message: 'Error Message'
      }
    })
  })

  it('should have a setLoading method that sets loading on store', () => {
    const { setLoading } = mutations
    const state = {
      loading: false
    }

    setLoading(state, true)

    expect(state).toEqual({
      loading: true
    })
  })

  it('should have a setContentTypes method that set a content type on the store', () => {
    const { setContentTypes } = mutations
    const state = {
      contentTypes: []
    }

    setContentTypes(state, [
      { name: 'hi' }
    ])

    expect(state).toEqual({
      contentTypes: [
        { name: 'hi' }
      ]
    })
  })

  it('should have a setImageData method that set an image data on the store', () => {
    const { setImageData } = mutations
    const state = {
      imageData: []
    }

    setImageData(state, [
      { name: 'image.jpg' }
    ])

    expect(state).toEqual({
      imageData: [
        { name: 'image.jpg' }
      ]
    })
  })

  it('should have a setData method that sets data in the store', () => {
    const { setData } = mutations
    const state = {
      data: {}
    }

    setData(state, {
      name: 'joe'
    })

    expect(state).toEqual({
      data: {
        name: 'joe'
      }
    })
  })
})
