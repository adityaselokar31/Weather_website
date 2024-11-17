const apikey = "d37ea6fdce5cb1af05661b87a30fc1c2";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkweather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

// Add event listener to the search button
searchBtn.addEventListener("click", () => {
    checkweather(searchBox.value);
});

// Add city suggestion feature
document.getElementById('city-input').addEventListener('input', function() {
    let query = this.value;

    if (query.length > 2) {  // Fetch suggestions if input is longer than 2 characters
        fetchCitySuggestions(query);
    }
});

async function fetchCitySuggestions(query) {
    const cityApiUrl = `https://api.teleport.org/api/cities/?search=${query}`;
    try {
        const response = await fetch(cityApiUrl);
        const data = await response.json();
        
        const cityList = document.getElementById('city-list');
        cityList.innerHTML = '';  // Clear previous suggestions

        data._embedded['city:search-results'].forEach(city => {
            let option = document.createElement('option');
            option.value = city.matching_full_name;
            cityList.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching city suggestions:', error);
    }
}