/**
 * ? phonebook.js
 */
const objXHR = new XMLHttpRequest();

document.addEventListener("DOMContentLoaded", _ => {
  const search = document.querySelector("#search");
  const list = document.querySelector("#list");
  search.addEventListener("keyup", _ => {
    searchTelNumbers( search.value );
  });
});

function searchTelNumbers( val ) {
  objXHR.open( "get", "phonebook.php?val=" + encodeURIComponent( val ), true );
  objXHR.addEventListener("readystatechange", handleResponse);
  objXHR.send(null);
}

function handleResponse() {
  let nbrList = null;
  let output = "";

  if( objXHR.status === 200 && objXHR.readyState === 4 ) {
    if( ! objXHR.responseText ) {
      output = "Bitte (noch) ein Zeichen eingeben!";
    } else {
      nbrList = JSON.parse(objXHR.responseText);
      
      for( nbr in nbrList ) {
        output += nbrList[nbr] + "<br>";
      }
    }

    list.innerHTML = output;
  }
}