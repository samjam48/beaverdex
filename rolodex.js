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
  addInput(nameInput, emailInput, addressInput);    // create object and button for new input data
  clicks++;     // add 1 to clicks reference
}

// create object and new button for each input
function addInput(nameInput, emailInput, addressInput){
  obj = { name:nameInput, email: emailInput,address: addressInput };
  dataArray.push(obj);    // push new object to array
  // create new button with name of input
  document.getElementById("buttons").innerHTML += '<div class="col s2"><a id="' + clicks + '" class="waves-effect waves-light btn" onclick="fillDetails(' + clicks + ')">' + nameInput + '</a></div>'
}


function fillDetails(idNum){
  // change the inner html of details list to the object link to the button id
  document.getElementById("name").innerHTML = dataArray[idNum].name;
  document.getElementById("email").innerHTML = dataArray[idNum].email;
  document.getElementById("address").innerHTML = dataArray[idNum].address;
  Materialize.showStaggeredList('#details')       // reveal list of details in a pretty way
}



// JQuery for collapsible list elements (currently not used)
//
// $('.collapsible').collapsible({
//   accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
// });



// make an object
// key of each button click
// value is object of the 3 values submitted
