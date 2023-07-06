const input = document.getElementById("input");
const input1 = document.getElementById("input1");
const container = document.querySelector(".container");
const id = document.querySelector("img");
console.log(container);
input.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && input.value != "") {
    reqApi(input.value.toLowerCase());
  }
});

function errorRender() {
  const res = `
    <div class="heading">
            <h3>  <span class="arrow"><i class="bi bi-brightness-high"></i></span> Weather App </h3>
        </div>
        <div class="warn">
            <p class="warn-heading">${input.value} isn't a valid city name</p>
        </div>
        <div class="error-icon">
            <img src="./error.png" class="error-img" alt="" srcset="">
        </div>
    `;
  container.innerHTML = res;
}

function reqApi(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=081c7cbb1eb464e8c5bf244e8134ecfd`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      ApiData(data);
    })
    .catch((err) => {
      errorRender();
    });
}

function ApiData(details) {
  console.log(details);
  var id = details.weather[0].id;
  // console.log(id);
  const temp = (details.main.temp - 273.15).toFixed(2);
  // console.log(temp);
  const description = details.weather[0].description;
  // console.log(description);
  const Cname = details.name;
  // console.log(Cname);
  const country = details.sys.country;
  // console.log(country);
  const feel = (details.main.feels_like - 273.15).toFixed(2);
  // console.log(feel);
  const humidity = details.main.humidity;
  // console.log(humidity);

  if (id == 800) {
    id = `"icons/clear.svg"`;
  } else if (id >= 200 && id <= 232) {
    id = `"icons/storm.svg"`;
  } else if (id >= 600 && id <= 622) {
    id = `"icons/snow.svg"`;
  } else if (id >= 701 && id <= 781) {
    id = `"icons/haze.svg"`;
  } else if (id >= 801 && id <= 804) {
    id = `"icons/cloud.svg"`;
  } else if ((id >= 500 && id <= 531) || (id >= 300 && id <= 321)) {
    id = `"icons/rain.svg"`;
  }

  const render = `
            <div class="heading">
            <h3>  <span class="arrow"><i class="bi bi-brightness-high"></i></span> Weather App </h3>
        </div>
        <div class="img">
             <img src=${id} alt="" srcset="">
        </div>
        <div class="temp">
            <h1>${temp}<span>&#176;</span>C</h1>
        </div>
        <div class="des">
            <p>${description}</p>
            <p><span><i class="bi bi-geo-alt"></i></span> ${Cname}, ${country}</p>
        </div>

        <div class="flex-box">
            <div class="feel">

                <div class="temp-logo">
                    <span><i class="bi bi-thermometer-sun"></i></span>
                </div>
                <div class="feel-temp">
                    <p>${feel}<span>&#176;</span>C</p>
                    <p>Feels Like</p>
                </div>

            </div>
            <div class="humidity">
                <div class="temp-logo">
                    <span><i class="bi bi-moisture"></i></span>
                </div>
                <div class="feel-temp">
                    <p>${humidity}%</p>
                    <p>Humidity</p>
                </div>
            </div>
        </div>
    `;

  container.innerHTML = render;
}
