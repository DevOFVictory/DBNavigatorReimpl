var fromInput = document.getElementsByClassName('input from')[0];
var toInput = document.getElementsByClassName('input to')[0];
if (fromInput && toInput) {
  if (!fromName && Cookies.get('from-id')) {
    $.ajax({
        type: "GET",
        url: "https://v5.db.transport.rest/stops/" + Cookies.get('from-id')
    }).done(function(response) {
        fromName = response.name;
        fromInput.value = fromName;
    });
}else {
  fromInput.value = fromName;
}

if (!toName && Cookies.get('to-id')) {
    $.ajax({
        type: "GET",
        url: "https://v5.db.transport.rest/stops/" + Cookies.get('to-id')
    }).done(function(response) {
        toName = response.name;
        toInput.value = toName;
    });
}else {
  toInput.value = toName;
}

}

function openPage(name, pTitle) {
  $.ajax({
    type: "GET",
    url: "/" + name + "/index.html"
  }).done(function(response) {
    title = pTitle;
    document.body.innerHTML = '';
    document.write(response);
  });

  setTimeout(function() {

    removeStyles();
    removeScripts();
    addScript("location-search");
    addStyle("location-search");

    }, 200);

}