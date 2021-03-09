import { initOctofy, LoadOctofy, loadScript } from './shared'

const octofyPromise = Promise.resolve().then(() => loadScript(null))

let loadCalled = false

octofyPromise.catch((err: Error) => {
  if (!loadCalled) console.warn(err)
})

export const loadOctofy: LoadOctofy = (...args) => {
  loadCalled = true
  return octofyPromise.then(maybe =>
    initOctofy(maybe, args)
  )
}