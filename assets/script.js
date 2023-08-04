var apiKey = "656a0c48d465cbcb32447829872dc37e";
var fetchButton = document.getElementById('button-1');
var userInput = document.getElementById('user-input').value;


function textValue() {
  var userInput = document.getElementById('user-input').value;

  if(userInput.length !== 5 || userInput == NaN) {
    var wrongInputP = document.createElement('p');
    wrongInputP.setAttribute('id', 'wrong-input');
    wrongInputP.textContent = "Please Enter A Correct ZipCode.";
    var idLeftDiv = document.getElementById('left-side-div');
    idLeftDiv.append(wrongInputP);
    return;
  } if (userInput.length == 5 && !NaN) {
    
    handleApiResponse;
  } 

  var idLeftDiv = document.getElementById('left-side-div');
  var createUserInEl = document.createElement('button');
  createUserInEl.setAttribute('id','button-2');
  document.getElementById('button-2');
  createUserInEl.textContent = userInput;
  idLeftDiv.append(createUserInEl);


  var queryURL1 = "https://api.openweathermap.org/data/2.5/forecast?zip=" + userInput + "&appid=" + apiKey + "&units=imperial";
  var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?zip" + userInput + "&appid=" + apiKey + "&units=imperial";
  currentWeather(queryURL2 , queryURL1)
  
  function displayLocalStorage(){
    localStorage.setItem('value', userInput);
    userInput.innerHTML = localStorage.getItem('value');
  }
  displayLocalStorage();
}

function currentWeather(queryURL2, queryURL1) {
  fetch(queryURL1).then(function (response) {
    return response.json();
  }).then(function (data) {

    var  mainResultC = document.getElementById('result')
    var cWeatherArea = document.getElementById('current-weather');
    var cWeatherContent ="Today's Weather: " + data.city.name + ', ' + data.city.country + ' ' + data.list[0].dt_txt.split(" ")[0];
    // reset container
    cWeatherArea.innerHTML = "";

    var temperature = document.createElement('p');
    temperature.textContent = 'Temp: ' + data.list[0].main.temp + '°F';

    var wind = document.createElement('p')
    wind.textContent = 'Wind Speed: ' + data.list[0].wind.speed + ' MPH';

    var humidity = document.createElement('p')
    humidity.textContent = 'Humidity: ' + data.list[0].main.humidity + ' MPH';

    var description = document.createElement('p');
    description.textContent = "Description: " + data.list[0].weather[0].description;


    var cWeatherInfoEl = document.createElement('h2');
    var img = document.createElement("img");
    img.setAttribute("src",`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`);

    cWeatherInfoEl.textContent = cWeatherContent;

 
    cWeatherArea.append(cWeatherInfoEl);
    cWeatherArea.append(img);
    cWeatherArea.append(temperature);
    cWeatherArea.append(wind);
    cWeatherArea.append(humidity);
    cWeatherArea.append(description);
    mainResultC.append(cWeatherArea);

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
  var weatherList = data.list;
// clear container
  resultContainer.innerHTML = "";

  var fiveDayTitle = document.createElement('div');
  fiveDayTitle.setAttribute('id','five-day-title');
  fiveDayTitle.querySelector("#five-day-title");
  fiveDayTitle.textContent = fiveDayP;
  var fiveDayP = document.createElement('p');
  fiveDayP.textContent = "5 Day Forecast: ";

  fiveDayTitle.append(fiveDayP);
  resultContainer.append(fiveDayTitle);

  weatherList.forEach(function (item) {
    var time = item.dt_txt.split(" ")[1]
    if (time === "12:00:00") {
      var weatherSection = document.createElement('div');
      weatherSection.classList.add('weather-section');

      var date = document.createElement('p');
      date.textContent = "Date: " + item.dt_txt.split(" ")[0];

      var img = document.createElement("img");
      img.setAttribute("src",`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`)

      var temperature = document.createElement('p');
      temperature.textContent = "Temperature: " + item.main.temp + "°F";

      var wind = document.createElement('p')
      wind.textContent = 'Wind Speed: ' + data.list[0].wind.speed + ' MPH';

      var humidity = document.createElement('p')
      humidity.textContent = 'Humidity: ' + data.list[0].main.humidity + '%';

      var description = document.createElement('p');
      description.textContent = "Description: " + item.weather[0].description;

  
      weatherSection.appendChild(date);
      weatherSection.appendChild(img);
      weatherSection.appendChild(temperature);
      weatherSection.appendChild(wind);
      weatherSection.appendChild(humidity);
      weatherSection.appendChild(description);


      resultContainer.appendChild(weatherSection);
    }

  });
}


fetchButton.addEventListener('click', textValue);
