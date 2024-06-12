import sleep from "./sleep"

const conditionalFunction = async ({
  condition,
  success,
  failure,
  signal,
  retries = 20,
  interval = 100,
}) => {
  if (signal?.aborted) {
    return
  }

  if (await condition()) {
    if (signal?.aborted) {
      return
    }

    await success?.()
    return
  }

  if (retries === 0) {
    if (signal?.aborted) {
      return
    }

    await failure?.()
    return
  }

  await sleep(interval)

  return conditionalFunction({
    condition,
    success,
    failure,
    signal,
    retries: retries - 1,
    interval,
  })
}

export default conditionalFunction
