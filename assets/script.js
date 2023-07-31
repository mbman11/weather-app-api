var apiKey = "656a0c48d465cbcb32447829872dc37e";

var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&limit=5" + "&appid=" + apiKey;

// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=38.2688&lon=-77.5476&per_page=5&" + userInput + "&units=imperial" + "&appid=" + apiKey;

// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

var fetchButton = document.getElementById('button');

var userInput = document.getElementById('user-input').value;




function textValue() {
  var userInput = document.getElementById('user-input').value;
  // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=38.2688&lon=-77.5476&per_page=5&" + userInput + "&units=imperial" + "&appid=" + apiKey;

  var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + userInput + "&limit=5" + "&appid=" + apiKey;

  getApi(queryURL);
}



function getApi(queryURL) {
  fetch(queryURL).then(function(response){
    return response.json();
  }).then(function(data){
    console.log(data);
    console.log(data[0].name);
    console.log(data[0].state);
    console.log(data[0].country);
    // console.log("City: " + data.name);
    // console.log("Current Temperature: " + data.main.temp);
    // console.log(data.weather[0].description);
  })
}


fetchButton.addEventListener('click',textValue);
// fetchButton.addEventListener('click',getApi);















// function getApi() {
//   fetch(queryURL).then(function(response){
//     return response.json()
//   }).then(function(data){
//     console.log(data.name);
//     console.log(data.main.temp);
//     console.log(data.weather[0].main);
//     console.log(data.weather[0].description);
//   });
// };

// fetchButton.addEventListener('click', getApi);


// console.log(zipCode);

// fetch(queryURL);

// console.log(queryURL)

