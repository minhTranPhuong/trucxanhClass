import { Node } from "./Node.js";
export class Sprite extends Node {
    constructor() {
        super();
        this._path = "";
        this._scaleX = 1;
        this._scale = 1;
    }

    get scaleX(){
        return this._scaleX;
    }
    set scaleX(value){
        this._scaleX = value;
        this.elm.style.transform = `scaleX(${this._scaleX})`;
    }

    get scale(){
        return this._scaleX;
    }
    set scale(value){
        this._scale = value;
        this.elm.style.transform = `scale(${this._scale})`;
    }

    get path(){
        return this._path;
    }
    set path(value){
        this._path = value;
        this.elm.src = this._path;
    }
    _createElement(){
        let elm = document.createElement("img");
        elm.style.position = "absolute";
        return elm;
    }
}