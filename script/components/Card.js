import { Node } from "../core/Node.js";
import { Sprite } from "../core/Sprite.js";
import { Label } from "../core/Label.js";

export class Card extends Node {
    constructor(index) {
        super();
        this.index = index;
        this.value = null;
        this._scaleX = 0; 
        this._scale = 1;
        //this.elm.style.transform = "scaleX(1)";
        this._createSprite();
        this._createCover();
        this._createLabel();
    }

    get scaleX() {
        return this._scaleX;
    }

    set scaleX(value) {
        this._scaleX = value;
        this.elm.style.transform = `scaleX(${value})`;
    }

    get scale() {
        return this._scaleX;
    }

    set scale(value) {
        this._scale = value;
        this.elm.style.transform = `scale(${value})`;
    }

    _createSprite() {
        this.sprite = new Sprite();
        this.sprite.width = 100;
        this.sprite.height = 100;
        this.addChild(this.sprite);
    }
    _createCover() {
        let cover = new Node();
        cover.width = 100;
        cover.height = 100;
        cover.elm.style.backgroundColor = "orange";
        cover.elm.style.border = "solid 1px blue";
        this.cover = cover;
        this.addChild(this.cover);
    }
    _createLabel() {
        this.Label = new Label;
        this.Label.text = this.index+1;
        this.Label.x = 40;
        this.Label.y = 40;
        this.addChild(this.Label);
    }
    setValue(value) {
        this.value = value;
        this.sprite.path = "./images/trucxanh" + value + ".jpg";
    }
    open() {
        this.tl = gsap.timeline({ paused: true });
        this.tl.to(this, { scaleX: 0, duration: 0.4 });
        this.tl.call(() => {
            this.cover.elm.style.display = "none";
        })
        this.tl.to(this, { scaleX: 1, duration: 0.4 });
        this.tl.play();
    }
    close() {
        this.elm.style.transform = "scaleX(1)";
        this.tl = gsap.timeline({ paused: true });
        this.tl.to(this, { scaleX: 0, duration: 0.4 , delay: 0.8 });
        this.tl.call(() => {
            this.cover.elm.style.display = "block";
        })
        this.tl.to(this, { scaleX: 1, duration: 0.4 });
        this.tl.play();
    }
    hide() {
        //this.elm.removeChild(this);
        this.elm.style.display = "none";
    }
}
