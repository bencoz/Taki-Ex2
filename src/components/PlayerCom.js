
import React from "react";
import CardCom from "./CardCom.js";
  
export default class PlayerCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    render() {
        const hand = this.props.cardsList.map((card) =>
            <CardCom key={card.color + card.name + Math.random()}
                     name={card.name}
                     color={card.color}
                     isSpecial={""+card.isSpecial}
                     ownerID={this.props.ownerID}
                     handleClickCard={this.props.handleClickCard}>
            </CardCom>
        );
        return (
            <div className="player-container" >
                <div className="player-cards-container">
                    <ul className="players-cards">
                        {hand}
                    </ul>
                </div>
            </div>
        );
    }
}
