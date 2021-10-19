// 1.새로운 리액트버전에서도 동작하는 AutomaticBatch

import React, { useState } from "react";
import { flushSync } from "react-dom";

const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=9f0805a80e76e07890c32793f811ab95&lang=kr&units=metric&lat=37.5132612&lon=127.0979449`;

export default function AutomaticBatching18() {
  const [color, setColor] = useState("black");
  const [fontSize, setFontSize] = useState(10);

  // 2.아까랑 다르게 뒤에 콜백이 하나더 있다
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

  const configUIflushSync = () => {
    setTimeout(() => {
      // 4. 기존의 방법대로 render를 해주려면 flushSync를 사용한다
      flushSync(() => setColor(color === "black" ? "red" : "black"));
      setFontSize(fontSize + 1);
    }, 1000);
  };

  // 3. 기존의 리액트는 모두 두번 return이 되지만 18에서는 한번만 된다.
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
      <div>
        <div
          style={{
            display: "inline-block",
            backgroundColor: color,
            fontSize,
            color: "orange",
          }}
        >
          기존의 React처럼 움직입니다
        </div>
        <button onClick={configUIflushSync}>UI 셋팅</button>
      </div>
    </section>
  );
}
