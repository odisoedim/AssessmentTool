export const MockEnv = (obj: Record<string, string>) => {
  const _env = {
    ...process.env,
  }
  process.env = Object.assign(process.env, obj)
  return () => {
    process.env = { ..._env }
  }
}
