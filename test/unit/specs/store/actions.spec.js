/* global jest */
jest.mock('vue-router')
jest.mock('@/router')
jest.mock('firebase', () => {
  return {
    auth: jest.fn(() => ({
      createUserWithEmailAndPassword: jest.fn(() => (Promise.resolve({
        name: 'Joe'
      })))
    }))
  }
})

import { actions } from '@/store/actions'
import router from '@/router'

describe('vuex actions', () => {
  describe('should have a userSignUp action that', () => {
    it('should sign up if the user has valid credentials', (done) => {
      const { userSignUp } = actions
      const commitObject = {
        commit: jest.fn()
      }
      const { commit } = commitObject
      const callback = () => {
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
  })
})
