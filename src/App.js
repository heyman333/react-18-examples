import React from "react";
import { AutomaticBatching } from "./PageComponents";
import { AutomaticBatching18 } from "./PageComponents";
import { SuspenseUI } from "./PageComponents";
import { Transition } from "./PageComponents";

const App = () => {
  return (
    <>
      <AutomaticBatching></AutomaticBatching>
      <AutomaticBatching18></AutomaticBatching18>
      <SuspenseUI></SuspenseUI>
      <Transition></Transition>
    </>
  );
};

export default App;
