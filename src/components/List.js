import {Lightning} from "@lightningjs/sdk";
import {createVector} from "../lib/automotive/models";
import {findStraightLine} from "../lib/automotive/analyzer";

export default class List extends Lightning.Component {
    static _template() {
        return {
            Items:{}
        };
    }

    _init() {
        this.application.on("lock", (v)=> {
            this._setState(v?"Locked":"Unlocked")
        });

        this._setState("Unlocked");
    }

    _active(){
        this._current = createVector(
            this.tag("Items").x,this.tag("Items").y
        );
    }

    _swipePosition(direction, recording) {
        clearTimeout(this._timeout);
        const {duration, distance } = findStraightLine(recording.firstFinger);

        this.items.forEach((item, index)=> {
            const width = this._items[index].width;
            const offset = this._items[index].offset;
            const force = distance / duration * (width + offset);
            const position = item.x + (direction * force);

            item.setSmooth('x', position , {
                duration: 0.6, timingFunction:'ease-out'
            });
            item.startX = position;
            item.lock(false);
        });

        this._snapToPosition();
    }

    _snapToPosition() {
        const firstItem = this.items[0];
        const lastItem = this.items[this.items.length-1];

        if (firstItem.startX > 0) {
            this.items.forEach((item, index)=> {
                const width = this._items[index].width;
                const offset = this._items[index].offset;

                item.setSmooth('x', index * (width + offset), {
                    duration: 0.3, timingFunction:'ease-out'
                });
                item.startX = index * (width + offset);
            });
        } else if (lastItem.startX < 0) {
            this.items.forEach((item, index)=> {
                const width = this._items[index].width;
                const offset = this._items[index].offset;

                item.setSmooth('x', (index * (width + offset)) - ((this.items.length-1) * (width + offset)), {
                    duration: 0.3, timingFunction:'ease-out'
                });
                item.startX = (index * (width + offset)) - ((this.items.length-1) * (width + offset));
            });
        }
    }


    set items(items) {
        this._items = items;

        this.tag("Items").patch({
            children: this.create({items})
        });
    }

    get items(){
        return this.tag("Items").children;
    }

    set listPosition({x=0,y=0}) {
        this.tag("Items").patch({x,y});
    }

    create({items}) {
        return items.map((item, index) => {
            const x = index * (item.width + item.offset);
            return {
                type: item,
                alpha: 0,
                scale: 0.9,
                x,
                startX: x
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

    static _states() {
        return [
            class Locked extends this {},
            class Unlocked extends this {
                _onDrag(recording){
                    const {delta} = recording;

                    this.items.forEach((item)=> {
                        item.lock(true);
                        item.x = item.startX + delta.x;
                    })
                }
                _onDragEnd(){
                    this._timeout = setTimeout(()=> {
                        this.items.forEach((item)=> {
                            item.startX = item.x;
                            item.lock(false);
                        })
                        this._snapToPosition();
                    }, 120);
                }
                swipeLeft(recording){
                    this._swipePosition(-1, recording);
                }
                swipeRight(recording){
                    this._swipePosition(1, recording);
                }
            }
        ];
    }

}