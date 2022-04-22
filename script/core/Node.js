export class Node { // entity

    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._opacity = 1;
        this.elm = this._createElement();
        this.children = [];
    }

    set opacity(opacity) 
    {
        this._opacity = opacity
        this.elm.style.opacity = this._opacity;
    }


    get opacity(){return this._opacity}
    set opacity(opacity) 
    {
        this._opacity = opacity
        this.elm.style.opacity = this._opacity;
    }

    get x() { return this._x; }
    set x(value) {
        this._x = value;
        this.elm.style.left = this._x + "px";
    }

    get y() { return this._y; }
    set y(value) {
        this._y = value;
        this.elm.style.top = this._y + "px";
    }

    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
        this.elm.style.width = this._width + "px";
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        this.elm.style.height = this._height + "px";
    }

    _createElement() {
        let elm = document.createElement("div");
        elm.style.position = "absolute";
        return elm;
    }

    addChild(node) {
        this.elm.appendChild(node.elm);
        this.children.push(node);
    }
    removeChild(node) {
        let index = this.children.indexOf(node);
        if (index === -1) return;

        this.elm.removeChild(node.elm);
        this.children.splice(index, 1);
    }

}
