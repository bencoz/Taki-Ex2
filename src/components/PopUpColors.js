import React from "react";

export default class PopUpColors extends React.Component {

    render() {
        return (
            <div id="colorPopup">
                <h1 id="popup-text">
                    choose a color
                </h1>
                <button id="red-button"></button>
                <button id="green-button"></button>
                <button id="yellow-button"></button>
                <button id="blue-button"></button>
            </div>
        );
    }
}
