import {Lightning, Utils} from "@lightningjs/sdk";
import ExpandableItem from "./ExpandableItem";
import {addTransitions} from "../../lib/helpers";

export default class RadioItem extends ExpandableItem {

    static _template() {
        const duration = 0.3;
        const timingFunction = `cubic-bezier(.2,.6,0,1.2)`;

        return {
            ...super._template(),
            Top: {
                w: w=>w, h: h=>h, rect: true, color: 0xff2C1E7D,
                transitions: addTransitions(["y", "x", "h", "w"], {duration, timingFunction}),
                Content: {
                    // Logo: {
                    //     mount: 0.5, x: 182, y: 190,
                    //     src: Utils.asset("images/538.png")
                    // },
                    // DabPlus: {
                    //     flex: {paddingTop: 2, paddingLeft: 8, paddingRight: 8},
                    //     rtt: true, rect: true, mountX: 1, x: 354, y: 324,
                    //     shader: {type: Lightning.shaders.RoundedRectangle, radius: 4},
                    //     DabPlusLabel: {
                    //         color: 0xff8900F2,
                    //         text: {fontFace: "Bold", text: "DAB+", fontSize: 21}
                    //     }
                    // }
                }
            },
            Bottom: {
                // w: 364, h: 130, mountX: 0.5, x: w=>w/2, y: h=>h-130, rect: true,
                // transitions: addTransitions(["y", "x", "h", "w"], {duration, timingFunction}),
                // colorTop: 0xff372a5b, colorBottom: 0xff462277,
                // Title: {
                //     y: 18,
                //     x: 30,
                //     text: {fontFace: "Regular", text: "RADIO", fontSize: 48}
                // },
                // Description: {
                //     x: 30,
                //     y: 76,
                //     color: 0xFFDDD6FF,
                //     text: {fontFace: "Light", text: "listening to Radio538", fontSize: 21}
                // }
            }
        };
    }

}