import { shallow } from 'vue-test-utils'
import Home from '@/components/Home'

describe('Home', () => {
  test('is a Vue component', () => {
    const wrapper = shallow(Home)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
