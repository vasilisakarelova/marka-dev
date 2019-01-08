function requestTimeout (fn, delay) {
  const start = Date.now()
  const handle = {}

  function loop () {
    const current = Date.now()
    const delta = current - start

    delta >= delay
      ? fn.call()
      : handle.value = window.requestAnimationFrame(loop)
  }

  handle.value = window.requestAnimationFrame(loop)
  return handle
}

const wait = function (ms) {
  return {
    run: (fn) => {
      return requestTimeout(fn, ms)
    },
    clear: (data) => { window.cancelAnimationFrame(data.value) }
  }
}

export default wait
