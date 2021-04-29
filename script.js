const nav_icon = document.querySelector(".nav-bar-icon");
const modal = document.querySelector(".modal");

const close_icon = document.getElementById("close-icon");

nav_icon.addEventListener("click", displayModal);

function displayModal() {
  modal.classList.remove("hidden-modal");
}

close_icon.addEventListener("click", closeModal);

function closeModal() {
  modal.classList.add("hidden-modal");
}

const api = {
  key: "f834bfb44780bf3a1d78ecd330d42a94",
  baseurl: "https://pro.openweathermap.org/data/2.5/",
  day: 7,
};


const input_search_desktop = document.getElementById('input-search-desktop');
input_search_desktop.addEventListener('keypress',setQueryDesktop);

function setQueryDesktop(evt) {
    if (evt.keyCode === 13) {
      getSearchValue(input_search_desktop.value);
    }
  }


const input_search = document.getElementById("input-search");

input_search.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode === 13) {
    getSearchValue(input_search.value);
    closeModal();
  }
}

function getSearchValue(query_string) {
  fetch(
    `${api.baseurl}forecast/climate?q=${query_string}&cnt=${api.day}&appid=${api.key}`
  )
    .then((weather) => {
      return weather.json();
    })
    .then((weather) => {
      displayData(weather);
      return weather;
    })
    .then((weather) => {
      displayWeatherByDay(weather);
    })
    .catch(function (error) {
      if (error.status === undefined) {
        alert("Not found your location.Try again !");
      }
    });
}

function displayData(weather) {
  /*----------------Declare variable will change by api----------*/
  var city = weather.city.name;
  var country = weather.city.country;
  var temp = convertTemp(weather.list[0].temp.day);
  var feel_like = convertTemp(weather.list[0].feels_like.day);
  var description = weather.list[0].weather[0].main;

  const location = document.getElementById("location");
  const main_temp = document.querySelector(".main-temp");
  const main_weather = document.querySelector(".main-weather");
  const main_feel_like = document.querySelector(".feel-like-temp");

  /*------------Change variable -----------------------*/
  location.innerHTML = city + "," + country;
  main_temp.innerHTML = `${temp}°C`;
  main_feel_like.innerHTML = `Feel like ${feel_like}°C`;
  main_weather.innerHTML = description;
  modifyImage(description);
}

function convertTemp(temp) {
  return Math.round(temp - 273.15);
}

function modifyImage(description) {
  const main_img = document.getElementById("main-img");
  var urlImg;
  if (description === "Rain") {
    urlImg = "./img/day_rain.png";
  } else if (description === "Clear") {
    urlImg = "./img/day_clear.png";
  } else if (description === "Clouds") {
    urlImg = "./img/cloud.png";
  }
  main_img.src = urlImg;
}

function getUrl(description) {
  var urlImg;
  if (description === "Rain") {
    urlImg = "./img/day_rain.png";
  } else if (description === "Clear") {
    urlImg = "./img/day_clear.png";
  } else if (description === "Clouds") {
    urlImg = "./img/cloud.png";
  }
  return urlImg;
}

function convertDayName(dt) {
  var allDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var d = new Date(dt * 1000); // to get the DateTime.
  var dayName = allDays[d.getDay()]; // It will give day index, and based on index we can get day name from the array.
  return dayName;
}


function addChildElementToParent(parent, a, b, c) {
  parent.appendChild(a);
  parent.append(b);
  parent.appendChild(c);
}

const sub_notify_div = document.querySelector(".sub-notify-weather");
function displayWeatherByDay(weather) {
    sub_notify_div.innerHTML="";
    for (var i = 1; i < 7; i++) {
        /*Create element to display weather by day*/
        let notify_by_day = document.createElement("div");
        let dayName = document.createElement("p");
        let span = document.createElement("span");
        let img = document.createElement("img");
        let h5 = document.createElement("h5");

        // /*Add class and id to element */
        img.className = "img-weather-by-day";
        notify_by_day.className = "notify-by-day";
        dayName.className = "dayName";
        span.appendChild(img);
        h5.className = "temp-by-day";

        // /*Add child element to parent*/
        addChildElementToParent(notify_by_day, dayName, span, h5);

        var dt = weather.list[i].dt;
        var day = convertDayName(dt);
        var dayName_weather = weather.list[i].weather[0].main;

        var url = getUrl(dayName_weather);
        img.src = url;
        var dayName_temp = convertTemp(weather.list[i].temp.day);


        /*Add Text to element */
        dayName.appendChild(document.createTextNode(day));
        h5.appendChild(document.createTextNode(`${dayName_temp}°C`));
        sub_notify_div.appendChild(notify_by_day);
    }
}



