import React from "react";

const WeatherWindow = ({ location, lat, lon, temp }) => {
  return (
    <div className="weather-window">
      <div className="location">{location}</div>
      <div className="latlon">{`${lat}, ${lon}`}</div>
      <div className="feels-like">
        <span>Feels like: </span>
        <span className="temp">{`${Math.round(temp)}°C`}</span>
      </div>
    </div>
  );
};

export default WeatherWindow;
