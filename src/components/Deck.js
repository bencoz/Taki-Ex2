export default class Deck {
    constructor() {
        this.getAllCardsBack
        this.cards = [];
        this.setCardsRetrive = function (callback) {
            this.getAllCardsBack = callback;
        }
    }
    createDeck() {
        let names = ['1', '3', '4', '5', '6', '7', '8', '9', 'plus', 'stop', 'taki'];
        let colors = ['blue', 'green', 'yellow', 'red'];
        for (let s = 0; s < colors.length; s++) {
            for (let n = 0; n < names.length; n++) {
                if (names[n] == 'taki' || names[n] == 'stop' || names[n] == 'plus' || names[n] == '2plus') {
                    this.cards.push({ name: names[n], color: colors[s], isSpecial: true});
                    this.cards.push({ name: names[n], color: colors[s], isSpecial: true });
                } else {
                    this.cards.push({ name: names[n], color: colors[s], isSpecial: false });
                    this.cards.push({ name: names[n], color: colors[s], isSpecial: false });
                }
            }
        }
        //for (let i = 0; i < 2; i++)
        //        this.cards.push(new Card('taki', 'colorful', true));
        for (let i = 0; i < 4; i++)
            this.cards.push({ name: "changecolor", color: "colorful", isSpecial: true });
    }
    getStartingCards(numOfCards) {
        let cards = [];
        for (var i = 0; i < numOfCards; i++) {
            cards.push(this.getCard());
        }
        return cards;
    }

    getCard() {
        var card = this.cards.pop();
        if (this.cards.length <= 0) {
            //this.cards = this.getAllCardsBack();
        }
        return card;
    }
    returnCard(card) {
        this.cards.push(card);
    }
    fillEmptyDeck(cards) {
        this.cards = cards;
    }

    shuffle() {
        var i = this.cards.length, j, temp;
        while (--i > 0) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.cards[j];
            this.cards[j] = this.cards[i];
            this.cards[i] = temp;
        }
    }

}