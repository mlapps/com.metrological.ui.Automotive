import {Lightning, Utils} from "@lightningjs/sdk";
import {MultimediaItem, RadioItem} from "../components/items";
import {List} from "../components";

export default class Main extends Lightning.Component{
    static _template(){
        return {
            // w: 1920, h: 1080,
            // Volume: {
            //     mountY: 1, y: 1000, x: 100,
            //     text: {fontFace: "Regular", text: "50 dB", fontSize: 54}
            // },
            // Blocks: {}
            Background: {
                src: Utils.asset("images/background.png")
            },
            List: {
                type: List,
                mountY: 0.5,
                y: 540,
                h: 670,
                w: 1920,
                listPosition: {x: 70},
                items: [
                    MultimediaItem,
                    RadioItem,
                    // NavigationItem,
                    // PhoneItem,
                    // SettingsItem
                ]
            }
        }
    }

    _init() {
        // this.tag("Blocks").children = new Array(54).fill('').map((el, index)=> {
        //     return {
        //         w: 50, h: 18, y: (index * 20) + 1, x: -50, rect: true, alpha: 0, visible: false
        //     }
        // });
        //
        // this._lastIndex = null;
        // this.dB = 50;
        // // this._lastDirection = 0;
    }

    _onDrag(recording) {
        // const index = Math.ceil((recording.delta.y + recording.startposition.y) / 20);
        //
        // if (!this._lastIndex) {
        //     this._lastIndex = index;
        // }
        //
        // if (this._lastIndex !== index) {
        //     const direction = recording.delta.y >= 0 ? 1 : -1;
        //
        //     this.dB += index * (this._lastIndex - index) / 100;
        //
        //     this.tag("Volume").text = `${Math.ceil(this.dB * 10) / 10} dB`
        //
        //     this.tag("Blocks").children[index].visible = true;
        //     this.tag("Blocks").children[index].setSmooth("alpha", 1, {duration: 0.3});
        //     this.tag("Blocks").children[index].setSmooth("x", 0, {duration: 0.3});
        //
        //     if (this._lastIndex - index === direction) {
        //         if (this._lastIndex - index === -1) {
        //             this.tag("Blocks").children.forEach((child, index) => {
        //                 if (index < this._lastIndex && child.visible) {
        //                     child.setSmooth("alpha", 1, {duration: 0.3});
        //                     child.setSmooth("x", -50, {duration: 0.3});
        //                     child.setSmooth("visible", false);
        //                 }
        //             })
        //         } else if (this._lastIndex - index === 1) {
        //             this.tag("Blocks").children.forEach((child, index) => {
        //                 if (index > this._lastIndex && child.visible) {
        //                     child.setSmooth("alpha", 0, {duration: 0.3});
        //                     child.setSmooth("x", -50, {duration: 0.3});
        //                     child.setSmooth("visible", false);
        //                 }
        //             })
        //         }
        //     }
        //
        //     this._lastDirection = direction;
        //     this._lastIndex = index;
        // }
    }

    _onDragEnd(){
        // this.tag("Blocks").children.forEach(child => {
        //     child.setSmooth("alpha", 0, {duration: 0.6});
        //     child.setSmooth("x", -50, {duration: 0.6});
        // });
        //
        // this._lastIndex = null;
    }

    _active() {
        this.tag("List").show(true);
    }

    set data(v) {
        this.tag("List").tag("MultimediaItem").data = v;
    }
}