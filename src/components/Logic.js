export default class Logic {
    constructor(){
    }
    isMoveValid(topCard, playCard){
        if (topCard.color == playCard.color){
            return true;
        }else if (topCard.name == playCard.name){
            return true
        } else if (topCard.name == 'changecolor'  ){
            var pileColor = document.querySelector("#pileOfCards").style.background;
            if (pileColor == playCard.color){
                return true;
            }

        }else if (playCard.name =='changecolor' || (playCard.name == 'taki' && playCard.color == 'colorul')){
            return true;
        } else {
            return false;
        }
    }
    canPlayerPlay(topCard, cards){
        var result = false;
        for (var i = 0; i < cards.length; i++) {
            result = this.isMoveValid(topCard, cards[i])
            if (result == true){
                break;
            }
        }
        return result;
    }
    canPlayerPlayTaki(cards, takiColor){
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].color == takiColor){
                return true;
            }
        }
        return false;
    }
    cardPlayed(card, gameManger){ 
        //this function is binded by the gameManger on init.
        var reset;
        switch (card.name){
            case '2plus':
                if (gameManger.cardsToTake == 1)
                    gameManger.cardsToTake++;
                else
                    gameManger.cardsToTake += 2;
                reset = false;
                break;
            case 'stop':
                if (gameManger.turnsToMove == 1){ // in Multiplayer (gameManger.turnsToMove != 0)
                    gameManger.turnsToMove++;
                }
                reset = false;

                break;
            case 'plus':
                gameManger.turnsToMove = 0;
                reset = false;
                break;
            case 'changecolor':
				gameManger.gamePaused = true;
                gameManger.UI.popUpShow(gameManger.colorButtonClick.bind(gameManger));
                break;
            case 'taki':
                if (card.color == 'colorful'){
                    var topCard = gameManger.state.pileOfCards[0];
                    card.color = topCard.color;
                }
                gameManger.setTakiMode(true, card.color);
                break;
            default:
                if (!gameManger.takiMode)
                    reset = true;
                break;
        }
        gameManger.setState({
            needReset: reset
        })
    }
}
