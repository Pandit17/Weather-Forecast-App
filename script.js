const apiKey = "2a7e36a581293c509bf77e080525d180";

const searchBtn = document.getElementById("searchBtn");
const geoBtn = document.getElementById("geoBtn");
const locationInput = document.getElementById("locationInput");
const recentCities = document.getElementById("recentCities");
const errorMsg = document.getElementById("errorMsg");

const currentWeatherDiv = document.getElementById("currentWeather");
const cityName = document.getElementById("cityName");
const weatherDesc = document.getElementById("weatherDesc");
const temperature = document.createElement("p");
const weatherIcon = document.getElementById("weatherIcon");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const unitToggle = document.getElementById("unitToggle");
const forecastDiv = document.getElementById("forecast");

let currentTempC = null;
let currentUnit = "C";
let cities = JSON.parse(localStorage.getItem("cities")) || [];
updateDropdown();

searchBtn.addEventListener("click", () => handleSearch(locationInput.value.trim()));
geoBtn.addEventListener("click", getCurrentLocation);
recentCities.addEventListener("change", (e) => handleSearch(e.target.value));
unitToggle.addEventListener("click", toggleUnit);

function handleSearch(location){
  if(!location){ showError("Please enter a valid city name."); return; }
  fetchWeather(location);
  fetchForecast(location);
}

function showError(msg){
  errorMsg.textContent = msg;
  errorMsg.classList.remove("hidden");
  setTimeout(()=> errorMsg.classList.add("hidden"), 4000);
}

function getCurrentLocation(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos => {
      fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
      fetchForecastByCoords(pos.coords.latitude, pos.coords.longitude);
    }, () => showError("Unable to retrieve location."));
  } else showError("Geolocation not supported.");
}

async function fetchWeather(city){
  try{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await res.json();
    if(data.cod === 200){
      displayCurrentWeather(data);
      saveCity(data.name);
    } else showError(`City not found: ${data.message}`);
  } catch(err){ showError("Error fetching weather data."); console.error(err); }
}

async function fetchWeatherByCoords(lat, lon){
  try{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const data = await res.json();
    if(data.cod === 200) displayCurrentWeather(data);
    else showError(`Location not found: ${data.message}`);
  } catch(err){ showError("Error fetching weather data."); console.error(err); }
}

function displayCurrentWeather(data){
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  weatherDesc.textContent = data.weather[0].description;
  currentTempC = Math.round(data.main.temp);
  temperature.textContent = `${currentTempC}°C`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  wind.textContent = `Wind: ${data.wind.speed} m/s`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.alt = data.weather[0].description;
  currentWeatherDiv.appendChild(temperature);

  // Today card gradient + shadow + pulse
  currentWeatherDiv.className = `
    mb-10 w-full max-w-md p-8 rounded-3xl 
    bg-gradient-to-tr from-yellow-400 via-orange-300 to-pink-300
    backdrop-blur-lg shadow-2xl shadow-yellow-300/50
    hover:shadow-4xl hover:scale-105 
    transition-all duration-700
    animate-pulse
  `;
  currentWeatherDiv.classList.remove("hidden");

  if(currentTempC > 40) showError("Extreme temperature alert! Stay hydrated.");
  setWeatherBackground(data.weather[0].main);
}

async function fetchForecast(city){
  try{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`);
    const data = await res.json();
    if(data.cod === "200") displayForecast(data);
  } catch(err){ showError("Error fetching forecast."); console.error(err); }
}

async function fetchForecastByCoords(lat, lon){
  try{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    const data = await res.json();
    if(data.cod === "200") displayForecast(data);
  } catch(err){ showError("Error fetching forecast."); console.error(err); }
}

function displayForecast(data){
  forecastDiv.innerHTML = "";
  const todayDate = new Date().getDate();
  const daily = data.list.filter(item => item.dt_txt.includes("12:00:00") && new Date(item.dt_txt).getDate() !== todayDate).slice(0,5);

  daily.forEach(day => {
    const card = document.createElement("div");
    card.className = `
      forecast-card p-5 rounded-3xl bg-gradient-to-tr from-purple-400 via-pink-300 to-cyan-300
      backdrop-blur-md shadow-lg text-center flex flex-col items-center gap-3
      transition transform hover:scale-105 hover:shadow-2xl
    `;
    card.innerHTML = `
      <h3 class="font-semibold text-purple-700 text-lg">${new Date(day.dt_txt).toLocaleDateString()}</h3>
      <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}" class="w-24 h-24">
      <p class="text-purple-600 capitalize font-medium">${day.weather[0].description}</p>
      <p class="text-purple-800 font-bold">${Math.round(day.main.temp)}°C</p>
      <p class="text-purple-500 text-sm">Humidity: ${day.main.humidity}%</p>
      <p class="text-purple-500 text-sm">Wind: ${day.wind.speed} m/s</p>
    `;
    forecastDiv.appendChild(card);
  });
  forecastDiv.classList.remove("hidden");
}

function toggleUnit(){
  if(currentTempC === null) return;
  if(currentUnit === "C"){
    temperature.textContent = `${Math.round(currentTempC*9/5+32)}°F`;
    currentUnit = "F";
  } else {
    temperature.textContent = `${currentTempC}°C`;
    currentUnit = "C";
  }
}

function saveCity(city){
  if(!cities.includes(city)){
    cities.unshift(city);
    if(cities.length > 5) cities.pop();
    localStorage.setItem("cities", JSON.stringify(cities));
    updateDropdown();
  }
}

function updateDropdown(){
  if(cities.length === 0){ recentCities.classList.add("hidden"); return; }
  recentCities.innerHTML = `<option selected disabled>Recently searched cities</option>`;
  cities.forEach(c => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    recentCities.appendChild(option);
  });
  recentCities.classList.remove("hidden");
}

function setWeatherBackground(condition){
  const body = document.body;
  switch(condition.toLowerCase()){
    case "clouds": body.style.background = "linear-gradient(to right, #d7d2cc, #304352)"; break;
    case "rain": body.style.background = "linear-gradient(to right, #4b6cb7, #182848)"; break;
    case "clear": body.style.background = "linear-gradient(to right, #fceabb, #f8b500)"; break;
    case "snow": body.style.background = "linear-gradient(to right, #e0eafc, #cfdef3)"; break;
    default: body.style.background = "linear-gradient(to right, #ff9a9e, #fad0c4)";
  }
}
