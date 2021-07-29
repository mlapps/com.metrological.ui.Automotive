import {Lightning} from "@lightningjs/sdk";
import Album from "./items/Album";
import {addTransitions} from "../lib/helpers";

export default class Carousel extends Lightning.Component {

    static _template() {
        const duration = 0.3;
        const timingFunction = `cubic-bezier(.2,.6,0,1.2)`;

        return {
            Items: {
                transitions: addTransitions(["mountX", "x", "w", "y", 'h'], {duration, delay: 1, timingFunction}),
                h: 300, w: 300,
                mount: 0.5, x: 182, y: 185,
                forceZIndexContext: true,
                boundsMargin: [1000, 100, 1000, 100]
            }
        };
    }

    _init() {
        this._offset = 0;
        this._lastDistance = 0;

        this._setState("Collapsed");
    }

    create({items}) {
        return items.map((item, index) => {
            const position = this._getCollapsePositions(index);

            return {
                type: Album,
                index,
                item,
                position
            };
        });
    }

    _collapse(children) {
        children.forEach((child,index) => {
            const position = this._getCollapsePositions(index);
            child.animateToPosition(position);
        });
    }

    _reposition(children) {
        children.forEach((child,index) => {
            const position = this._getItemPositions(index);
            child.expand(false);
            child.animateToPosition(position);
        });

        this.focusedChild.expand(true);
        // this._update();
    }

    _getCollapsePositions(index) {
        let settingIndex = 0;

        if (index < this._offset) {
            settingIndex = 0
        } else if (index === this._offset) {
            settingIndex = 1
        } else if (index > this._offset) {
            settingIndex = 2
        }

        return Carousel.ITEM_COLLAPSE_POSITIONS[settingIndex];
    }

    _getItemPositions(index) {
        let settingIndex = 0;

        if (index < this._offset - 2) {
            settingIndex = 0
        } else if (index === this._offset - 2) {
            settingIndex = 1
        } else if (index === this._offset - 1) {
            settingIndex = 2
        } else if (index === this._offset) {
            settingIndex = 3
        } else if (index === this._offset + 1) {
            settingIndex = 4
        } else if (index === this._offset + 2) {
            settingIndex = 5
        } else if (index > this._offset + 2) {
            settingIndex = 6
        }

        return Carousel.ITEM_POSITIONS[settingIndex];
    }

    _scrollChildren(v) {
        const children = this.tag("Items").children;
        if (v) {
            const item = children.shift();
            children.push(item);
        } else {
            const item = children.pop();
            children.unshift(item);
        }
        this._reposition(children);
    }

    set itemType(v){
        this._itemType = v;
    }

    set items(v) {
        const items = v;
        const leftSide = items.splice(0, Math.ceil(items.length/2));
        this._items = [...items, ...leftSide];
        this._offset = Math.ceil(this._items.length/2);

        this.tag("Items").patch({
            children: this.create({items: this._items})
        });
    }

    get items() {
        return this._items;
    }

    get components(){
        return this.tag("Items").children;
    }

    get index(){
        return this._index;
    }

    expand() {
        this.focusedChild.expand(true);
        this._setState("Expanded");

        this.patch({
            Items: {
                w: 1780, x: 0, y: 470, mountX: 0
                // smooth: {}
            }
        });

        const children = this.tag("Items").children;
        this._reposition(children);
    }

    collapse() {
        const children = this.tag("Items").children;
        this._collapse(children);
        this.focusedChild.expand(false);
        this._setState("Collapsed");

        this.patch({
            Items: {
                w: 300, x: 182, y: 185, mountX: 0.5
                // smooth: {}
            }
        });
    }

    static _states() {
        return [
            class Collapsed extends this {
                $enter() {
                    this.application.emit("blur", false);
                }
            },
            class Expanded extends this {
                $enter() {
                    this.application.emit("blur", true);
                }

                swipeLeft() {
                    this._scrollChildren(true);
                }

                swipeRight() {
                    this._scrollChildren(false);
                }

                // _handleTouchMove(e) {
                //     const distance = e.x.distanceFromStart;
                //
                //     if (~~Math.abs(distance) % 80 <= 5) {
                //         if (~~Math.abs(distance) > this._lastDistance) {
                //             this._scrollChildren(distance < 0);
                //         }
                //         this._lastDistance = ~~Math.abs(distance);
                //     }
                // }
            }
        ]
    }

    get focusedChild() {
        return this.tag("Items").children[this._offset];
    }

}

Carousel.ITEM_POSITIONS= [
    {x: 0, color: 0xff888888, alpha: 0, rx: -1, amount: 3, scale: 0.5, zIndex: 1},
    {x: 358, color: 0xff888888, alpha: 1, rx: -0.75, amount: 2, scale: 0.6, zIndex: 1},
    {x: 458, color: 0xff888888, alpha: 1, rx: -0.5, amount: 1, scale: 0.7, zIndex: 2},
    {x: 688, color: 0xffffffff, alpha: 1, rx: 0, amount: 0, scale: 1, zIndex: 3},
    {x: 958, color: 0xff888888, alpha: 1, rx: 0.75, amount: 1, scale: 0.7, zIndex: 2},
    {x: 1058, color: 0xff888888, alpha: 1, rx: 0.5, amount: 2, scale: 0.6, zIndex: 1},
    {x: 1780, color: 0xff888888, alpha: 0, rx: 1, amount: 3, scale: 0.5, zIndex: 1}
];

Carousel.ITEM_COLLAPSE_POSITIONS= [
    {x: -200, color: 0xff888888, alpha: 0, rx: 0, amount: 1, scale: 0.25, zIndex: 1},
    {x: 0, color: 0xffffffff, alpha: 1, rx: 0, amount: 0, scale: 1, zIndex: 2},
    {x: 650, color: 0xff888888, alpha: 0, rx: 0, amount: 1, scale: 0.55, zIndex: 1}
];