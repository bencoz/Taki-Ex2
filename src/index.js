import React from 'react';
import ReactDOM from 'react-dom';
import "./style.css";

import GameObjects from "./components/GameObjects.js";
import PlayerCom from "./components/PlayerCom.js";
import StatisticsBar from "./components/StatisticsBar.js";

import App from "./components/App.js";
/* Directly adding react element */

ReactDOM.render(
    <App />, 
    document.getElementById("root")
);