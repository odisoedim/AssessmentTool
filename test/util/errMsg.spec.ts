import { ErrMsg } from '~/util/errMsg'

describe('ErrMsg is a enum', () => {
  it('has NoLogged"', () => {
    expect(ErrMsg.NoLogged).toBe('Please sign in')
  })
  it('has NoOrganization', () => {
    expect(ErrMsg.NoOrganization).toBe('No organization found for user')
  })
})
