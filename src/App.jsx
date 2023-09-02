import axios from "axios";
import { useEffect, useState } from "react";
import sunIcon from "./assets/sun-white.svg";
import clearIcon from "./assets/icons/clear.svg";
import cloudIcon from "./assets/icons/clouds.svg";
import drizzleIcon from "./assets/icons/drizzle.svg";
import dustIcon from "./assets/icons/dust.svg";
import fogIcon from "./assets/icons/fog.svg";
import hazeIcon from "./assets/icons/haze.svg";
import mistIcon from "./assets/icons/mist.svg";
import rainIcon from "./assets/icons/rain.svg";
import sandIcon from "./assets/icons/sand.svg";
import smokeIcon from "./assets/icons/smoke.svg";
import snowIcon from "./assets/icons/snow.svg";
import tornadoIcon from "./assets/icons/tornado.svg";

// error wala

import "./App.css";
import DidntgetLoction from "./DidntgetLoction";

function App() {
  // const [search, setSearch] = useState(geoplugin_city());
  const [myWeather, setMyWeather] = useState({});
  const [search, setSearch] = useState("delhi");
  const [weather, setWeather] = useState({});
  const [searchErr, setSearchErr] = useState("");

  // states for time
  const [hour, setHour] = useState("00");

  // states for weather animation icon
  const [weatherIcon, setWeatherIcon] = useState(sunIcon);

  // states for my weather if user's city isnt available in api
  const [myCity, setMyCity] = useState("");
  const [myCountry, setMyCountry] = useState("");

  let api = {
    key: "c6560d25cfb830767e45a58232b9a550",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const gettingWeatherIcon = (weatherType) => {
    switch (weatherType) {
      case "Rain":
        setWeatherIcon(rainIcon);
        break;

      case "Clouds":
        setWeatherIcon(cloudIcon);
        break;

      case "Mist":
        setWeatherIcon(mistIcon);
        break;

      case "Clear":
        setWeatherIcon(clearIcon);
        break;

      case "Haze":
        setWeatherIcon(hazeIcon);
        break;

      case "Sand":
        setWeatherIcon(sandIcon);
        break;

      case "Snow":
        setWeatherIcon(snowIcon);
        break;

      case "Dust":
        setWeatherIcon(dustIcon);
        break;
      case "Fog":
        setWeatherIcon(fogIcon);
        break;
      case "Smoke":
        setWeatherIcon(smokeIcon);
        break;
      case "Tornado":
        setWeatherIcon(tornadoIcon);
        break;
      case "Drizzle":
        setWeatherIcon(drizzleIcon);
        break;

      default:
        setWeatherIcon(sunIcon);
        break;
    }
  };

  const invokeSearch = (queryAsSearch) => {
    axios
      .get(
        `${api.base}weather?q=${queryAsSearch}&units=metric&APPID=${api.key}`
      )
      .then((res) => {
        setWeather(res);
        gettingWeatherIcon(res.data.weather[0].main);
        // console.log(weather);
        setSearchErr("");
        setSearch("");
      })
      .catch((error) => {
        search == ""
          ? setSearchErr("please enter a location")
          : setSearchErr("Enter a valid location.");
        console.error("::::::::::::  " + error + "  :::::::::::::");
      });

    /////////////////////////////////////
  };

  const gotLoc = (position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    // console.log(lat);
    // console.log(long);

    axios
      .get(
        `${api.base}weather?lat=${lat}&lon=${long}&units=metric&appid=${api.key}`
      )
      .then((res) => {
        console.log(res);
        setMyWeather(res);
        setMyCity(res.data.name);
        setMyCountry(res.data.sys.country);
        // console.log(res.sys.country);
        // console.log(res);
        setSearch("");
      })
      .catch((error) => {
        console.error("::::::::::: my location :  " + error);
      });
  };

  const didntGetLoc = () => {
    console.log("...........didnt get location.......");
  };
  const getMyLoc = () => {
    navigator.geolocation.getCurrentPosition(gotLoc, didntGetLoc);
  };

  useEffect(() => {
    invokeSearch(search);
    getMyLoc();
  }, []);

  function setThesearch(eTargetValueAsParam) {
    setSearch(eTargetValueAsParam);
    // console.log(search);
  }

  let dateBuilder = () => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let d = new Date();
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let day = days[d.getDay()];

    return `${day}, ${date}  ${month} ${year}`;
  };

  let today = dateBuilder();

  const timeFunc = () => {
    setHour(
      new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
  };

  setInterval(() => {
    timeFunc();
  }, 1000);

  return (
    <>
      <main>
        {/* searchbar */}

        {}

        {Object.keys(weather).length != 0 &&
        Object.keys(myWeather).length != 0 ? (
          <div className="container">
            {/* left box */}
            <div className="leftbox">
              {/* top */}
              <div className="left-top">
                <div className="place-Name  ">
                  {myCity === "" ? (
                    <p className="cityCouldntFound">Your City couldn't found</p>
                  ) : (
                    myCity
                  )}
                </div>
                <div className="country-Name">
                  {myCountry !== "" ? myCountry : null}
                </div>
              </div>

              {/* bottom */}

              <div className="left-bottom">
                <div className="timeAndDate">
                  <div className="time">{hour}</div>
                  <div className="dayAndDate">{today}</div>
                </div>

                <div className="tempareture">
                  {Math.round(myWeather.data.main.temp)}&deg;c
                </div>
              </div>
            </div>

            {/* right box */}
            <div className="rightbox">
              <div className="right-top">
                {/* sarch bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <input
                    onChange={(e) => setThesearch(e.target.value)}
                    value={search}
                    type="text"
                    id="hero-field"
                    name="hero-field"
                    placeholder="Search Here..." //text-base
                    className="w-[70%] bg-[#ffffff00] rounded border border-[#ffffff31] focus:border-[#fc6579]  outline-none text-[#fc6579] py-2 px-3 leading-9 text-xl"
                  />
                  <button
                    onClick={() => invokeSearch(search)}
                    className="inline-flex text-white py-4 px-3  hover:bg-[#fc6579] hover:border-[#ffffff31]  rounded "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </div>

                {/* <p className="errMassage">*Enter valid location.</p> */}
                <p className="errMassage">{searchErr}</p>
                {/* top animating img */}
                {/* <i className="bi bi-clouds-fill slide-right"></i> */}
                {/* {weatherIcon} */}
                <div className="iconContainer">
                  <img src={weatherIcon} alt="" className="slide-right" />
                </div>
              </div>
              <div className="right-bottom">
                {/* weather type */}
                <div className="weather-type">
                  {weather.data.weather[0].main}
                </div>
                <hr className="weatherTypeHr" />
                {/* PLACE NAME searched */}
                <div className="placeName">
                  {weather.data.name}, {weather.data.sys.country}
                </div>
                <hr className="data-rows-hr" />
                <div className="data-rows">
                  <div className="keys">Temp</div>
                  <div className="values">
                    {Math.round(weather.data.main.temp)}&deg;c
                  </div>
                </div>
                <hr className="data-rows-hr" />
                <div className="data-rows">
                  <div className="keys">Humidity</div>
                  <div className="values">{weather.data.main.humidity}%</div>
                </div>
                <hr className="data-rows-hr" />
                <div className="data-rows">
                  <div className="keys">Visibility</div>
                  <div className="values">{weather.data.visibility}mi</div>
                </div>
                <hr className="data-rows-hr" />
                <div className="data-rows">
                  <div className="keys">Wind Speed</div>
                  <div className="values">{weather.data.wind.speed}km/h</div>
                </div>
                <hr className="data-rows-hr" />
              </div>
            </div>
          </div>
        ) : (
          <DidntgetLoction />
        )}
      </main>
    </>
  );
}

export default App;
