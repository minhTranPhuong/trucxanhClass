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

    set opacity(opacity) {
        this._opacity = opacity
        this.elm.style.opacity = this._opacity;
    }


    get opacity() { return this._opacity }
    set opacity(opacity) {
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
        node.elm.style.zIndex = 1;
        this.tl = gsap.timeline({ paused: true });
        this.tl.to(node, { scale: 2, duration: 0.8, delay: 1.6 })
            .to(node, { scale: 0, duration: 0.8 });
        this.tl.call(() => {
            let index = this.children.indexOf(node);
            if (index === -1) return;

            this.elm.removeChild(node.elm);
            this.children.splice(index, 1);
        })
        this.tl.play();
    }
    removeAllChild() {
        for (var i = 0; i < this.children.length; i++) {
            console.log(this.children[i]);
            let index = this.children.indexOf(this.children[i]);
            if (index === -1) return;
            this.elm.removeChild(this.children[i].elm);
            this.children.splice(index, 1);
        }
    }

}