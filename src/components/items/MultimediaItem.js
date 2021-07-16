import {Lightning, Utils} from "@lightningjs/sdk";
import ExpandableItem from "./ExpandableItem";
import {addTransitions} from "../../lib/helpers";
import List from "../../components/List";

export default class MultimediaItem extends ExpandableItem {

    static _template() {
        const duration = 0.3;
        const timingFunction = `cubic-bezier(.2,.6,0,1.2)`;

        return {
            ...super._template(),
            Top: {
                w: w=>w, h: h=>h, rect: true, color: 0xff8900f2,
                transitions: addTransitions(["y", "x", "h", "w"], {duration, timingFunction}),
                Content: {
                    Glow: {
                        type: Lightning.components.FastBlurComponent, w: 364, h: 370,
                        amount: 3, content: {
                            Texture: {
                                mount: 0.5, x: 182, y: 184
                            }
                        }
                    },
                    Album: {
                        mount: 0.5, x: 182, y: 184,
                        rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 4},
                        src: Utils.asset("images/gorillaz-humanz.png")
                    }
                }
            },
            Bottom: {
                w: 364, h: 130, mountX: 0.5, x: w=>w/2, y: h=>h-130, rect: true,
                transitions: addTransitions(["y", "x", "h", "w"], {duration, timingFunction}),
                colorTop: 0xff3d2a5a, colorBottom: 0xff532274,
                Title: {
                    y: 14,
                    x: 30,
                    text: {fontFace: "CorporateABold", text: "MEDIA", fontSize: 52}
                },
                Description: {
                    x: 30,
                    y: 74,
                    color: 0xFFDDD6FF,
                    text: {fontFace: "Light", text: "music / movies and series", fontSize: 21}
                }
            }
        };
    }

    _init() {
        super._init();
        this.tag("Glow").content.tag("Texture").texture = this.tag("Album").getTexture()
    }

}