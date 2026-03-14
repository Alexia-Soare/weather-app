const apiKey = "2d4e43fab1a0015f48e46a80699fb10b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".header button");

async function fetchWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === "404") {
        alert("City not found!");
        return;
    }

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    const icon = data.weather[0].icon;
    document.querySelector(".icon img").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
}

searchBtn.addEventListener("click", () => {
    fetchWeather(searchBox.value);
});
