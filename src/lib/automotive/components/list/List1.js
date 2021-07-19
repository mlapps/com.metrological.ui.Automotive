import {Lightning} from "@lightningjs/sdk";
import {Item} from "../index";
import {findStraightLine} from "../../analyzer";

export default class List extends Lightning.Component {
    static _template() {
        return {
            w: 1920, h: 400,
            Items: {
                y: 100, x: 30
            }
        };
    }

    _init() {
        const children = new Array(50).fill('').map((el, index) => {
            return {
                type: Item, x: index * 240, idx: index, startX: index * 240
            };
        });

        this.add(children);
    }

    add(children) {
        this.tag("Items").children = children;
    }

    _onDrag(recording) {
        const {delta} = recording;
        this.items.forEach((item) => {
            item.x = item.startX + delta.x;
        });
    }

    _onDragEnd() {
        this.items.forEach((item) => {
            item.startX = item.x;
        });
    }

    swipeLeft(recording) {
        this.swipe(recording, -1);
    }

    swipeRight(recording) {
        this.swipe(recording, 1);
    }

    swipe(recording, dir) {
        const {duration, distance} = findStraightLine(recording.firstFinger);
        let force = distance / duration * 500 * dir;
        const bounds = this.items[dir === 1 ? 0 : this.items.length - 1].x + force;
        let outOfBounds = false;

        // prevent list going out of bounds
        if (dir === 1 && bounds > 0) {
            force = force - bounds;
            outOfBounds = true;
        } else if (dir === -1 && bounds < 1650) {
            const diff = 1650 - bounds;
            force += diff;
            outOfBounds = true;
        }

        // prevent extreme force
        if (isNaN(force)) {
            force = 0;
        }

        // position items accordingly to force
        this.items.forEach((item) => {
            const position = item.x + (force);
            item.setSmooth('x', position, {
                duration: 0.5,
                timingFunction: outOfBounds ? 'cubic-bezier(.8,-0.5,0,2.19)' : 'ease-out'
            });
            item.startX = position;
        });
    }

    swipeUp() {
        // block
    }

    swipeDown() {
        // block
    }

    get items() {
        return this.tag("Items").children;
    }
}