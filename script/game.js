import { Node } from "./core/Node.js";
import { Sprite } from "./core/Sprite.js";
import { Card } from "./components/Card.js";
import { Label } from "./core/Label.js";

class Game extends Node {
    constructor() {
        super();
        this._init();
    }

    _init() {
        this._createBackGround();
        this._createCards();
        this._createScore();
        this.canClick = true;
        this.pickCorrect = 0;
    }

    _createBackGround() {
        this.cards = [];
        this.x = 0;
        this.y = 0;
        this.width = 600;
        this.height = 600;
        this.elm.style.backgroundImage = "url(../../images/trucxanh_bg.jpg)";
    }

    _createCards() {
        this.arrImage = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]
        //this._waffleCard();
        for (var i = 0; i < 20; i++) {
            var card = new Card(i);
            let col = i % 5;
            let row = Math.floor(i / 5);
            card.x = col * 120 + 10;
            card.y = row * 120 + 100;
            card.setValue(this.arrImage[i]);
            card.close();
            card.elm.addEventListener("click", this.onClickCard.bind(this, card));
            this.addChild(card)
        }
    }

    _waffleCard() {
        this.arrImage.sort(() => {
            return 0.5 - Math.random();
        });
    }

    _createScore() {
        this.score = new Label();
        this.score.x = 0;
        this.score.y = 0;
        this.score.text = "10000";
        this.score.color = "red";
        this.score.fontSize = 30
        this.addChild(this.score)
    }

    onClickCard(card) {
        if (!this.canClick) return;

        if (this.cards.length == 1 && this.cards[0].index === card.index) return;
        this.animationCard(card);
        if (this.cards[0] === undefined) {
            this.cards[0] = card;
            card.open();
        } else {
            card.open();
            this.canClick = false;
            setTimeout(() => {
                this.cards[1] = card
                this.compareCard(this.cards[0], this.cards[1]);
            }, 500)
        }
    }

    compareCard(fistCard, secondCard) {
        if (fistCard.value === secondCard.value) {
            this.removeChild(fistCard)
            this.removeChild(secondCard)
            this.score.text = (Number(this.score.text) + 1000) + "";
            this.pickCorrect++;
            if (this.pickCorrect == 10) this.resetGame("WIN")
        } else {
            fistCard.close();
            secondCard.close();
            this.score.text = (Number(this.score.text) - 500) + "";
            if (Number(this.score.text) == 0) this.resetGame("LOSE")
        }
        this.canClick = true;
        this.resetAnimation(this.cards[0], this.cards[1]);
        this.cards = [];
    }

    animationCard(card) {
        card.elm.style.transform = "rotatey(180deg)";
        card.x = card.x + 100;
        card.elm.style.transition = "0.3s";
    }

    resetAnimation(card1, card2) {
        card1.elm.style.transform = "";
        card1.x = card1.x - 100;
        card2.elm.style.transform = "";
        card2.x = card2.x - 100;
    }

    resetGame(state) {
        var stateGame = new Label();
        stateGame.x = 0;
        stateGame.y = 0;
        stateGame.width = 600;
        stateGame.height = 600;
        stateGame.elm.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        stateGame.elm.style.zIndex = 0.5;
        this.addChild(stateGame);

        this.statusGame(state);
        var buttonReset = this.buttonReset();
        stateGame.addChild(buttonReset);
    }

    statusGame(state) {
        this.score.text = state;
        this.score.elm.style.color = "red";
        this.score.elm.style.fontStyle = "bold";
        this.score.elm.style.zIndex = 1;
        this.score.fontSize = 100;
        this.score.elm.style.transition = "3s"
    }
    buttonReset() {
        var buttonReset = new Label();
        buttonReset.x = this.width / 2;
        buttonReset.y = this.height / 2;
        buttonReset.text = "RE-play";
        buttonReset.elm.style.borderRadius = "5px";
        buttonReset.elm.style.backgroundColor = "orange";
        buttonReset.elm.style.cursor = "pointer";
        buttonReset.elm.addEventListener("click", () => {
            this.score.text = "10000";
            this.score.fontSize = 30;
            this.score.elm.style.transition = "0.5s"
            setTimeout(() => {
                document.getElementsByTagName("div")[0].innerHTML = "";
                this._init();
            }, 500)
        });
        buttonReset.elm.addEventListener("mouseover", () => {
            buttonReset.elm.style.backgroundColor = "aliceBlue"
        })
        buttonReset.elm.addEventListener("mouseout", () => {
            buttonReset.elm.style.backgroundColor = "orange"
        })
        return buttonReset;
    }
}

let game = new Game();
document.body.appendChild(game.elm);
