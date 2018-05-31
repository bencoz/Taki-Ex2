import React from "react";

export default class PopUpScore extends React.Component {
    constructor() {
        super();
        this.state = {
            isWin: "0",

        };
    }
    render() {
        return (
            <div id="scorePopup">
                <div className="grid-container">
                    <div className="gridHeader" id="score-popup-header">
                        <div id="winning-popup-text">
                           if (this.state.isWin) {
                               "YOU ARE THE WINNER!"
                           }else{
                               "YOU LOSE!"
                           }
                        </div>
                        <div id="winning-popup-img">
                            <img src="images\winner.svg" alt="winning-img" id="scorePopupImg"></img>
                        </div>
                    </div>
                    <div className="item1 score-first-row">score</div>
                    <div className="item2 score-first-row">Player 1 </div>
                    <div className="item3 score-first-row">Player 2</div>
                    <div className="item4">
                        <div> Reached last card</div>
                        <div>Moves</div>
                        <div> Average move time</div>
                    </div>
                    <div className="item5">
                        <div id="player1astCard"> 0</div>
                        <div id="player1Move"> 0</div>
                        <div id="player1AvgMove"> 00:00:00</div>
                    </div>
                    <div className="item6">
                        <div id="player2astCard"> 0</div>
                        <div id="player2Move"> 0</div>
                        <div id="player2AvgMove"> 00:00:00</div>
                    </div>
                </div>
            </div>
        );
    }
}

