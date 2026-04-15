const apiKey = "2d4e43fab1a0015f48e46a80699fb10b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");
const errorMsg = document.getElementById("error-msg");

async function fetchWeather(city) {
    if (!city.trim()) return;

    errorMsg.textContent = "";

    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    const data = await response.json();

    if (data.cod === "404") {
        errorMsg.textContent = "City not found. Try again.";
        return;
    }

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + " km/h";
    document.querySelector(".description").textContent = data.weather[0].description;

    const icon = data.weather[0].icon;
    document.querySelector(".icon img").src =
        "https://openweathermap.org/img/wn/" + icon + "@2x.png";
}

searchBtn.addEventListener("click", () => {
    fetchWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") fetchWeather(searchBox.value);
});
