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
            card.setValue(i % 10);
            card.close();
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
            this._flipCard(card, card.open.bind(card))
        } else {
            this._flipCard(card, card.open.bind(card))
            this.canClick = false;
            setTimeout(() => {
                this.cards[1] = card
                this.compareCard(this.cards[0], this.cards[1]);
            }, 3000)
        }
    }

    compareCard(fistCard, secondCard) {
        var score = Number(this.score.text);
        if (fistCard.value === secondCard.value) {
            score = score + 1000;
            this.tl.play();
            this.pickCorrect++;
            this._loadScore(score)
            if (this.pickCorrect == 10) this.resetGame("WIN")
            this._disapearCard(fistCard);
            this._disapearCard(secondCard);
        } else {
            score = score - 500;
            this._loadScore(score)
            this._flipCard(fistCard, fistCard.close.bind(fistCard));
            this._flipCard(secondCard, secondCard.close.bind(secondCard));
            if (Number(this.score.text) == 0) this.resetGame("LOSE")
        }
        this.canClick = true;
        this.cards = [];
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
            document.getElementsByTagName("div")[0].innerHTML = "";
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
        for (var i = arrCards.length - 1 ; i >= 0; i--) {
            let col = i % 5;
            let row = Math.floor(i / 5);
            var x = col * 120 + 10;
            var y = row * 120 + 100;
            this.tl.to(arrCards[i], { ease: Back.easeOut.config(6), x: x, y: y, duration: 0.1 });
        }
    }

    _flipCard(card, status) {
        console.log(status)
        this.tl = gsap.timeline({ paused: true });
        this.tl.to(card.sprite, { scaleX: 0, duration: 0.8 });
        this.tl.to(card.Label, { opacity: 0, duration: 0.8 });
        this.tl.call(() => {
            status();
        })
        this.tl.to(card.sprite, { scaleX: 1, duration: 0.8 });
        this.tl.to(card.Label, { opacity: 1, duration: 0.8 });
        this.tl.play();
    }

    _disapearCard(secondCard) {
        console.log(secondCard.sprite)
        secondCard.sprite.elm.style.zIndex = 1;
        this.tl = gsap.timeline({ paused: true });
        this.tl.to(secondCard.sprite, { scale: 1, duration: 1 });
        this.tl.to(secondCard.sprite, { scale: 2, duration: 1 });
        this.tl.play();
        this.tl.call(() => {
            this.removeChild(secondCard);
        })
    }

    _loadScore(score) {
        console.log(score,this.score.text)
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
