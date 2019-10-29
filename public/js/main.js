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
  });
}

function addErrorClass(input) {
  input.addClass('error');
  input.parent().addClass('error');
}

function removeErrorClass(input) {
  input.removeClass('error');
  input.parent().removeClass('error');
}

var token = '12321.4ddea5a1e7f5135cf5ba8ac52d7ddc87a6df755b492d618c2968cfcbeb0b8def';

function sendOrder(name, _phone, service, form) {
  var phone = _phone.replace('(', '').replace(')', '').replace('+', '').replace(' ', '');

  var data = {
    phone: phone,
    firstname: name,
    office_id: 13942, // Офис (Мурино) http://api.crmramex.ru/treatment/offices?token=TOKEN
    source_id: 33454, // http://api.crmramex.ru/treatment/sources?token=TOKEN
    comment: 'Заявка с сайта. Интересуется ' + service + '.',
  };

  $.ajax({
    method: 'POST',
    url: 'http://api.crmramex.ru/treatment/create?token=' + token,
    data: data,
  })
  .success(function (msg) {
    alert('Заявка отправлена.');
  })
}

$(function () {
  $(document).on('click', 'a[href^="#"]', function (event) {
    // event.preventDefault();
    var link = $.attr(this, 'href');

    if (link === '#') {
      return false;
    }

    $('html, body').animate({
      scrollTop: $(link).offset().top,
    }, 500);
  });

  var body = $('body');

  var options = {
    onChange: function (cep, event) {
      removeErrorClass($(event.target));
    },
  };

  $('.phone').mask('0 (000) 000 00 00', options);

  body.on('submit', '.service_form', function (event) {
    event.preventDefault();

    var isValid = true;
    var _this = $(this);
    var phoneInput = _this.find('input[name="phone"]');
    var nameInput = _this.find('input[name="name"]');

    var name = nameInput.val().trim();
    var phone = phoneInput.val().trim();

    if (!name.length) {
      isValid = false;
      addErrorClass(nameInput);
    }

    if (phone.length !== 17) {
      isValid = false;
      addErrorClass(phoneInput);
    }

    if (!isValid) {
      return false;
    }

    var serviceSelect = _this.find('select[name="service"]');
    var service = serviceSelect.val();

    sendOrder(name, phone, service, _this);
    return false;
  });

  body.on('change', 'input[name="name"]', function () {
    removeErrorClass($(this));
  });

  $('input').bind('invalid', function () {
    addErrorClass($(this));
    return false;
  });
});