var decouple = function (node, event, fn) {
  var ev
  var tracking = false

  function captureEvent (e) {
    ev = e
    track()
  }

  function track () {
    if (!tracking) {
      window.requestAnimationFrame(update)
      tracking = true
    }
  }

  function update () {
    fn.call(node, ev)
    tracking = false
  }

  node.addEventListener(event, captureEvent, false)

  return captureEvent
}

export default decouple
