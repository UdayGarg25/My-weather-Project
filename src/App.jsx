import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "./index.css";

const App = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);

  const [condition, setCondition] = useState("");
  const [temp, setTemp] = useState("");
  const [feelslike, setFeelslike] = useState("");

  const handleLocation = (e) => setLocation(e.target.value);
  const handleDate = (e) => setDate(e.target.value);

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${date}?unitGroup=metric&key=ATVZRMAT6PNLEF3NWXH6FULXH`
      );
      setData(res.data.days[0]);
    } catch {
      alert("Error fetching weather data.");
    }
  };

  useEffect(() => {
    if (data && data.conditions && data.temp) {
      setCondition(data.conditions);
      setTemp(data.temp);
      setFeelslike(data.feelslike);
    }
  }, [data]);

  const clearAll = () => {
    setLocation("");
    setDate("");
    setCondition("");
    setTemp("");
    setFeelslike("");
  };

  return (
    <div className="app-wrapper">
      <h1 className="title">Weather Check Mini Project</h1>

      <div className="input-section">
        <div className="input-group">
          <label>Search Location:</label>
          <input type="text" value={location} onChange={handleLocation} />
        </div>

        <div className="input-group">
          <label>Select Date:</label>
          <input type="date" value={date} onChange={handleDate} />
        </div>
      </div>

      <div className="button-group">
        <button className="btn check" onClick={fetchWeather}>
          Check Weather
        </button>
        <button className="btn clear" onClick={clearAll}>
          Clear
        </button>
      </div>

      <div className="weather-display">
        <h2>Condition: {condition}</h2>
        <h2>Temperature: {temp}</h2>
        <h2>Feels Like: {feelslike}</h2>
      </div>
    </div>
  );
};

export default App;
