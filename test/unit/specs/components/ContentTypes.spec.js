/* global jest */

import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'vue-test-utils'
import ContentTypes from '@/components/ContentTypes'

Vue.use(Vuex)

describe('ContentTypes', () => {
  let wrapper
  let actions
  let store

  beforeEach(() => {
    actions = {}
    store = new Vuex.Store({
      state: {},
      actions
    })

    wrapper = shallow(ContentTypes, {
      attachToDocument: true,
      store
    })
  })

  test('is a Vue component', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  test('fires createContentType when the user clicks the create button', () => {
    const createContentType = jest.fn()

    wrapper.setMethods({
      createContentType
    })

    wrapper.find('#createButton').trigger('submit')
    expect(createContentType).toHaveBeenCalled()
  })

  test('fires createContentType when the user submits the form', () => {
    const createContentType = jest.fn()

    wrapper.setMethods({
      createContentType
    })

    wrapper.find('#createContentTypeForm').trigger('submit')
    expect(createContentType).toHaveBeenCalled()
  })

  describe('has a requireOneOff method that', () => {
    it('sends an error if the user has not chosen whether the content type is a one off', () => {
      const result = wrapper.vm.requireOneOff()

      expect(typeof result).toBe('string')
    })

    it('returns true if the user has chosen whether the content type is a one off', () => {
      wrapper.vm.oneOff = true
      const result = wrapper.vm.requireOneOff()

      expect(typeof result).toBe('boolean')
    })
  })

  describe('has an isNameUnique method that', () => {
    it('returns true if there is no contentTypes that have the same name as the new content type', () => {
      expect(true).toBe(false)
    })
  })

  describe('has a createContentType method that', () => {
    it('dispatches a new contentType to the store if it is valid', () => {
      wrapper.vm.requireOneOff = () => {
        return true
      }
      wrapper.vm.isNameUnique = () => {
        return true
      }
      wrapper.vm.$store = {
        dispatch: jest.fn()
      }
      wrapper.vm.createContentType()
      expect(wrapper.vm.$store.dispatch).toHaveBeenCalled()
    })

    it('should return if the user has not chosen whether the contentType is oneOff', () => {
      wrapper.vm.requireOneOff = () => {
        return 'Error'
      }
      wrapper.vm.isNameUnique = () => {
        return true
      }
      wrapper.vm.$store = {
        dispatch: jest.fn()
      }
      wrapper.vm.createContentType()
      expect(wrapper.vm.$store.dispatch).not.toHaveBeenCalled()
    })

    it('should return if the user has chosen a name that is not unique', () => {
      wrapper.vm.requireOneOff = () => {
        return true
      }
      wrapper.vm.isNameUnique = () => {
        return 'Error'
      }
      wrapper.vm.$store = {
        dispatch: jest.fn()
      }
      wrapper.vm.createContentType()
      expect(wrapper.vm.$store.dispatch).not.toHaveBeenCalled()
    })
  })
})
