import {Lightning} from "@lightningjs/sdk";
import {createVector} from "../lib/automotive/models";
import {findStraightLine} from "../lib/automotive/analyzer";

export default class List extends Lightning.Component {
    static _template() {
        return {
            w: 1920, h: 500,
            Items:{
                x: 70,
                flex: {}
            }
        };
    }

    _init() {
        this._startX = 70;
    }

    _active(){
        this._current = createVector(
            this.tag("Items").x,this.tag("Items").y
        );
    }

    _onDrag(recording){
        const {delta} = recording;

        this.items.forEach((item)=> {
            item.lock(true);
        })

        this.tag("Items").x = this._startX + delta.x;
    }

    _onDragEnd(){
        this._timeout = setTimeout(()=> {
            this._startX = this.tag("Items").x;
            this._unlock();
            this._checkBoundsPosition(this._startX);
        }, 120);
    }

    _unlock() {
        this.items.forEach((item)=> {
            item.lock(false);
        })
    }

    swipeLeft(recording){
        this._position(-1, recording);
    }

    swipeRight(recording){
        this._position(1, recording);
    }

    _position(direction, recording) {
        clearTimeout(this._timeout);
        const {duration, distance } = findStraightLine(recording.firstFinger);
        const force = distance / duration * 500;

        const position = this.tag("Items").x + (direction * force);
        this.tag("Items").setSmooth('x', position, {
            duration: recording.duration/100, timingFunction: 'ease-out'
        });
        this._startX = position;
        this._checkBoundsPosition(position)
        this._unlock();
    }

    _checkBoundsPosition(xPosition) {
        if (xPosition > 70) {
            this.tag("Items").setSmooth('x', 70, {
                duration: 0.6, timingFunction: 'ease-out'
            });
            this._startX = 70;
        } else if (Math.abs(xPosition) > this.tag("Items").finalW - 474) {
            this.tag("Items").setSmooth('x', -(this.tag("Items").finalW - 474), {
                duration: 0.6, timingFunction: 'ease-out'
            });
            this._startX = -(this.tag("Items").finalW - 474);
        }
    }


    set items(items) {
        this.tag("Items").patch({
            children: this.create({items})
        });
    }

    get items(){
        return this.tag("Items").children;
    }

    create({items}) {
        return items.map((item, index) => {
            return {
                type: item,
                alpha: 0,
                scale: 0.9,
                flexItem: {marginRight: 40}
            }
        });
    }

    show() {
        const children = this.tag("Items").children;
        children.forEach((child, index) => {
            const duration = 0.8 - (Math.abs(index - 2) * 0.15);
            child.patch({
                smooth: {
                    alpha: [1, {duration, timingFunction: 'cubic-bezier(.8,-0.49,.36,1)'}],
                    scale: [1, {duration, timingFunction: 'cubic-bezier(.8,-0.49,.36,1)'}]
                }
            })
        });
    }

}