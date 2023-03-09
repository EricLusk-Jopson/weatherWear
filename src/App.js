import logo from "./logo.svg";
import WeatherWindow from "./components/WeatherWindow";
import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";

function App() {
  const isLoaded = useRef(false);
  const [location, setLocation] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const geoUrl = "https://ipgeolocation.abstractapi.com/v1/";
  const geoKey = "9428dd483e554b17aa1adf55da519db4";
  const weatehrKey = "a8afdd263bc5df3653460738544a5938";

  const getWeather = async () => {
    const ipResponse = await fetch("https://ipv4.jsonip.com").then((res) =>
      res.json()
    );
    const ip = ipResponse.ip;

    const geoResponse = await fetch(
      geoUrl + "?api_key=" + geoKey + "&ip_address=" + ip
    ).then((res) => res.json());

    const lat = geoResponse.latitude;
    const lon = geoResponse.longitude;

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatehrKey}&units=metric`
    ).then((res) => res.json());
    console.log(ipResponse, geoResponse, weatherResponse);
    setLocation(weatherResponse.name);
    setFeelsLike(weatherResponse.main.feels_like);
  };

  useEffect(() => {
    if (!isLoaded.current) {
      getWeather();
      isLoaded.current = true;
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>

      <WeatherWindow location={location} temp={feelsLike} />
      <div>Activity List</div>
    </div>
  );
}

export default App;
