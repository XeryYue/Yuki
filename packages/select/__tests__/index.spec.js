import Select from '../index'
import Option from '../../select-option/index'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'

describe('Select', () => {
  it('should be render as element', () => {
    const wrapper = mount(Select)
    expect(wrapper.html()).toMatchSnapshot()
    // expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should support different sizes', () => {
    const wrapper = mount({
      setup() {
        return { sizes: ['mini', 'small', 'medium', 'large'] }
      },
      render() {
        return (
          <>
            {this.sizes.map((size, idx) => (
              <Select size={size} key={idx}></Select>
            ))}
          </>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.findAll('.fect-select')[0].attributes('style')).toContain(
      '--select-fontSize: 12px;',
    )
    expect(wrapper.findAll('.fect-select')[1].attributes('style')).toContain(
      '--select-fontSize: 12px;',
    )
    expect(wrapper.findAll('.fect-select')[2].attributes('style')).toContain(
      '--select-fontSize: 14px;',
    )
    expect(wrapper.findAll('.fect-select')[3].attributes('style')).toContain(
      '--select-fontSize: 16px;',
    )
  })

  it('should be support hidden clearable icon', async () => {
    const wrapper = mount({
      setup() {
        return {
          test: '0',
        }
      },
      render() {
        return (
          <Select modelValue={this.test} clearable={false}>
            <Option label="Vue" value="0"></Option>
            <Option label="React" value="1"></Option>
          </Select>
        )
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.find('.fect-select__clearIcon').exists()).toBe(false)
    await wrapper.setProps({ clearable: true })
    await wrapper.trigger('mouseenter')
    expect(wrapper.find('.fect-select__clearIcon').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should support disabled select component', () => {
    const wrapper = mount(Select, { props: { disabled: true } })
    expect(wrapper.find('.disabled').exists()).toBe(true)
  })

  it('should be support custom placeholder tips', () => {
    const wrapper = mount(Select, {
      props: {
        placeholder: 'custom',
        modelValue: null,
      },
    })
    expect(wrapper.find('.fect-select__placeholder').text()).toContain('custom')
  })

  it('shoudl be supoort multiple mode', () => {
    const wrapper = mount({
      setup() {
        const val = ref(['0', '1', '2'])
        return { val }
      },
      render() {
        return (
          <Select multiple v-model={this.val}>
            <Option value="0" label="Vue"></Option>
            <Option value="1" label="React"></Option>
            <Option value="2" label="Angular"></Option>
          </Select>
        )
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
