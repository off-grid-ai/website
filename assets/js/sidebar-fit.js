// Keeps the sticky sidebar exactly as tall as the space under the announcement
// bar, as that bar scrolls away.
//
// Why this exists: the sidebar sticks to top:0, but its height was a fixed
// calc(100vh - 42px) to sit under the bar. Once the bar scrolls off, the sidebar
// is still 42px short of the viewport, leaving dead space below it for the whole
// rest of the page. This publishes how much of the bar is still on screen as
// --announce-visible, and the stylesheet subtracts that instead.
//
// Loaded as a browser global by the default layout, so it has no dependencies
// and stays ES5.
(function () {
  var bar = document.querySelector('.announcement-bar');
  if (!bar) return;
  var root = document.documentElement;
  var queued = false;

  // How much of the bar the viewport still shows: its full height at the top of
  // the page, 0 once it has scrolled past, and the partial value in between.
  function visibleHeight(rect, height) {
    if (!rect || rect.bottom <= 0) return 0;
    return Math.min(Math.max(rect.bottom, 0), height);
  }

  function sync() {
    queued = false;
    var height = bar.offsetHeight;
    root.style.setProperty('--announce-visible', visibleHeight(bar.getBoundingClientRect(), height) + 'px');
  }

  function schedule() {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(sync);
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  sync();
})();
