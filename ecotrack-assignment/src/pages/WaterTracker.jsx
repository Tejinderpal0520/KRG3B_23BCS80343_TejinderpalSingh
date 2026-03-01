import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import CounterDisplay from "../components/CounterDisplay";

const WaterTracker = () => {
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(8);
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem("waterCount");
    if (savedCount) {
      setCount(Number(savedCount));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("waterCount", count);
  }, [count]);

  // Fetch Health Tip
  useEffect(() => {
    const fetchTip = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("https://api.adviceslip.com/advice");
        const data = await response.json();
        setTip(data.slip.advice);
      } catch (err) {
        setError("Failed to fetch tip");
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, []);

  // Optimized handlers
  const addWater = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const removeWater = useCallback(() => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  const handleGoalChange = (e) => {
    setGoal(Number(e.target.value));
  };

  return (
    <>
        <Navbar />

        <div className="page">
        <div className="card">
            <h2>Daily Water Tracker</h2>

            <CounterDisplay count={count} goal={goal} />

            <div className="button-group">
            <button className="button-add" onClick={addWater}>+</button>
            <button className="button-remove" onClick={removeWater}>-</button>
            <button className="button-reset" onClick={reset}>Reset</button>
            </div>

            <div>
            <p>Set Daily Goal:</p>
            <input type="number" value={goal} onChange={handleGoalChange} />
            </div>

            {count >= goal && (
            <div className="goal-message">Goal Reached</div>
            )}
        </div>

        <div className="tip-section">
            <h3>Today's Health Tip</h3>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && <p>{tip}</p>}
        </div>
        </div>
    </>
    );
};

export default WaterTracker;