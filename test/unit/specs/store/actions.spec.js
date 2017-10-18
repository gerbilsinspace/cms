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
      })
    }))
  }
})

import { actions } from '@/store/actions'
import router from '@/router'

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
})
