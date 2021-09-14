import {Lightning, Router} from "@lightningjs/sdk";
import {List2} from "../components";
import {settings} from "../lib/automotiveSettings";

export default class CarouselDemo extends Lightning.Component {
    static _template() {
        return {
            rect: true, w: w=>w, h: h=>h,
            colorTop: 0xffCF9FF2, colorBottom: 0xff001935,
            ListTitle: {
                x: 30, y: 20,
                text: {
                    text: 'Automotive list demo 2', fontFace: 'julius'
                }
            },
            Carousel: {
                type: List2, y: settings.h / 2 - 250, w: w=>w, h:h=>h
            }
        };
    }

    pageTransition() {
        return "left";
    }

}
