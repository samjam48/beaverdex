// main.js

// var update = document.getElementById('create')		// find update button and register variable

// console.log(update);


  // $('.button-collapse').sideNav('show');
  // $('.button-collapse').sideNav('hide');



dataArray = [];   // array to store all user field inputs
clicks = 0;       // monitor the times form submitted
fields = [];      // array for storing the fields a user can enter


function showMap(){
  // store user inputs as variables each time
  var nameInput = document.getElementById("nameInput").value;
  var emailInput = document.getElementById("emailInput").value;
  var addressInput = document.getElementById("addressInput").value;
  // show map of input address
  document.getElementById("map").innerHTML = '<iframe width="400" height="300" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyB74nabs8eomrEcn7WQCjZAaJJcGUXV0bY &q=' + addressInput + '" allowfullscreen></iframe>';
  Materialize.fadeInImage('#map')     // fade in the new map
  clicks++;     // add 1 to clicks reference
}



// <script> 
// <% function fillDetails(idNum){ %>
//   // change the inner html of details list to the object link to the button id
//   document.getElementById("name").innerHTML = <%= rolodeets[idNum].name; %>
//   document.getElementById("email").innerHTML = <%= rolodeets[idNum].email; %>
//   document.getElementById("address").innerHTML = <%= rolodeets[idNum].address; %>
//   Materialize.showStaggeredList('#details')       // reveal list of details in a pretty way
// <% } %>
// </script>



//buttons margin
//margin: 10px;


// var del = document.getElementById('delete')

// del.addEventListener('click', function () {
//   fetch('quotes', {
//     method: 'delete',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       'name': 'Darth Vader'
//     })
//   })
//   .then(res => {
//     if (res.ok) return res.json()
//   }).
//   then(data => {
//     console.log(data)
//     window.location.reload()
//   })
// })