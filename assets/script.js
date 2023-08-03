var apiKey = "656a0c48d465cbcb32447829872dc37e";

var fetchButton = document.getElementById('button');

var userInput = document.getElementById('user-input').value;



function textValue() {
  var userInput = document.getElementById('user-input').value;

  var idLeftDiv = document.getElementById('left-side-div');

  var createUserInEl = document.createElement('h4');
  createUserInEl.textContent = userInput;

  idLeftDiv.append(createUserInEl);


  var queryURL1 = "https://api.openweathermap.org/data/2.5/forecast?zip=" + userInput + "&appid=" + apiKey + "&units=imperial";
  var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?zip" + userInput + "&appid=" + apiKey + "&units=imperial";
  currentWeather(queryURL2 , queryURL1)
  
  
}

function currentWeather(queryURL2, queryURL1) {
  fetch(queryURL1).then(function (response) {
    return response.json();
  }).then(function (data) {

    var  mainResultC = document.getElementById('result')
    var cWeatherArea = document.getElementById('current-weather');
    var cWeatherContent = data.city.name + ', ' + data.city.country + ' ' + data.list[0].dt_txt.split(" ")[0];

    var temperature = document.createElement('p')
    temperature.textContent = 'Temp: ' + data.list[0].main.temp + '°F';

    var wind = document.createElement('p')
    wind.textContent = 'Wind Speed: ' + data.list[0].wind.speed + ' MPH';

    var humidity = document.createElement('p')
    humidity.textContent = 'Humidity: ' + data.list[0].main.humidity + ' MPH';


    var cWeatherInfoEl = document.createElement('h2');
    var img = document.createElement("img");
    img.setAttribute("src",`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);

    cWeatherInfoEl.textContent = cWeatherContent;

 
    cWeatherArea.append(cWeatherInfoEl);
    cWeatherArea.append(img);
    cWeatherArea.append(temperature);
    cWeatherArea.append(wind);
    cWeatherArea.append(humidity);

    mainResultC.append(cWeatherArea);



    // console.log(data.list[0].dt_txt);
    // today forecast can happen right here    

    
    // currentWeather(queryURL2);
    getFiveDay(queryURL1);
  })
}

function getFiveDay(queryURL) {
  fetch(queryURL).then(function (response) {
    return response.json();
  }).then(function (data) {
    console.log(data);
    handleApiResponse(data);
  })
};






function handleApiResponse(data) {
  var resultContainer = document.getElementById('five-day');
  // Limit the number of results to 5 from the weather list
  var weatherList = data.list
  //reset container
  resultContainer.innerHTML = "";


  weatherList.forEach(function (item) {
    var time = item.dt_txt.split(" ")[1]
    if (time === "12:00:00") {
      // Create a new div element for each weather forecast object
      var weatherSection = document.createElement('div');
      weatherSection.classList.add('weather-section'); // Add a CSS class for styling (optional)
      var img = document.createElement("img");
      img.setAttribute("src",`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`)

      // Create and populate elements with the relevant weather forecast data
      var cityName = document.createElement('h3')
      cityName.textContent = data.city.name;

      var date = document.createElement('p');
      date.textContent = "Date: " + item.dt_txt.split(" ")[0];

      var temperature = document.createElement('p');
      temperature.textContent = "Temperature: " + item.main.temp + "°F";

      var description = document.createElement('p');
      description.textContent = "Description: " + item.weather[0].description;

      // Append the elements to the weatherSection div
      weatherSection.appendChild(img);
      weatherSection.appendChild(date);
      weatherSection.appendChild(cityName);
      weatherSection.appendChild(temperature);
      weatherSection.appendChild(description);


      // Append the weatherSection div to the resultContainer

      resultContainer.appendChild(weatherSection);

    }

  });
}



//   // Loop through the weather list and append each item to the result container

//   weatherList.forEach(function(item) {
//     var weatherItem = document.createElement('p');
//     weatherItem.textContent = JSON.stringify(item);
//     resultContainer.appendChild(weatherItem);



//     console.log(data);
//   });
// }



fetchButton.addEventListener('click', textValue);


