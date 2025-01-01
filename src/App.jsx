import React, { useState } from "react";
import "./App.css";
import Add from "./Form";
 import MapComponent from "./MapComponent"; // קומפוננטת רשימת מועמדים

function App() {


  return (
    <div className="app">
      <Add/>
      <MapComponent/>
    </div>
  );
}

export default App;