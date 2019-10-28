function handleWindow() {
  var body = document.querySelector('body');

  if (window.innerWidth > body.clientWidth + 5) {
    body.classList.add('has-scrollbar');
    body.setAttribute('style', '--scroll-bar: ' + (window.innerWidth - body.clientWidth) + 'px');
  } else {
    body.classList.remove('has-scrollbar');
  }
}

handleWindow();

// The resize isn't very necessary:
window.addEventListener('resize', handleWindow);

function initMap() {
  var point = {
    lat: 59.918326,
    lng: 30.346413,
  };

  var map = new google.maps.Map(
    document.getElementById('map'),
    {
      zoom: 17,
      center: point,
    },
  );

  var marker = new google.maps.Marker({
    position: point,
    map: map,
    label: {
      // color: '#000',
      // fontSize: '16px',
      // text:'Санкт-Петербург, Боровая ул., 30',
      // anchorPoint: new google.maps.Point(100, 0),
      // anchor: new google.maps.Point(100, 0),

    },
  });
}

$(function () {
  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top,
    }, 500);
  });
});