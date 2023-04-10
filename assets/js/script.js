const searchBtn = $("#searchButton");
const fiveDayForcast = $("#futureForcast");
const currentCity = $("#currentCity");
const userOptions = $("#userInteract");
let searchNumber = localStorage.length;

function getWeather(event) {
  event.preventDefault();
  const cityName = $("#search").val();
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=acbf659b6dad995f4221a78b638e6923`;
  fetch(weatherUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      for (let i = 0; i < data.list.length; i++) {
        const forecastDate = new Date(data.list[i].dt_txt);
        if (
          data.list[i].dt_txt.split(" ")[1] ===
          data.list[0].dt_txt.split(" ")[1]
        ) {
          let temp = `Temp: ${data.list[i].main.temp.toFixed(2)}°F`;
          //
          let wind = `Wind: ${data.list[i].wind.speed}mph`;
          //
          let humidity = `Humidity: ${data.list[i].main.humidity}%`;
          //
          let date = data.list[i].dt_txt.split(" ")[0].replaceAll("-", "/");
          //
          let weatherIcon = data.list[i].weather[0].icon;
          // console.log(temp, wind, humidity, date, weatherIcon);
          //

          if (i != 0) {
            let card = $("<div>");
            card.addClass("card w-auto mx-3");
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
            let cardIcon = $("<img>");
            cardIcon.addClass("img-fluid");
            cardIcon.attr(
              "src",
              `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
            );

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
            name.text(`${cityName} (${date})`);
            currentCity.append(name);
            //
            let mainIcon = $("<img>");
            mainIcon.attr(
              "src",
              `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
            );
            name.append(mainIcon);
            //
            let mainTemp = $("<h3>");
            mainTemp.text(temp);
            currentCity.append(mainTemp);
            //
            let mainWind = $("<h3>");
            mainWind.text(wind);
            currentCity.append(mainWind);
            //
            let mainHumidity = $("<h3>");
            mainHumidity.text(humidity);
            currentCity.append(mainHumidity);
            //
          }
        }
      }
      searchNumber++;
      localStorage.setItem(cityName.toUpperCase(), cityName);
    });
  });
}

function genButton() {}

function getHistory() {
  for (const [key, value] of Object.entries(localStorage)) {
    let historyButton = $("<button>");
    historyButton.addClass("btn btn-primary w-100 m-1 historyBtn");
    historyButton.text(value);
    userOptions.append(historyButton);
  }
}
window.addEventListener("load", getHistory);
searchBtn.on("click", getWeather);
