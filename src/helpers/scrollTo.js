export default () => {
  const element = document.scrollingElement || document.documentElement
  const start = element.scrollTop
  const change = to - start
  const startDate = +new Date()
  // t = current time
  // b = start value
  // c = change in value
  // d = duration
  easeInOutQuad = function(t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
  },
  animateScroll = function() {
      const currentDate = +new Date();
      const currentTime = currentDate - startDate;
      element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration),10)
      if(currentTime < duration) {
          requestAnimationFrame(animateScroll);
      }
      else {
          element.scrollTop = to;
      }
  };
  animateScroll();
}
