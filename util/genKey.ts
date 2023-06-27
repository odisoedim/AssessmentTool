export const genKey = <T>(arr: T[] | null, keySource: (i: T) => string) =>
  (arr || []).map((i) =>
    Object.assign(i, {
      _key: keySource(i).replace(/ /g, '_'),
    })
  )
