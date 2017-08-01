function fireLazyIncrements() {
  incrementLazily(document.querySelector('#js-successful-projects'), 25, 75);
  incrementLazily(document.querySelector('#js-happy-clients'), 78, 20);
  incrementLazily(document.querySelector('#js-stats-services'), 12, 100);
  incrementLazily(document.querySelector('#js-technical-support-hours'), 24, 20);
  incrementLazily(document.querySelector('#js-technical-support-days'), 7, 100);
}

function incrementLazily(target, limit, ms) {
  var interval = setInterval(function () {
    var currentValue = Number(target.innerText);

    if (currentValue == limit) {
      clearInterval(interval)
    } else {
      target.innerText = currentValue + 1;
    }
  }, ms);
}

var navigationDrawer = {
  init: function (node) {
    this.drawer = node;
    this.hidden = true;
    this.toggle = this.toggle.bind(this);
  },
  toggle: function () {
    var animation = this.hidden ? {
      left: '0'
    } : {
      left: '-100%'
    };
    this.hidden = !this.hidden;
    this.drawer.animate(animation, 300);
  }
};

$(document).ready(function () {
  navigationDrawer.init($('#js-navDrawer'));
  document
    .querySelector('#js-navDrawerControl')
    .addEventListener('click', navigationDrawer.toggle);

  var stats = document.querySelector('.stats');
  if (stats) {
    var onScroll = function () {
      var delta = stats.offsetTop - document.body.scrollTop;
      if (delta >= 92 && delta <= 305) {
        fireLazyIncrements($);
        document.removeEventListener('scroll', onScroll, true);
      }
    };
    document.addEventListener('scroll', onScroll, true);
  }
});
