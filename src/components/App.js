import React from "react";

import Player from "./Player.js";
import Computer from "./Computer.js";
import Deck from "./Deck.js";
import Board from "./Board.js";
import Logic from './Logic.js';
import { ENGINE_METHOD_DIGESTS } from "constants";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.gameRules;
        this.logic = new Logic();
        this.cardsToTake = 1;
        this.turnsToMove = 1;

        this.state = {
            numOfPlayers: 1,
            numOfBots: 1,
            numOfPlayerCards: 8,
            startTurnTime: 0,
            takiMode: false, 
            activeFilter :false ,
            cardColorFilter: null,
            needReset :false,
            gamePaused: false,
            Players: [],
            currentPlayerIDTurn:1,
            deck: null,
            pileOfCards: [],
            colorPopupDisplay: "none",
            scoreBoardDisplay: "none",
            endTurnButton: "none"
        };
    }

    componentWillMount(){
        this.init();
    }

    init(){
        let newDeck = new Deck();
        newDeck.createDeck();
        newDeck.shuffle();
        let newPlayers = this.setPlayers();
        this.setDeckCallBack(newDeck);
        //this.setGameRules();
        this.setState({
            Players : newPlayers,
            deck: newDeck
        })
    }

    startGame(){
        this.dealFirstCards();
        this.drawFirstCard();
    }

    drawFirstCard(){
        var card = this.state.deck.getCard();
        card.isActive = false;
        while (card.color == 'colorful'){ // we dont start with a colorful card
            this.state.deck.returnCard(card);
            this.state.deck.shuffle();
            card = this.state.deck.getCard();
        }
        let pile = this.state.pileOfCards;
        pile.push(card);
        //TODO:: MAKE THE FUNCTION BELLOW WORK IN REACT
        //this.UI.addCardToPile(card);
        this.setState({
            startTurnTime: Date.now(),
            pileOfCards: pile
        })
    }

    setGameRules(){
        this.gameRules = this.logic.cardPlayed.bind(this)
    }

    setDeckCallBack(deck) {
        //deck.setCardsRetrive(this.emptyPileResetAndReturnToDeck.bind(this));
    }

    setPlayers() {
        var playersCopy=[];
        for (var i = 0; i < this.state.numOfPlayers; i++) {
            playersCopy.push(new Player(i + 1));
        }
        for (var i = this.state.numOfPlayers; i < this.state.numOfPlayers+this.state.numOfBots; i++){
            playersCopy.push(new Computer(i + 1));
        }
        return playersCopy;
    }

    dealFirstCards() {
        var playersCopy = this.state.Players;
        for (var i = 0; i < this.state.numOfPlayers + this.state.numOfBots; i++) {
            var cards = this.state.deck.getStartingCards(this.state.numOfPlayerCards);
            for (var j = 0; j < this.state.numOfPlayerCards; j++) {
                playersCopy[i].addCard(cards[j]);
            }
        }
        this.setState({
            Players: playersCopy
        })
    }

    checkIfGameWasPaused(event){
        if (this.gamePaused){
            return true;
        } else if (event){
            if (event.currentTarget){
                if (event.currentTarget.id == 'colorPopup'){
                    return true;
                }
            } else{
                return false;
            }
        } else {
            return false;
        }
    }

    onTakeCard(event){
        if (this.checkIfGameWasPaused(event)){
            return;
        }
        let playerId = this.state.currentPlayerIDTurn;
        let players = this.state.Players;
        if(this.isPlayerTurn(playerId)){
            var topCard = this.state.pileOfCards[0];
            var playerCards = players[playerId-1].getAllCards();
            if (!this.logic.canPlayerPlay(topCard, playerCards)){
                //loop for taking cards (2plus)
                var card = this.state.deck.getCard();
                players[playerId-1].addCard(card);
                this.state.needReset = true;
                this.setState({
                    Players : players
                })
                if (!(players[playerId-1] instanceof Computer)){
                    this.switchTurns();
                }
            } else {
                alert("You Can Play !");
                //TODO :: tell player he can play !
            }
        } else {
            alert("Not your turn...");
        }
    }

    onClickCard(event) {
        var color = event.target.getAttribute("color");
        var name = event.target.getAttribute("name");
        var playerId = parseInt(event.target.getAttribute("ownerid"));
        var card = this.state.Players[playerId - 1].getCardFromPackByNameAndColor(name, color);
        var cards;

        if (this.isPlayerTurn(playerId)) {
            var topCard = this.state.pileOfCards[0];
            if (this.logic.isMoveValid(topCard, card)) {
                this.logic.cardPlayed(card, this);
                if (card.name == 'changecolor') {
                    return; //once color will be picked game will continue
                }
                //TODO:: MAKE THE FUNCTION BELLOW WORK IN REACT
                //this.moveCardFromPlayerToPile(playerId, card);
                if (this.state.takiMode) {
                    cards = this.Players[playerId - 1].getAllCards();
                    topCard = this.state.pileOfCards[0];
                    if (this.logic.canPlayerPlayTaki(cards, topCard.color)) {
                        return; //let player continue taki...
                    } else {
                        this.setTakiMode(false);
                        this.setState({
                            endTurnButton: "none"
                        })
                    }
                }
                this.switchTurns();
            } else {
                alert("Cant use that card...");
                //TODO :: show that you cant use that card.
            }
        } else {
            alert("Not your turn...");
        }
    }

    setTakiMode(value, color){
        this.setState({
            takiMode: value
        })
        //TODO:: change the command bellow to work in react
        //this.UI.setTakiMode(this.endTurnButtonClick.bind(this),value, color, );
    }

    isPlayerTurn(playerID) {
        return this.state.currentPlayerIDTurn == playerID;
    }
    
    newTurn() {
        var card = this.state.pileOfCards.pop();
        card.isActive = false;
        this.pileOfCards.push(card);
        this.playerFinishedTurn();
        this.setTakiMode(false);
        this.setState({
            startTurnTime: Date.now()
        })
        //todo : this.UI.updateStats(this.Players[0].getStat());
    }

    resetTurn() {
        this.cardsToTake = 1;
        this.turnsToMove = 1;
    }

    switchTurns() {
        var winnerId = this.checkIfAnyWinners();
        if (winnerId != 0) {
            // todo: this.UI.updateScoreBoard(this.Players[0].getStat(), this.Players[1].getStat());
            // todo: this.UI.showScoreBoard(winnerId);
            this.setState({
                gamePaused: true
            })
            return;
        } else {
            this.newTurn();
            if (this.state.needReset) {
                this.resetTurn();
            }
            var playerID = ((this.state.currentPlayerIDTurn - 1 + this.turnsToMove) % (this.state.numOfPlayers + this.state.numOfBots)) + 1;
        
            this.setState({
                currentPlayerIDTurn: playerID
            })
        
            //todo : this.UI.changePlayerImg(playerID);
            if (this.state.Players[playerID - 1] instanceof Computer) {
                //todo: setTimeout(this.makeBotPlay.bind(this), 850);
            }
        }
    }

    checkIfAnyWinners() {
        for (var i = 0; i < this.state.Players.length; i++) {
            if (this.state.Players[i].isFinishedCards()) {
                return i + 1;
            }
        }
        return 0;
    }

    render() {
        return (
            <Board 
                Players = {this.state.Players}
                Deck = {this.state.Deck}
                startGame = {this.startGame.bind(this)}
                handleClickCard={this.onClickCard.bind(this)}
                pileOfCards = {this.state.pileOfCards}
            />
        );
    }
}
