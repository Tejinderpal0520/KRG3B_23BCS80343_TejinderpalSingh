import React from "react";

const CounterDisplay = ({ count, goal }) => {
  console.log("CounterDisplay Rendered");

  return (
    <div className="progress-text">
      {count} / {goal} glasses completed
    </div>
  );
};

export default React.memo(CounterDisplay);