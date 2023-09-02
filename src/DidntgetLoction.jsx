import React from "react";
import cloud from "./assets/WeatherIcons.gif";
function DidntgetLoction() {
  return (
    <div className="boxIfNotAllowedLocation">
      <div>
        <img className="errCloud" src={cloud} alt="100" />
      </div>
      <h4 className="msg">
        Your current location will be displayed on the App & used for
        calculating Real Time weather.
      </h4>
    </div>
  );
}

export default DidntgetLoction;
