/* global jest */
import { getters } from '@/store/getters'
describe('getters', () => {
  it('should have an appTitle getter that gets the appTitle from the store', () => {
    let state = {
      appTitle: 'Gardening Club'
    }
    const result = getters.appTitle(state)

    expect(result).toEqual('Gardening Club')
  })

  it('should have a getUser getter that gets the user from the store', () => {
    let state = {
      user: 'Genevieve Rosanne Abell'
    }
    const result = getters.getUser(state)

    expect(result).toEqual('Genevieve Rosanne Abell')
  })

  it('should have a getError getter that gets the error from the store', () => {
    let state = {
      error: {
        code: 404,
        message: 'Missing Data'
      }
    }
    const result = getters.getError(state)

    expect(result).toEqual({
      code: 404,
      message: 'Missing Data'
    })
  })

  it('should have a getLoading getter that gets the loading state from the store', () => {
    let state = {
      loading: false
    }
    const result = getters.getLoading(state)

    expect(result).toEqual(false)
  })

  it('should have an getContentTypes getter that gets content types from the store', () => {
    let state = {
      contentTypes: {
        contentType1: {
          title: 'contentType1'
        },
        contentType2: {
          title: 'contentType2'
        }
      }
    }
    const result = getters.getContentTypes(state)

    expect(result).toEqual({
      contentType1: {
        title: 'contentType1'
      },
      contentType2: {
        title: 'contentType2'
      }
    })
  })

  it('should have a getData getter that gets the data from the store', () => {
    let state = {
      data: {}
    }
    const result = getters.getData(state)

    expect(result).toEqual({})
  })

  it('should have a getImageData getter that gets the image data from the store', () => {
    let state = {
      imageData: {}
    }
    const result = getters.getImageData(state)

    expect(result).toEqual({})
  })
})

