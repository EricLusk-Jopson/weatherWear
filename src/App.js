import logo from "./logo.svg";
import WeatherWindow from "./components/WeatherWindow";
import "./App.css";
import { useEffect, useMemo, useRef, useState } from "react";
import ActivityCard from "./components/ActivityCard";
import ActivityModal from "./components/ActivityModal";

function App() {
  const isLoaded = useRef(false);
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [activities, setActivities] = useState([
    {
      title: " Easy Cycling",
      description: "pedaling about",
      start: -1,
      length: 4,
      active: true,
    },
  ]);
  const [hidden, setHidden] = useState(true);

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

  const createActivity = ({ title, desc, start, duration, intensity }) => {
    const temp = [...activities];
    temp.unshift({
      title: title ?? "",
      description: desc ?? "",
      start: start ?? -1,
      duration: duration ?? 0,
      intensity: intensity ?? "medium",
    });
    setActivities(temp);
    setHidden(true);
  };

  const unhide = () => {
    console.log("toggle");
    setHidden(false);
  };

  const hide = () => {
    setHidden(true);
  };

  useEffect(() => {
    if (!isLoaded.current) {
      getWeather();
      isLoaded.current = true;
    }
  }, []);

  useEffect(() => {
    console.log(activities);
  }, [activities]);

  return (
    <>
      <div className="App">
        <WeatherWindow
          location={location}
          lat={latitude}
          lon={longitude}
          temp={feelsLike}
        />
        <div className="card-list">
          {activities.map((activity) => {
            return <ActivityCard activity={activity}></ActivityCard>;
          })}
          <ActivityCard variant="addNew" clickFn={unhide}></ActivityCard>
        </div>
      </div>
      {!hidden && <ActivityModal onSubmit={createActivity} onCancel={hide} />}
    </>
  );
}

export default App;
