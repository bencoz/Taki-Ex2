import React from "react";
import CardCom from "./CardCom.js";

export default class GameObjects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
         
        };
    }

    render() {
        const pile = this.props.pileOfCards.map((card) =>
        <CardCom key={card.color + card.name + Math.random()}
                 name={card.name}
                 color={card.color}
                 isSpecial={""+card.isSpecial}
                 ownerID={this.props.ownerID}
        />
        );
        return (
            <div className="playing-objects-container">
                // EndTurnButton
                <div id="endTurn-button" style={{ display: this.props.endTurnButton }}>
                    {"end turn"} 
            </div>
               
            //PlayerImg
            <div id="currentPlayerImg">
                    <img src="./images/player1.png" alt="playerimg" id="currentPlayerImgNew" ></img>
            </div>
                   
            //Pile Of Cards
            <div className="pile-of-cards-container" id="pileOfCards" >
                        <div className="pile-cards" >
                            {pile}
                        </div>
                    </div>
                    
           //Deck -->
                <div className="deck-container" onClick={this.props.handleDeckClick}>
                    <img src="./images/cards/deckOfCards.png" alt="Deck" className="deck" id="deck"></img>
                </div>
             </div>
        );
    }

   





}


