import logo from "./logo.svg";
import WeatherWindow from "./components/WeatherWindow";
import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import ActivityCard from "./components/ActivityCard";

function App() {
  const isLoaded = useRef(false);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [activities, setActivities] = useState([]);

  //TODO move these to .env file
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
    setLatitude(lat);
    setLongitude(lon);

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatehrKey}&units=metric`
    ).then((res) => res.json());
    console.log(ipResponse, geoResponse, weatherResponse);
    setLocation(weatherResponse.name);
    setFeelsLike(weatherResponse.main.feels_like);
  };

  /*
   * backend maintains a reccommendation scheme for layers
   * these are influenced by
   * temperature, precipitation, intensity while outdoors
   */

  const createActivity = (title, desc, icon, startHr, lengthHrs, intensity) => {
    return {
      title: title ?? "",
      description: desc ?? "",
      icon: icon ?? null,
      start: startHr ?? -1,
      length: lengthHrs ?? 0,
      intensity: intensity ?? "medium",
    };
  };

  useEffect(() => {
    if (!isLoaded.current) {
      getWeather();
      isLoaded.current = true;
    }
  }, []);

  return (
    <div className="App">
      <WeatherWindow
        location={location}
        lat={latitude}
        lon={longitude}
        temp={feelsLike}
      />
      <div className="card-list">
        {activities.map((activity) => {
          return <ActivityCard></ActivityCard>;
        })}
        <ActivityCard variant="addNew"></ActivityCard>
      </div>
    </div>
  );
}

export default App;
