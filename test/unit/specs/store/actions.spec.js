/* global jest */
jest.mock('vue-router')
jest.mock('@/router')
jest.mock('firebase', () => {
  return {
    auth: jest.fn(() => ({
      createUserWithEmailAndPassword: jest.fn((username, password) => {
        if (password === 'rosebud') {
          return Promise.resolve({
            name: 'Joe'
          })
        } else {
          return Promise.reject({
            code: 500,
            message: 'Error Message'
          })
        }
      }),
      signInWithEmailAndPassword: jest.fn((username, password) => {
        if (password === 'rosebud') {
          return Promise.resolve({
            name: 'Joe'
          })
        } else {
          return Promise.reject({
            code: 500,
            message: 'Error Message'
          })
        }
      }),
      signOut: jest.fn()
    })),
    database: jest.fn(() => ({
      ref: jest.fn(() => ({
      }))
    }))
  }
})

import { actions } from '@/store/actions'
import router from '@/router'
import firebase from 'firebase'

describe('vuex actions', () => {
  describe('should have a userSignUp action that', () => {
    let userSignUp
    let commitObject
    let commit
    let callback

    beforeEach(() => {
      jest.resetModules()
      userSignUp = actions.userSignUp
      commitObject = {
        commit: jest.fn()
      }
      commit = commitObject.commit
    })

    it('should sign up if the user has valid credentials', (done) => {
      callback = () => {
        expect(commit).toHaveBeenCalledWith('setLoading', true)
        expect(commit).toHaveBeenCalledWith('setUser', {
          name: 'Joe'
        })
        expect(commit).toHaveBeenCalledWith('setLoading', false)
        expect(commit).toHaveBeenCalledWith('setError', null)
        expect(router.push).toHaveBeenCalled()
        done()
      }

      userSignUp(commitObject, {
        email: 'fakeEmail@fakeland.com',
        password: 'rosebud',
        callback
      })
    })

    it('should throw an error if the user has invalid credentials', (done) => {
      callback = () => {
        expect(commit).toHaveBeenCalledWith('setLoading', true)
        expect(commit).toHaveBeenCalledWith('setError', 'Error Message')
        expect(commit).toHaveBeenCalledWith('setLoading', false)
        done()
      }

      userSignUp(commitObject, {
        email: 'thisIsNotAValidEmail@testland.com',
        password: 'incorrectPassword',
        callback
      })
    })
  })

  describe('should have a userSignIn action that', () => {
    let userSignIn
    let commitObject
    let commit
    let callback

    beforeEach(() => {
      jest.resetModules()
      userSignIn = actions.userSignIn
      commitObject = {
        commit: jest.fn()
      }
      commit = commitObject.commit
    })

    it('should sign up if the user has valid credentials', (done) => {
      callback = () => {
        expect(commit).toHaveBeenCalledWith('setLoading', true)
        expect(commit).toHaveBeenCalledWith('setUser', {
          name: 'Joe'
        })
        expect(commit).toHaveBeenCalledWith('setLoading', false)
        expect(commit).toHaveBeenCalledWith('setError', null)
        expect(router.push).toHaveBeenCalled()
        done()
      }

      userSignIn(commitObject, {
        email: 'fakeEmail@fakeland.com',
        password: 'rosebud',
        callback
      })
    })

    it('should throw an error if the user has invalid credentials', (done) => {
      callback = () => {
        expect(commit).toHaveBeenCalledWith('setLoading', true)
        expect(commit).toHaveBeenCalledWith('setError', 'Error Message')
        expect(commit).toHaveBeenCalledWith('setLoading', false)
        done()
      }

      userSignIn(commitObject, {
        email: 'thisIsNotAValidEmail@testland.com',
        password: 'incorrectPassword',
        callback
      })
    })
  })

  it('should have a userSignOut method that signs out the user', (done) => {
    const { userSignOut } = actions
    const commitObject = {
      commit: jest.fn()
    }
    const { commit } = commitObject
    const callback = () => {
      expect(firebase.auth).toHaveBeenCalled()
      expect(commit).toHaveBeenCalledWith('setUser', null)
      done()
    }

    userSignOut(commitObject, callback)
  })

  it('should have a watchContentTypes function that adds content-types to vuex when firebase fires an event', () => {
    expect('to have test').toEqual(true)
  })

  it('should have a watchImageData function that adds image data to the store when a firebase event occurs', () => {
    expect('to have test').toEqual(true)
  })

  it('should have a watchData function that stores data to the store when a firebase event occurs', () => {
    expect('to have test').toEqual(true)
  })

  it('should have an uploadImage function that uploads the image to the server and stores the url in the database', () => {
    expect('to have test').toEqual(true)
  })

  it('should have a createContentType function that saves the initial contentType into the database', () => {
    expect('to have test').toEqual(true)
  })

  it('should have a saveContentType function that saves changes to an existing contentType in the database', () => {
    expect('to have test').toEqual(true)
  })

  it('should have a setItemData function that saves changes to existing data in the store', () => {
    expect('to have test').toEqual(true)
  })

  it('should have a setMultipleItemData function that saves the initial state for a dataItem that will be multiple, to the database', () => {
    expect('to have test').toEqual(true)
  })
})
