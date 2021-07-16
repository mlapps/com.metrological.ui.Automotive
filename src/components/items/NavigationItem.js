import ExpandableItem from "./ExpandableItem";
import {addTransitions} from "../../lib/helpers";

export default class NavigationItem extends ExpandableItem {

    static _template() {
        const duration = 0.3;
        const timingFunction = `cubic-bezier(.2,.6,0,1.2)`;

        return {
            ...super._template(),
            Top: {
                w: w=>w, h: h=>h, rect: true, color: 0xff09003D,
                transitions: addTransitions(["y", "x", "h", "w"], {duration, timingFunction}),
                Content: {
                    x: 30, y: 20,
                    Distance: {
                        text: {fontFace: "Light", text: "750m", fontSize: 48}
                    },
                    Street: {
                        y: 54, color: 0xFFDDD6FF,
                        text: {fontFace: "Regular", text: "Mariniersweg", fontSize: 32}
                    }
                }
            },
            Bottom: {
                w: 364, h: 130, mountX: 0.5, x: w=>w/2, y: h=>h-130, rect: true,
                transitions: addTransitions(["y", "x", "h", "w"], {duration, timingFunction}),
                colorTop: 0xff2a2a5c, colorBottom: 0xff2a2279,
                Title: {
                    y: 14,
                    x: 30,
                    text: {fontFace: "CorporateABold", text: "NAVIGATION", fontSize: 52}
                },
                Description: {
                    x: 30,
                    y: 74,
                    color: 0xFFDDD6FF,
                    text: {fontFace: "Light", text: "choose a destination", fontSize: 21}
                }
            }
        };
    }

}