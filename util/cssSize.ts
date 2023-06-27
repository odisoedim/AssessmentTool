export const transCssSize = (value: number | string) => {
  const _v = +value
  if (isNaN(_v)) {
    return value
  } else {
    return `${_v}px`
  }
}
