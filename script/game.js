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
        var buttonPlay = this._createButton(0, 50, "play");
        this.elm.appendChild(buttonPlay.elm);
        buttonPlay.elm.addEventListener("click", () => {
            this._createCards();
            this._createScore();
            this.canClick = true;
            this.pickCorrect = 9;
            this.cardPicked = [];
            buttonPlay.elm.style.display = "none";
            this.elm.removeChild(buttonPlay.elm)
        })
    }

    _createBackGround() {
        this.x = 200;
        this.y = 70;
        this.width = 600;
        this.height = 600;
        this.elm.style.backgroundSize = "cover"
        this.elm.style.backgroundImage = "url(./images/trucxanh_bg.jpg)";
    }

    _createCards() {
        this.song = new Audio("./sound/music.mp3")
        this.song.play();
        this.tl = gsap.timeline();
        for (var i = 0; i < 20; i++) {
            // Tải lên lần đầu thì tạo mới card 
            var card = this.children[i] ? this.children[i] : new Card(i);
            var propertiesCard = {
                "x": 250,
                "y": 250,
                "width": 100,
                "height": 100,
                "scaleX": 1,
            }

            var styleCard = {
                "cursor": "pointer",
                "backgroundSize": "cover",
                "display": "block",
                "zIndex": 0,
                "transform": "scale(1)"
            }
            Object.assign(card, propertiesCard);
            Object.assign(card.elm.style, styleCard);
            card.sprite.elm.style.borderRadius = "15px";
            card.cover.elm.style.borderRadius = "15px";
            card.cover.elm.style.display = "block";
            card.setValue(i % 10);
            // animation fadein
            this.tl.from(card, { x: 250, y: 250, opacity: 0, duration: 0.08 })
                .from(card.cover.elm, { display: "none", duration: 0.08 });
            // Nếu reset lại game thì không add card vào this.children và không add event cho card nữa
            if (this.children[i]) continue;
            card.elm.addEventListener("click", this.onClickCard.bind(this, card));
            this.addChild(card)

        }
        this.tl.play();
        this.tl.call(() => { this._divideCard() });
    }

    _waffleCard() {
        this.arrImage = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]
        this.arrImage.sort(() => {
            return 0.5 - Math.random();
        });
        console.log(this.children);
    }

    _createScore() {
        this.score = new Label();
        var propertiesScore = {
            "x": 0,
            "y": 0,
            "text": "10000",
            "color": "red",
            "fontSize": 30
        }
        Object.assign(this.score, propertiesScore)
        this.addChild(this.score)
    }

    onClickCard(card) {
        this.song.src = "./sound/shot.mp3"
        if (!this.canClick) return;

        if (this.cardPicked.length == 1 && this.cardPicked[0].index === card.index) return;
        if (this.cardPicked[0] === undefined) {
            this.cardPicked[0] = card;
            this.song.play();
            card.open();
            return;
        }
        card.open();
        this.canClick = false;
        this.song.play();
        setTimeout(() => {
            this.cardPicked[1] = card
            this.compareCard(this.cardPicked[0], this.cardPicked[1]);
        }, 1000)
    }

    compareCard(fistCard, secondCard) {
        
        var score = Number(this.score.text);
        if (fistCard.value === secondCard.value) {
            this.song.src = "./sound/break.mp3";
            setTimeout(()=>{this.song.play()},600) 
            score = score + 1000;
            this.tl.play();
            this.pickCorrect++;
            this._loadScore(score)
            this.removeChild(fistCard)
            this.removeChild(secondCard);
            
            if (this.pickCorrect == 10) this.resetGame()
        } else {
            this.song.src = "./sound/death.mp3";
            setTimeout(() => {this.song.play()},1200)
            score = score - 500;
            this._loadScore(score)
            fistCard.close();
            secondCard.close();
            
            if (score == 0) this.resetGame()
        }
        setTimeout(() => { this.canClick = true; }, 1600)
        this.cardPicked = [];
    }

    resetGame() {
        var stateGame = new Label();
        var propertiesStateGame = {
            "x": 0,
            "y": 0,
            "width": 600,
            "height": 600,
        }
        var styleStateGame = {
            "backgroundColor": "rgba(255, 255, 255, 0.5)",
            "zIndex": 0.5
        }
        Object.assign(stateGame, propertiesStateGame);
        Object.assign(stateGame.elm.style, styleStateGame);
        this.addChild(stateGame);

        var buttonReset = this._createButton(0, 50, "Play Again");
        buttonReset.elm.addEventListener("click", () => {
            stateGame.elm.style.display = "none";
            this.score.text = "10000";
            this.pickCorrect = 9;
            this._createCards();
            this.elm.removeChild(stateGame.elm);
        });
        stateGame.addChild(buttonReset);
        
    }

    _divideCard() {
        var arrCards = this.children;
        for (var i = arrCards.length - 1; i >= 0; i--) {
            if (arrCards[i] instanceof Label) continue;
            console.log(arrCards[i]);
            let col = i % 5;
            let row = Math.floor(i / 5);
            var x = col * 120 + 10;
            var y = row * 120 + 100;
            TweenMax.to(arrCards[i], 0.5, { ease: Back.easeOut.config(6), x: x, y: y, delay: (19 - i) * 0.2 });
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

    _createButton(top, left, textLable) {
        var button = new Label();
        var styleButton = {
            "borderRadius": "5px",
            "backgroundColor": "orange",
            "cursor": "pointer",
        }

        var propertiesButton = {
            "x": top,
            "y": left,
            "text": textLable
        }
        Object.assign(button.elm.style, styleButton);
        Object.assign(button, propertiesButton)
        button.elm.addEventListener("mouseover", () => {
            button.elm.style.backgroundColor = "aliceBlue"
        })
        button.elm.addEventListener("mouseout", () => {
            button.elm.style.backgroundColor = "orange"
        })
        return button;
    }
}

let game = new Game();
document.body.appendChild(game.elm);