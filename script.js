const API_KEY = "b35df23287730bb59de2f86c38c8e3aa";
let currentWeather = null;

const SearchBtn =  document.getElementById("searchBtn" );
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const cursor = document.querySelector(".cursor")

SearchBtn.addEventListener("click", ()=>{
    const city= cityInput.value.trim();

    if(city === ""){
        alert("Please enter city name");
        return;
    }

    getWeather(city);
});

async function getWeather(city){
    try{
        weatherResult.innerHTML = `<p class="loading">Fetching weather...</p>`;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
         if(!response.ok){
        throw new Error("City not found");
    }
//You received a response from the weather server, but it’s still raw.
// These two lines:Convert the response into usable data &Send that data to your UI function
    const data = await response.json();
    currentWeather = data;
    displayWeather(data);

    } catch(error){
         weatherResult.innerHTML = `<p>${error.message}</p>`
    }
   
}

function displayWeather(data) {
  const { name } = data;
  const { temp, humidity } = data.main;
  const { description } = data.weather[0];
  const { speed } = data.wind;

  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <p>🌡️ Temperature: ${temp}°C</p>
    <p>🌥️ Condition: ${description}</p>
    <p>💧 Humidity: ${humidity}%</p>
    <p>🌬️ Wind Speed: ${speed} m/s</p>
  `;
}

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    SearchBtn.click();
  }
});

const askInput = document.getElementById("askInput");
const askBtn = document.getElementById("askBtn");
const askAns = document.getElementById("askAnswer");
const suggestions = document.querySelectorAll(".suggestion");

suggestions.forEach((item)=>{
  item.addEventListener("click", ()=>{
    askInput.value = item.innerText;
    askInput.focus();
  })
})


askBtn.addEventListener("click", askfun);

function askfun(){
  if(!currentWeather){
    alert("Enter the city first")
    askInput.value = "Enter the city first";
    return;
  }

  const question = askInput.value.toLowerCase();
  const temp = currentWeather.main.temp;
  const weather = currentWeather.weather[0].main;
  const description = currentWeather.weather[0].description;
  const humidity = currentWeather.main.humidity;

  let ans= "";

  if(question.includes("rain")){
    ans = weather.includes("Rain") ? "Yes, it may rain today" : "No,it will not rain today"
  } else if(question.includes("hot")){
    ans = temp>30 ? "It's quite hot today" : "It's not too hot today"
  } 
  else if(question.includes("cold")){
    ans = temp < 15 ? "It's cold outside" : "It's not too cold outside"
  }
  else if(question.includes("temperature")){
    ans = `Today's temperature is around ${temp}°C`
  } 
  else if(question.includes("cloud")){
    ans= `Current condition is ${description}`
  }  
  else if(   question.includes("weather") || question.includes("right now") || question.includes("today")) {
    ans = `Right now, the weather is ${description} with the temprature of  ${temp}°C. The humidity is ${humidity}% and wind speed is around ${currentWeather.wind.speed} m/s.`
  }
   else {
    ans = "I can answer basic weather questions for now 😊";
  }

  // askAns.innerText= ans;
  showAnswer(ans);
}
askInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    askBtn.click();
  }
});


function showAnswer(text) {
  const askAnswer = document.getElementById("askAnswer");
  // const answerText = document.getElementById("answerText");
  answerText.innerText = text;
  askAnswer.classList.add("show");
}



  