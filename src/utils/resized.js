import decouple from './decouple'
import triggerCustomEvent from './triggerCustomEvent'

var resized = function () {
  var innerWidth = window.innerWidth

  decouple(window, 'resize', () => {
    innerWidth = window.innerWidth
    triggerCustomEvent(document, 'resized', { width: innerWidth })
  })

  triggerCustomEvent(document, 'resized', { width: innerWidth })
}

export default resized
