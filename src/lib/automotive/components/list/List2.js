import {Lightning} from "@lightningjs/sdk";
import {createVector} from "../../models";
import {Item1} from "../index";
import {findStraightLine} from "../../analyzer";
import {smoothstep} from "../../helpers";

export default class List extends Lightning.Component {
    static _template() {
        return {
            w: 1920, h: 400,
            Items: {
                y: 30,
            }
        };
    }

    _init() {
        this.itemWidth = 500;
        this.tag("Items").children = new Array(300).fill('').map((el, index) => {
            const x = index * (this.itemWidth / 1.207);
            return {
                type: Item1,
                w: 500, h: 600,
                x, startX: x,
                image: `https://picsum.photos/id/${index + 30}/500/600`,
                shader: {
                    type: Lightning.shaders.Perspective, rx: 0, fudge: .2
                }
            };
        });

        this.items.forEach(
            (item) => this.update(item)
        );
    }

    _active() {
        this._current = createVector(
            this.tag("Items").x, this.tag("Items").y
        );
    }

    _onDrag(recording) {
        const {delta} = recording;
        this.items.forEach(
            (item) => this.update(item, item.startX + delta.x)
        );
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

    swipe(rec, dir){
        const {duration, distance} = findStraightLine(rec.firstFinger);
        let force = distance / duration * 500 * dir;

        this.items.forEach((item) => {
            const position = item.x + (force);
            item.setSmooth('x', position, {
                duration: 0.9, timingFunction: 'ease-out'
            });
            item.transition('x').on('progress', () => this.update(item));
            item.startX = position;
        });
    }

    update(item, x) {
        // if x is set we update it's position
        // else we use it's current position
        // for calculation
        if (x) {
            item.x = x;
        } else {
            x = item.x;
        }

        const center = 1920 / 2 - (this.itemWidth / 2);
        const absDis = Math.abs(x - center);
        const offset = absDis / center;
        const zIndex = 40 - offset * 10;
        const scale = 1 - smoothstep(0, center, absDis / 1.5);
        const alpha = smoothstep(0.1, 0.7, scale);

        if(absDis < 960){
            item.shader.rx = (x - center) / 500;
        }

        item.patch({
            zIndex, scale, alpha
        });
    }

    get items() {
        return this.tag("Items").children;
    }
}