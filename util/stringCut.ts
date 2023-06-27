export const stringCut = (
  name: string = '',
  max = 20,
  concatString = '...'
) => {
  if (name.length >= max) {
    return name.slice(0, max) + concatString
  }
  return name
}
