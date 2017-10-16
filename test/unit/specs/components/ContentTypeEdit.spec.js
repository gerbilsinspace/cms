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
  let mutations
  let state
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
              {name: '1', id: 0}
            ]
          },
          failure: {
            controls: [
              { name: '1', id: 0 },
              { name: '1', id: 1 }
            ]
          }
        }
      },
      getError: () => {
        return null
      }
    }

    mutations = {
    }

    state = {
      errors: null
    }

    store = new Vuex.Store({
      state,
      getters,
      actions,
      mutations
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
      const ref = jest.fn()

      wrapper = shallow(ContentTypeEdit, {
        store,
        mocks: {
          $route
        },
        attachToDocument: true
      })
      wrapper.setData({
        firebase: { database: () => ({ ref }) }
      })

      wrapper.vm.onSave()

      expect(ref).toHaveBeenCalledWith('contentType/success')
    })

    it('should error out if there are names that are not unique', () => {
      const commit = jest.fn()

      $route.params.contentTypeId = 'failure'

      wrapper = shallow(ContentTypeEdit, {
        store,
        mocks: {
          $route
        },
        attachToDocument: true
      })

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
      const event = { path: [ {}, { dataset: {
        default: '',
        type: 'text'
      }}]}

      $route.params.contentTypeId = 'success'

      wrapper = shallow(ContentTypeEdit, {
        store,
        mocks: {
          $route
        },
        attachToDocument: true
      })

      wrapper.vm.addControl(event)

      expect(wrapper.vm.controlsToAdd[1]).toEqual({
        name: 'Unnamed',
        type: 'text',
        defaultValue: '',
        id: 1
      })
    })

    it('should set up the newly added control to edit', () => {
      const event = { path: [ {}, { dataset: {
        default: '',
        type: 'text'
      }}]}

      $route.params.contentTypeId = 'success'

      wrapper = shallow(ContentTypeEdit, {
        store,
        mocks: {
          $route
        },
        attachToDocument: true
      })

      wrapper.setData({
        text: '',
        tabMode: 'Create',
        controlId: null
      })

      expect(wrapper.vm.text).toEqual('')
      expect(wrapper.vm.tabMode).toEqual('Create')
      expect(wrapper.vm.controlId).toEqual(null)

      wrapper.setData({
        text: 'guff',
        tabMode: 'Create',
        controlId: null
      })

      wrapper.vm.addControl(event)

      expect(wrapper.vm.text).toEqual('Unnamed')
      expect(wrapper.vm.tabMode).toEqual('Edit')
      expect(wrapper.vm.controlId).toEqual(1)
    })
  })

  describe('should have a controlClick method that', () => {
    it('should set the clicked control as the control being edited', () => {
      const event = { path: [ {}, { dataset: {
        default: '',
        type: 'text',
        id: 1,
        name: 'guff'
      }}]}

      $route.params.contentTypeId = 'success'

      wrapper = shallow(ContentTypeEdit, {
        store,
        mocks: {
          $route
        }
      })

      wrapper.setData({
        text: '',
        tabMode: 'Create',
        controlId: null
      })

      expect(wrapper.vm.text).toEqual('')
      expect(wrapper.vm.tabMode).toEqual('Create')
      expect(wrapper.vm.controlId).toEqual(null)
      wrapper.vm.controlId = 0
      wrapper.vm.controlsToAdd[1] = {
        name: 'not guff',
        id: 1
      }
      wrapper.vm.controlClick(event)

      expect(wrapper.vm.text).toEqual('guff')
      expect(wrapper.vm.tabMode).toEqual('Edit')
      expect(wrapper.vm.controlId).toEqual(1)
    })
  })

  describe('should have a method that watches changes to text that', () => {
    it('should update the name of the control', (done) => {
      $route.params.contentTypeId = 'success'

      wrapper = shallow(ContentTypeEdit, {
        store,
        mocks: {
          $route
        }
      })

      wrapper.setData({
        text: '',
        tabMode: 'Create',
        controlId: 1
      })

      wrapper.vm.controlsToAdd[1] = {
        name: 'Not Guff',
        id: 1
      }

      wrapper.vm.controlId = 1

      wrapper.vm.text = 'Guff'
      wrapper.vm.$nextTick(() => {
        expect(wrapper.vm.controlsToAdd[1].name).toEqual('Guff')
        done()
      })
    })
  })
})
