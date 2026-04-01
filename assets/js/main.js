(function () {
  var loaderEl = document.getElementById('loader');
  var barEl = document.getElementById('loader-bar');
  var hero = document.getElementById('heroContent');

  // Quick loader animation
  var progress = 0;
  var interval = setInterval(function () {
    progress += Math.random() * 18 + 8;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      if (loaderEl) {
        loaderEl.style.transition = 'opacity 0.4s';
        loaderEl.style.opacity = '0';
        setTimeout(function () { if (loaderEl) loaderEl.style.display = 'none'; }, 420);
      }
    }
    if (barEl) barEl.style.width = Math.min(progress, 100) + '%';
  }, 40);

  // Hero parallax on scroll
  function onScroll() {
    var scrollY = window.scrollY || window.pageYOffset;
    var heroHeight = window.innerHeight;

    if (hero) {
      var progress = Math.min(scrollY / heroHeight, 1);
      var opacity = Math.max(0, 1 - progress * 2.5);
      var translateY = -scrollY * 0.3;
      hero.style.opacity = opacity;
      hero.style.transform = 'translateY(' + translateY + 'px)';
      hero.style.pointerEvents = opacity < 0.05 ? 'none' : 'auto';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();