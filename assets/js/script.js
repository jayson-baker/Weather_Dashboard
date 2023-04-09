const searchBtn = $("#searchButton");
const fiveDayForcast = $("#futureForcast");
const currentCity = $("#currentCity");

function getWeather(event) {
  event.preventDefault();
  const cityName = $("#search").val();
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=acbf659b6dad995f4221a78b638e6923`;
  fetch(weatherUrl).then(function (response) {
    response.json().then(function (data) {
      for (let i = 0; i < 6; i++) {
        let temp = `Temp: ${(
          (data.list[i].main.temp - 273.15) * 1.8 +
          32
        ).toFixed(2)}°F`;
        //
        let wind = `Wind: ${data.list[i].wind.speed}mph`;
        //
        let humidity = `Humidity: ${data.list[i].main.humidity}%`;
        //
        let date = data.list[i].dt_txt.split(" ")[0].replaceAll("-", "/");
        //
        let weatherIcon = data.list[i].weather[0].description;
        console.log(temp, wind, humidity, date, weatherIcon);
        //
        if (i != 0) {
          let card = $("<div>");
          card.addClass("card");
          fiveDayForcast.append(card);
          //
          let cardBody = $("<div>");
          cardBody.addClass("card-body");
          card.append(cardBody);
          //
          let cardTitle = $("<h3>");
          cardTitle.addClass("card-title");
          cardTitle.text(date);
          cardBody.append(cardTitle);
          //
          let cardIcon = $("<div>");
          cardIcon.addClass("card-subtitle");
          cardIcon.text(weatherIcon);
          cardBody.append(cardIcon);
          //
          let cardTemp = $("<p>");
          cardTemp.addClass("card-text");
          cardTemp.text(temp);
          cardBody.append(cardTemp);
          //
          let cardWind = $("<p>");
          cardWind.addClass("card-text");
          cardWind.text(wind);
          cardBody.append(cardWind);
          //
          let cardHumidity = $("<p>");
          cardHumidity.addClass("card-text");
          cardHumidity.text(humidity);
          cardBody.append(cardHumidity);
          //
        } else {
          let name = $("<h1>");
          name.text(`${cityName} (${date}) ${weatherIcon}`);
          currentCity.append(name);
          //
        }
      }
    });
  });
}

searchBtn.on("click", getWeather);