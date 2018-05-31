import React from "react";

import TopBar from "./TopBar.js";
import GameObjects from "./GameObjects.js";
import PlayerCom from "./PlayerCom.js";
import StatisticsBar from "./StatisticsBar.js";
import PopUpColors from "./PopUpColors.js";
import PopUpScore from "./PopUpScore.js";


export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currPlayerId: "0",
            pileList: [],
            player1CardList: [],
            player2CardList: [],
            colorPopupDisplay: "none",
            scoreBoardDisplay: "none",
            endTurnButton: "none"
        };
    }

   

    render() {
        return (
            <div>
            console.log(this.props);
                <TopBar startButtonClickHandle={this.props.startGame}/>
                <PlayerCom id="playerContainer2" cardsList={this.props.Players[1].cards} ownerID={2} ></PlayerCom>
                <GameObjects pileOfCards={this.props.pileOfCards} endTurnButton={this.state.endTurnButton} ></GameObjects>
                <PlayerCom id="playerContainer1" cardsList={this.props.Players[0].cards} handleClickCard={this.props.handleClickCard} ownerID={1}/>
                <PopUpColors style={{ display : this.state.colorPopupDisplay}}></PopUpColors>
                <PopUpScore style={{ display: this.state.scoreBoardDisplay }}></PopUpScore>
                <StatisticsBar > </StatisticsBar >
            </div>
        );
    }

    addCardToPile(card, playerId) {
        var div = document.createElement("div");
        //using the old li
        if (playerId != undefined) {
            var color = (card.name == 'changecolor') ? 'colorful' : card.color;
            div = this.getCardFromPlayer(color + card.name, playerId);
        }
        //creating a new div
        else {
            div.className = "card";
            div.setAttribute("data-ownerID", playerId);
            var url = "url(images/cards/" + card.name + "_" + card.color + ".png)";
            div.style.backgroundImage = url;
            div.setAttribute("id", card.color + card.name);
        }
        this.moveCardToPile(div);
    }
    moveCardToPile(cardDiv) {
        //var targetId = document.querySelector("#pileOfCards .pile-cards");
        var newPile = this.state.pileList;
        var rotateNum = Math.floor(Math.random() * Math.floor(360));
        var randomLeft = Math.floor(Math.random() * Math.floor(25)) + 20;
        var randomTop = Math.floor(Math.random() * Math.floor(25)) + 2;
        cardDiv.style.transform = 'rotate(' + rotateNum + 'deg)';
        cardDiv.style.position = 'absolute';
        cardDiv.style.top = randomTop + 'px';
        cardDiv.style.left = randomLeft + '%';
        newPile.appendChild(cardDiv);
        this.setState({
            pileList: newPile
        })

    }
    getCardFromPlayer(cardId, playerId) {
        let div;
        let currCardList;
        var cardLI;
       // var queryText = '#playerContainer' + playerId + ' .players-cards';
        //var list = document.querySelector(queryText);
       // queryText = '#' + cardId;
        if (playerId ==1) {
            currCardList= this.state.player1CardList;
       } else {
           currCardList= this.state.player2CardList;
       } 
        for (let i = 0; i < currCardList.length; i++) {
            if (currCardList[i].id == cardId) {
                cardLI = currCardList[i];
                currCardList.splice(i, 1);
                if (playerId == 1) {
                    this.setState({
                        player1CardList: currCardList
                    })
                } else {
                    this.setState({
                        player2CardList:currCardList
                    })
                } 
             
          } else {
              console.log("card not found")
          }
           
       }
        /*var cardLI = list.querySelector(queryText);
        var index = this.getCardIndexFromUL(list.childNodes, cardId);
        if (index != null) {
            div = this.createCardDIVElemFromLI(playerId, cardLI)
            list.removeChild(list.childNodes[index]);
        }
        else {
            //throw new exception...
        }*/
        div = this.createCardDIVElemFromLI(playerId, cardLI);
        return div;
    }
    getCardIndexFromUL(childNodes, cardID) {
        for (var i = 1; i < childNodes.length; i++) {
            if (childNodes[i].getAttribute("id") == cardID)
                return i;
        }
        return null
    }
    createCardDIVElemFromLI(playerId, cardLI) {
        var isSpecial, name, color;
        isSpecial = cardLI.getAttribute("data-cardIsSpecial");
        name = cardLI.getAttribute("data-cardName");
        color = cardLI.getAttribute("data-cardColor");
        var div = document.createElement("div");
        div.className = "card";
        div.setAttribute("data-ownerID", playerId);
        div.setAttribute("data-cardIsSpecial", isSpecial);
        //var span = document.createElement("span");
        var url = "url(images/cards/" + name + "_" + color + ".png)";
        div.style.backgroundImage = url;
        div.setAttribute("id", color + name);
        //li.appendChild(span);
        return div;
    }

    addCardToPlayer(playerId, card, callBack) {
        var targetId = document.querySelector('#playerContainer' + playerId + " .players-cards");
        let newCards;
        if (playerId == 1) {
            newCards = this.state.player1CardList;
            var li = this.createCardLIElem(playerId, card, callBack);
            newCards.appendChild(li);
            this.setState({
                player1CardList: newCards
            })
        } else {
            newCards = this.state.player2CardList;
            var li = this.createCardLIElem(playerId, card, callBack);
            newCards.appendChild(li);
            this.setState({
                player2CardList: newCards
            })
        }

    }
    createCardLIElem(playerId, card, callBack) {
        var computerID = 2;
        var li = document.createElement("li");
        li.className = "card";
        li.setAttribute("data-ownerID", playerId);
        li.setAttribute("data-cardIsSpecial", card.isSpecial);
        li.setAttribute("data-cardName", card.name);
        li.setAttribute("data-cardColor", card.color);
        //var span = document.createElement("span");
        if (playerId == computerID) {
            var url = "url(images/cards/card_back.png)";
        } else {
            var url = "url(images/cards/" + card.name + "_" + card.color + ".png)";
        }
        li.style.backgroundImage = url;
        li.setAttribute("id", card.color + card.name);
        li.setAttribute("draggable", true);
        //li.setAttribute("click", callBack);
        li.style.cursor = 'pointer';
        li.addEventListener('click', callBack);
        //li.appendChild(span);
        return li;
    }

    //display update
    popUpShow(callback) {
        document.getElementById('popupContainer').style.display = 'block';
        document.getElementById('colorPopup').style.display = "flex";
        document.getElementById('red-button').addEventListener('click', callback);
        document.getElementById('blue-button').addEventListener('click', callback);
        document.getElementById('yellow-button').addEventListener('click', callback);
        document.getElementById('green-button').addEventListener('click', callback);
    }
    hideColorButton() {
        document.getElementById('popupContainer').style.display = 'none';
        document.getElementById('colorPopup').style.display = "none";
    }
    showEndTurnButton(callback) {
        document.getElementById('endTurn-button').style.display = "flex";
        document.getElementById('endTurn-button').addEventListener('click', callback);
    }
    hideEndTurnButton() {
        document.getElementById('endTurn-button').style.display = "none";

    }
    showScoreBoard(winnerId) {
        var img = document.getElementById('scorePopupImg');
        document.getElementById('popupContainer').style.display = 'block';
        img.src = "images/winner.svg";
        var scoreBoard = document.getElementById('scorePopup');
        if (winnerId != 1) {
            document.getElementById('winning-popup-text').innerHTML = "YOU LOST!"
            img.src = "images/loser.svg";
            document.querySelector(".grid-container").style.backgroundColor = 'red';
        }
        scoreBoard.style.display = "inline-block";
        //document.getElementById('scorePopup').addEventListener('click', callback);
    }
    updateScoreBoard(statP1, statP2) {
        var scoreBoard = document.getElementById('scorePopup');
        if (isWinner == 0) {
            document.getElementById('winning-popup-text').innerHTML = "YOU LOST!"
            scoreBoard.style.backgroundColor = red;
        }
        scoreBoard.style.display = "inline-block";
        //document.getElementById('scorePopup').addEventListener('click', callback);
    }
    hideScoreBoard() {
        document.getElementById('scorePopup').style.display = "none";

    }
}
