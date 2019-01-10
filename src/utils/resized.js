import decouple from './decouple'
import triggerCustomEvent from './triggerCustomEvent'

var resized = function () {
  var innerWidth = window.innerWidth
  var doc = document.documentElement
  var top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)

  decouple(window, 'resize', () => {
    innerWidth = window.innerWidth
    triggerCustomEvent(document, 'resized', { width: innerWidth })
  })

  decouple(window, 'scroll', (ev) => {
    top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0)
    triggerCustomEvent(document, 'scrolled', { top: top })
  })

  triggerCustomEvent(document, 'resized', { width: innerWidth })
  triggerCustomEvent(document, 'scrolled', { top: top })
}

export default resized
