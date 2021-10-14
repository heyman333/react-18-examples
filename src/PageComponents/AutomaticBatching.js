import React, { useState } from "react";

export default function AutomaticBatching() {
  const [color, setColor] = useState("black");
  const [fontSize, setFontSize] = useState(10);
  const configUI = () => {
    setColor(color === "black" ? "red" : "black");
    setFontSize(fontSize + 1);
  };

  console.log("AutomaticBatching render!");

  return (
    <section>
      <h1>AutomaticBatching</h1>
      <div
        style={{
          display: "inline-block",
          backgroundColor: color,
          fontSize,
          color: "orange",
        }}
      >
        글자크기가 늘어나고 배경색이 바뀝니다!
      </div>
      <button onClick={configUI}>UI 셋팅</button>
    </section>
  );
}
