import {Img, Lightning} from "@lightningjs/sdk";

export default class Item extends Lightning.Component {
    static _template() {
        return {
            rect: true, alpha: 0.4, collision: true, w: 220, h: 300,
            Label:{
                mount:0.5, x: 110, y:150,
                text:{
                    text:'', fontSize:25
                }
            }
        };
    }

    _onSingleTap() {
        this.animation({
            duration: 2, actions: [
                {p: 'alpha', v: {0: 1, 9: 1, 1: 0.5}}
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
            duration: 2, actions: [
                {p: 'alpha', v: {0: 1, 9: 1, 1: 0.5}}
            ]
        }).start();
    }

    /**
     * When one finger quickly double taps the same element
     * @private
     */
    _onDoubleTap() {
        this.animation({
            duration: 0.4, actions: [
                {p: 'alpha', v: {0: 0.5, 0.2: 1, 1: 0.5}},
                {p: 'scale', v: {0: 1, 0.2: 1.5, 1: 1}},
            ]
        }).start();
    }

    set idx(v){
        this.tag("Label").text = `${v}`
    }

    set image(v){
        this.texture = Img(v).original();
    }
}