import React, { useState } from "react";
import Button from "./components/Button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter App</h1>
      <p data-testid="count-value">{count}</p>
      <Button
        label="Increment"
        onClick={() => setCount(count + 1)}
      />
    </div>
  );
}

export default App;