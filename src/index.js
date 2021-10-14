import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

// react18에서는 render를 쓰지 않습니다.
// ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
