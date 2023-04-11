const searchBtn = $("#searchButton");
const fiveDayForcast = $("#futureForcast");
const currentCity = $("#currentCity");
const userOptions = $("#userInteract");
let searchNumber = localStorage.length;

function getWeather(event) {
  event.preventDefault();
  clearOld();
  let cityName = $("#search").val();
  const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=acbf659b6dad995f4221a78b638e6923`;
  fetch(weatherUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      let mainDate = data.list[0].dt_txt.split(" ")[0].replaceAll("-", "/");
      let getMainIcon = data.list[0].weather[0].icon;
      let getMainTemp = `Temp: ${data.list[0].main.temp.toFixed(2)}°F`;
      let getMainWind = `Wind: ${data.list[0].wind.speed}mph`;
      let getMainHumidity = `Humidity: ${data.list[0].main.humidity}%`;

      // Generate Main Card
      let name = $("<h1>");
      name.text(`${cityName} (${mainDate})`);
      currentCity.append(name);
      //
      let mainIcon = $("<img>");
      mainIcon.attr(
        "src",
        `https://openweathermap.org/img/wn/${getMainIcon}@2x.png`
      );
      name.append(mainIcon);
      //
      let mainTemp = $("<h3>");
      mainTemp.text(getMainTemp);
      currentCity.append(mainTemp);
      //
      let mainWind = $("<h3>");
      mainWind.text(getMainWind);
      currentCity.append(mainWind);
      //
      let mainHumidity = $("<h3>");
      mainHumidity.text(getMainHumidity);
      currentCity.append(mainHumidity);

      // Finding query time and getting the correct 5 objects from the response
      let fiveDayData = [];
      data.list.forEach((element) => {
        let queryTime = data.list[0].dt_txt;
        let currentHour = new Date(queryTime).getHours() - 3;
        if (currentHour <= 0) {
          currentHour = 21;
        }
        console.log(currentHour);
        let elementDate = new Date(element.dt_txt).getHours();
        console.log(elementDate);

        if (elementDate === currentHour) {
          fiveDayData.push(element);
        }
      });

      console.log(fiveDayData);
      // Generate 5 Day Forecast Cards
      for (let i = 0; i < fiveDayData.length; i++) {
        let temp = `Temp: ${fiveDayData[i].main.temp.toFixed(2)}°F`;
        //
        let wind = `Wind: ${fiveDayData[i].wind.speed}mph`;
        //
        let humidity = `Humidity: ${fiveDayData[i].main.humidity}%`;
        //
        let date = fiveDayData[i].dt_txt.split(" ")[0].replaceAll("-", "/");
        //
        let weatherIcon = fiveDayData[i].weather[0].icon;
        // console.log(temp, wind, humidity, date, weatherIcon);
        //
        let card = $("<div>");
        card.addClass("card w-auto mx-3 dayCastCard");
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
      }

      if (!localStorage.getItem(cityName.toUpperCase())) {
        let historyButton = $("<button>");
        historyButton.addClass("btn btn-primary w-100 m-1 historyBtn");
        historyButton.text(cityName);
        historyButton.on("click", (innerEvent) => {
          $("#search").val(innerEvent.target.textContent);
          getWeather(innerEvent);
        });
        userOptions.append(historyButton);
      }
      localStorage.setItem(cityName.toUpperCase(), cityName);
    });
  });
}

function clearOld() {
  document.querySelectorAll("[class*=dayCastCard]").forEach((element) => {
    element.style.display = "none";
  });
  currentCity.text("");
}

function getHistory() {
  for (const [key, value] of Object.entries(localStorage)) {
    let historyButton = $("<button>");
    historyButton.addClass("btn btn-primary w-100 m-1 historyBtn");
    historyButton.text(value);
    historyButton.on("click", (event) => {
      $("#search").val(event.target.textContent);
      getWeather(event);
    });
    userOptions.append(historyButton);
  }
}
window.addEventListener("load", getHistory);
searchBtn.on("click", getWeather);
