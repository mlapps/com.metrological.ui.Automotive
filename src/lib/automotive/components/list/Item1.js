import {Img, Lightning} from "@lightningjs/sdk";

export default class Item extends Lightning.Component {
    static _template() {
        return {
            rect: true, alpha: 0.4, collision: true, w: 220, h: 300,
            Label: {
                mount: 0.5, x: 110, y: 150,
                text: {
                    text: '', fontSize: 25
                }
            }
        };
    }

    _init() {
        this.scaled = false;
        this.on("txError",()=>{
            this.patch({
                rect: true, alpha:1, color: 0xff000000
            })
        })
    }

    _onSingleTap() {
        this.animation({
            duration: 0.4, actions: [
                {p: 'y', v: {0: 0, 0.2: -100, 9: -100, 1: 0}}
            ]
        }).start();
    }

    /**
     *
     * @param recording - recording data
     * @private
     */
    _onMultiTap(recording) {
        this.animation({
            duration: 0.4, actions: [
                {p: 'y', v: {0: 0, 0.2: 100, 9: 100, 1: 0}}
            ]
        }).start();
    }

    /**
     * When one finger quickly double taps the same element
     * @private
     */
    _onDoubleTap() {
        if(!this.scaled){
            this.oldZ = this.zIndex;
        }

        this.animation({
            duration: 0.4, actions: [
                {p: 'scale', v: {0: this.scaled ? 4 : 1, 1: this.scaled ? 1 : 4}},
                {p: 'zIndex', v: {0: this.scaled ? this.zIndex : this.oldZ, 1: this.scaled ? this.oldZ : 99999}},
            ]
        }).start();
        this.scaled = !this.scaled;

    }

    set idx(v) {
        this.tag("Label").text = `${v}`;
    }

    set image(v) {
        this._image = v;
        this.texture = Img(v).original();
    }
}