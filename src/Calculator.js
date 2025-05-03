import React, { useState, useEffect } from "react";

export default function Calculator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const handleCalculate = () => {
    try {
      const evalResult = eval(input);
      setResult(evalResult);
    } catch {
      setResult("Error");
    }
  };

  const handleKeyDown = (event) => {
    const { key } = event;
  
    if (/[0-9+\-*/.]/.test(key)) {
      setInput((prev) => prev + key);
    } else if (key === "Enter") {
      handleCalculate();
    } else if (key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    } else if (key === "Escape") {
      handleClear();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div style={{ maxWidth: 300, margin: "2rem auto", padding: 20, border: "1px solid #ccc", borderRadius: 10 }}>
      <h2>My Calculator</h2>
      <input
        type="text"
        value={input}
        readOnly
        style={{ width: "100%", marginBottom: 10, fontSize: 18 }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {["7", "8", "9", "/",
          "4", "5", "6", "*",
          "1", "2", "3", "-",
          "0", ".", "=", "+"].map((char) =>
          char === "=" ? (
            <button key={char} onClick={handleCalculate}>{char}</button>
          ) : (
            <button key={char} onClick={() => handleClick(char)}>{char}</button>
          )
        )}
        <button style={{ gridColumn: "span 4" }} onClick={handleClear}>Clear</button>
      </div>
      {result !== "" && (
        <div style={{ marginTop: 10, fontSize: 20 }}>
          Result: {result}
        </div>
      )}
    </div>
  );
}