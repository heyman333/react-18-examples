import React, { useState } from "react";

const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=9f0805a80e76e07890c32793f811ab95&lang=kr&units=metric&lat=37.5132612&lon=127.0979449`;

export default function AutomaticBatching18() {
  const [color, setColor] = useState("black");
  const [fontSize, setFontSize] = useState(10);

  const configUITimeout = () => {
    setTimeout(() => {
      setColor(color === "black" ? "red" : "black");
      setFontSize(fontSize + 1);
    }, 1000);
  };

  const configUIfetch = () => {
    fetch(API_URL, { method: "GET" }).then((res) => {
      res.json().then((result) => {
        console.log("result", result);
        setColor(color === "black" ? "red" : "black");
        setFontSize(fontSize + 1);
      });
    });
  };

  //   const configUIflushSync = () => {
  //     flushSync(() => setClickDisabed(true));
  //     setTimeout(() => {
  //       setColor(color === "black" ? "red" : "black");
  //       setFontSize(fontSize + 1);
  //       setClickDisabed(false);
  //     }, 1000);
  //   };

  console.log("AutomaticBatching18 render!");

  return (
    <section>
      <h1>AutomaticBatching18</h1>
      <div>
        <div
          style={{
            display: "inline-block",
            backgroundColor: color,
            fontSize,
            color: "orange",
          }}
        >
          1초 후에 글자크기가 늘어나고 배경색이 바뀝니다!
        </div>
        <button onClick={configUITimeout}>UI 셋팅</button>
      </div>
      <div>
        <div
          style={{
            display: "inline-block",
            backgroundColor: color,
            fontSize,
            color: "orange",
          }}
        >
          데이터를 다 불러오면 글자크기가 늘어나고 배경색이 바뀝니다!
        </div>
        <button onClick={configUIfetch}>UI 셋팅</button>
      </div>
    </section>
  );
}
