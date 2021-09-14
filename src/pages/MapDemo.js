import {Lightning, Router, Utils} from "@lightningjs/sdk";
import {settings} from "../lib/automotiveSettings";

export default class MapDemo  extends Lightning.Component {
    static _template() {
        return {
            rect: true, w: w=>w, h: h=>h, color: 0xff000000,
            Image: {
                w: w=>w, h: h=>h, src: Utils.asset('images/map.jpg')
            },
            ButtonsTitle: {
                x: 30, y: 20,
                text: {
                    text: 'Automotive Pinch zoom rotation demo', fontFace: 'julius'
                }
            },
            Scale: {
                x: 30, y: 70, alpha: 0.5,
                text: {
                    fontSize: 18,
                    text: '', fontFace: 'julius'
                }
            },
            Rotation: {
                x: 30, y: 95, alpha: 0.5,
                text: {
                    fontSize: 18,
                    text: '', fontFace: 'julius'
                }
            }
        }
    }


    _onPinch(record) {
        const {distance, angle} = record.pinch;
        const level = (distance / settings.w) * 6 + 1;
        this.tag("Image").scale = level > 0 ? level : 0.001;

        this.tag("Image").rotation = angle;
        this.tag("Scale").text = `scale: ${level + 1}`;
        this.tag("Rotation").text = `rotation: ${angle}`;
    }

    _onPinchEnd() {
        this.tag("Image").patch({
            smooth: {
                scale: [1, {duration: 0.8}], rotation: [0, {duration: 0.8}]
            }
        })
        this.tag("Scale").text = ``;
        this.tag("Rotation").text = ``;
    }

    _inactive() {

    }


    pageTransition(i, o) {
        return "left"
    }
}
