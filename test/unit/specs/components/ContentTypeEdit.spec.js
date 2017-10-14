/* global jest */

import Vue from 'vue'
import Vuex from 'vuex'
import { shallow } from 'vue-test-utils'
import ContentTypeEdit from '@/components/ContentTypeEdit'

Vue.use(Vuex)

describe('ContentTypeEdit', () => {
  let wrapper
  let store
  let actions
  let getters
  let $route

  beforeEach(() => {
    $route = {
      path: '/',
      hash: '',
      params: {
        contentTypeId: 'success'
      },
      query: { }
    }

    actions = {
      saveContentType: jest.fn()
    }

    getters = {
      getContentTypes: () => {
        return {
          success: {
            controls: [
              {name: '1'}
            ]
          },
          failure: {
            controls: [
              { name: '1' },
              { name: '1' }
            ]
          }
        }
      }
    }

    store = new Vuex.Store({
      getters,
      actions
    })
  })

  test('is a Vue component', () => {
    wrapper = shallow(ContentTypeEdit, {
      store,
      mocks: {
        $route
      }
    })

    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  describe('should have an onSave method that', () => {
    it('should call $store.dispatch if all names are unique', () => {
      wrapper = shallow(ContentTypeEdit, {
        store,
        mocks: {
          $route
        },
        attachToDocument: true
      })

      const ref = jest.fn()
      wrapper.setData({
        firebase: { database: () => ({ ref }) }
      })
      wrapper.vm.onSave()
      expect(ref).toHaveBeenCalledWith('contentType/success')
    })

    it('should error out if there are names that are not unique', () => {
      $route.params.contentTypeId = 'failure'

      wrapper = shallow(ContentTypeEdit, {
        store,
        mocks: {
          $route
        },
        attachToDocument: true
      })

      const commit = jest.fn()
      wrapper.vm.$store.commit = commit

      wrapper.setData({
        firebase: { database: () => ({ ref: jest.fn() }) }
      })

      wrapper.vm.onSave()

      expect(commit).toHaveBeenCalledWith('setError', 'Each control needs to have a unique name')
    })
  })

  describe('should have an addControl method that', () => {
    it('should add a control to controlsToAdd', () => {
      $route.params.contentTypeId = 'success'

      wrapper = shallow(ContentTypeEdit, {
        store,
        mocks: {
          $route
        },
        attachToDocument: true
      })

      const event = { path: [ {}, { dataset: {
        default: '',
        type: 'text'
      }}]}

      wrapper.vm.addControl(event)
      expect(wrapper.vm.controlsToAdd[1]).toEqual({
        name: 'Unnamed',
        type: 'text',
        defaultValue: '',
        id: 1
      })
    })
  })
})
