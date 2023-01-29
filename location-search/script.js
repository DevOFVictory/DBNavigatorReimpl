console.log('Search Page opened');

document.getElementById('title').innerText = title;

// set focus on search input

if (Cookies.get('to-id'))
// show last location element
document.getElementById('last-location').style.display = 'block';


function get(name){
    if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
       return decodeURIComponent(name[1]);
 }

document.getElementById('back-btn').addEventListener('click', function() {

  openMainPage();

});


function openMainPage() {
  $.ajax({
    type: "GET",
    url: "../index.html"
  }).done(function(response) {
    document.body.innerHTML = '';
    document.write(response);
  });

  setTimeout(function() {

    removeStyles();
    removeScripts();
    addStyleOverPath("style.css");
    addScriptOverPath("script.js");
    }, 500);

}

$('#station-input').focus();

$('#station-input').on('input', function() {
  var input = $('#station-input').val();
  if (input.length > 2) {
    $.ajax({
      type: "GET",
      url: "https://v5.db.transport.rest/locations?query="+input+"&results=15&fuzzy=false&language=de"
    }).done(function(response) {
      // loop through json and add to list
      var list = document.getElementById('entries');
      
      // remove entries from index 2 to end
      for (let i = (Cookies.get('to-id')) ? 2 : 1; i<list.children.length; i++) {
        list.children[i].remove();
      }

      for (let i = 0; i < response.length; i++) {
        let entry = document.createElement('li');
        let icon = document.createElement('i');
        // add icon
        if (response[i].type == 'station') {
          icon.className = 'fa-solid fa-circle-h';
        } else if (response[i].type == 'stop') {
          icon.className = 'fa-solid fa-train-subway';
        } else if (response[i].type == 'location') {
          icon.className = 'fa-sharp fa-solid fa-location-pin';
        }
        entry.appendChild(icon);

        // add text
        let text = document.createElement('span');
        if (response[i].type != 'location') {
          text.innerText = response[i].name;
        } else {
          if (response[i].address) {
            text.innerText = response[i].address;
          } else {
            text.innerText = response[i].name;
          }
        }
        entry.addEventListener('click', function() {
          title == 'Von' ? fromName = text.innerText : toName = text.innerText;
          Cookies.set(title == 'Von' ? 'from-id' : 'to-id', response[i].id);
          openMainPage();
        });
        entry.appendChild(text);

        list.appendChild(entry);
      }
    });
  }
});
