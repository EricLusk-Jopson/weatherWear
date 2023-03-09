import React from "react";

const WeatherWindow = ({ location, temp }) => {
  return (
    <div>
      It feels like {temp} in {location}
    </div>
  );
};

export default WeatherWindow;
