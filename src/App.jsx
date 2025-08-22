import { useState, useEffect } from "react";
import "./App.css";

const API_KEY = "WrFZmlC9LLXLyxSSfuYifDUajbcnueCqJ5qOXhNz"; 
const BASE_URL = "https://api.nasa.gov/planetary/apod";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}?api_key=${API_KEY}&date=${date}`);
        const json = await res.json();
        if (json.error) throw new Error(json.error.message);
        setData(json);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchData();
  }, [date]);

  const prevDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    setDate(d.toISOString().split("T")[0]);
  };

  const nextDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    if (d > new Date()) return;
    setDate(d.toISOString().split("T")[0]);
  };

  return (
  
<div
  className="app"
  style={{
    backgroundColor: "black",
  }}
>
  <div className="starry-bg">
  <div className="stars"></div>
</div>
  <div className="overlay">
    <div className="shooting-star"></div>
    <div className="shooting-star" style={{ animationDelay: "2s", left: "30%" }}></div>
    <div className="shooting-star" style={{ animationDelay: "4s", left: "60%" }}></div>
    <h1 className="title">NASA Space Explorer</h1>

    <div className="date-picker">
    <label>Select Date: </label>
    <input
      type="date"
      max={today}       
      value={date}
      onChange={(e) => setDate(e.target.value)}
    />
  </div>


    {loading && <p className="loading">Loading...</p>}
    {error && <p className="error">{error}</p>}

    {data && (
      <div key={date} className="card fade-slide">
        <img className="space-img" src={data.url} alt={data.title} />
        <h2>{data.title}</h2>
        <p>{data.explanation}</p>
        <p className="date">📅 {data.date}</p>
      </div>
    )}

    <div className="buttons">
      <button onClick={prevDay}>← Previous</button>
      <button onClick={nextDay} disabled={date === today}>
        Next →
      </button>
    </div>
  </div>
</div>

  );
}

export default App;
