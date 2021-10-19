import React, { useState } from "react";

export default function AutomaticBatching() {
  const [color, setColor] = useState("black");
  const [fontSize, setFontSize] = useState(10);
  const configUI = () => {
    setColor(color === "black" ? "red" : "black");
    setFontSize(fontSize + 1);
    // 2.위에서 state를 두번 셋팅해주니까 두번 return이 되지 않을까 생각할 수 있습니다.
  };

  // 3.하지만 기존 리액트에서도 18에서도 return은 딱 한번만 발생합니다
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
