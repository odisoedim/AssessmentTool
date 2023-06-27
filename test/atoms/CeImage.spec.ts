import { mount } from '@vue/test-utils'
import CeImage from '~/components/atoms/CeImage.vue'
describe('CeCardImage.vue', () => {
  it('can work', () => {
    const wrap = mount(CeImage, {
      propsData: {
        src: 'https://goldilocks-images.s3.eu-west-1.amazonaws.com/blob_32c9077915',
      },
    })
    expect(wrap).toBeTruthy()
  })
  it('renders img', () => {
    const wrap = mount(CeImage, {
      propsData: {
        src: 'https://goldilocks-images.s3.eu-west-1.amazonaws.com/blob_32c9077915',
      },
    })
    expect(wrap.props().src).toBe(
      'https://goldilocks-images.s3.eu-west-1.amazonaws.com/blob_32c9077915'
    )
  })
})
