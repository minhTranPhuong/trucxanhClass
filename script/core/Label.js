import { Node } from "./Node.js";

export class Label extends Node {
    constructor() {
        super();
        this._text = "";
        this._fontSize = 20;
        this._color = "";
        this._fontStyle = "";
        this.__styleLable();
    }

    get text() {
        return this._text;
    }
    set text(value){
        this._text = value;
        this.elm.innerText = value;
    }

    set fontSize(value){
        this._fontSize = value;
        this.elm.style.fontSize = value+"px";
    }

    set fontStyle(value){
        this._fontStyle = value;
        this.elm.style.fontStyle = value;
    }

    set color(value){
        this._color = value;
        this.elm.style.color = value;
    }

    __styleLable(){
        this.elm.style.fontSize = this._fontSize+"px";
        this.elm.style.fontFamily = "tahoma";
        this.elm.style.color = "white";
        this.elm.style.fontStyle = "bold"
    }
}