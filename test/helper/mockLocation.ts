export const MockLocation = (href: string) =>
  Object.defineProperty(window, 'location', {
    value: {
      href,
    },
  })
