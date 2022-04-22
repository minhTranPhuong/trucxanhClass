import { Node } from "../core/Node.js";
import { Sprite } from "../core/Sprite.js";
import { Label } from "../core/Label.js";

export class Card extends Node {
    constructor(index) {
        super();
        this.index = index;
        this.value = null;
        this._createSprite();
        this._createCover();
        this._createLabel();
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
        this.addChild(this.Label);
    }
    setValue(value) {
        this.value = value;
        this.sprite.path = "http://127.0.0.1:5500/images/trucxanh" + value + ".jpg";
    }
    open() {
        console.log(this)
        this.cover.elm.style.display = "none";
    }
    close() {
        this.cover.elm.style.display = "block"
    }
    hide() {
        //this.elm.removeChild(this);
        this.elm.style.display = "none";
    }
}
