import {
  AUTH0_TOKEN_KEY,
  COOKIE_TOKEN_KEY,
  NO_SCROLL,
  NOT_APPLICABLE,
} from '~/util/static'

describe('it has static variable', () => {
  it('has COOKIE_TOKEN_KEY and eq "cookie_token_key"', () => {
    expect(COOKIE_TOKEN_KEY).toBe('cookie_token_key')
  })
  it('has AUTH0_TOKEN_KEY and eq "auth0"', () => {
    expect(AUTH0_TOKEN_KEY).toBe('auth0')
  })
  it('has NOT_APPLICABLE and eq 5', () => {
    expect(NOT_APPLICABLE).toBe(5)
  })
  it('has NO_SCROLL and eq "no-scroll"', () => {
    expect(NO_SCROLL).toBe('no-scroll')
  })
})
