import React from "react";

function Button({ label = "Submit", onClick }) {
  return (
    <button onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;