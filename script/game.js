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
        this.x = 200;
        this.y = 70;
        this.width = 600;
        this.height = 600;
        this.elm.style.backgroundSize = "cover"
        this.elm.style.backgroundImage = "url(./images/trucxanh_bg.jpg)";
    }

    _createCards() {
        this.arrImage = [];//[0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]
        //this._waffleCard();
        this.tl = gsap.timeline();
        for (var i = 0; i < 20; i++) {
            var card = new Card(i);
            card.x = 250;
            card.y = 250;
            card.width = 100;
            card.height = 100;
            card.elm.style.cursor = 'pointer';
            card.sprite.elm.style.borderRadius = "15px"
            card.cover.elm.style.borderRadius = "15px"
            card.elm.style.backgroundSize = "cover"
            card.scaleX = 1;
            card.setValue(i % 10);
            card.cover.elm.style.display = "block";
            card.elm.addEventListener("click", this.onClickCard.bind(this, card));
            this.addChild(card)
            this.arrImage.push(card);

            this.tl.from(card, { x: 250, y: 250, opacity: 0, duration: 0.08 })
                .from(card.sprite.elm, { zIndex: 1, duration: 0.08 })
        }
        this._divideCard(this.arrImage);
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
        if (this.cards[0] === undefined) {
            this.cards[0] = card;
            card.open();
        } else {
            card.open();
            this.canClick = false;
            setTimeout(() => {
                this.cards[1] = card
                this.compareCard(this.cards[0], this.cards[1]);
            }, 1000)
        }
    }

    compareCard(fistCard, secondCard) {
        var score = Number(this.score.text);
        if (fistCard.value === secondCard.value) {
            score = score + 1000;
            this.tl.play();
            this.pickCorrect++;
            this._loadScore(score)
            if (this.pickCorrect == 10) this.resetGame()
            this.removeChild(fistCard);
            this.removeChild(secondCard);
        } else {
            score = score - 500;
            this._loadScore(score)
            fistCard.close();
            secondCard.close();
            if (Number(this.score.text) == 0) this.resetGame()
        }
        setTimeout(() => { this.canClick = true; }, 1600)
        this.cards = [];
    }

    resetGame() {
        var stateGame = new Label();
        stateGame.x = 0;
        stateGame.y = 0;
        stateGame.width = 600;
        stateGame.height = 600;
        stateGame.elm.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
        stateGame.elm.style.zIndex = 0.5;
        this.addChild(stateGame);

        var buttonReset = this.CreateButtonReset(stateGame);
        stateGame.addChild(buttonReset);
    }

    CreateButtonReset(stateGame) {
        var buttonReset = new Label();
        var styleButton = {
            "borderRadius": "5px",
            "backgroundColor": "orange",
            "cursor": "pointer",
        }
        buttonReset.x = this.width / 2;
        buttonReset.y = this.height / 2;
        buttonReset.text = "RE-play";
        Object.assign(buttonReset, styleButton);
        buttonReset.elm.addEventListener("click", () => {
            stateGame.elm.style.display = "none";
            this.removeAllChild();
            this.removeChild(stateGame);
            this.removeChild(buttonReset);
            this._init();
        });
        buttonReset.elm.addEventListener("mouseover", () => {
            buttonReset.elm.style.backgroundColor = "aliceBlue"
        })
        buttonReset.elm.addEventListener("mouseout", () => {
            buttonReset.elm.style.backgroundColor = "orange"
        })
        return buttonReset;
    }
    _divideCard(arrCards) {
        for (var i = arrCards.length - 1; i >= 0; i--) {
            let col = i % 5;
            let row = Math.floor(i / 5);
            var x = col * 120 + 10;
            var y = row * 120 + 100;
            this.tl.to(arrCards[i], { ease: Back.easeOut.config(6), x: x, y: y, duration: 0.1 });
        }
    }

    _loadScore(score) {
        console.log(score, this.score.text)
        this.tl = gsap.timeline({ paused: true });
        this.tl.to(this.score, {
            text: score, duration: 1, onUpdate: () => {
                this.score.text = Math.floor(Number(this.score.text));
            }
        });
        this.tl.play();
    }
}

let game = new Game();
document.body.appendChild(game.elm);