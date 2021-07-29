import ExpandableItem from "./ExpandableItem";
import {addTransitions} from "../../lib/helpers";
import {Lightning, Utils} from "@lightningjs/sdk";

export default class NavigationItem extends ExpandableItem {

    static _template() {
        const duration = 0.3;
        const timingFunction = `cubic-bezier(.2,.6,0,1.2)`;

        return {
            ...super._template(),
            Shadow: {
                w: w=>w + 20, h: h=>h + 20,
                texture: Lightning.Tools.getShadowRect(100,100,12, 30)
            },
            RoundedRectangleHolder: {
                w: w=>w, h: h=>h,
                rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 12},
                Top: {
                    w: w=>w, h: h=>h, rect: true, color: 0xff22333b,
                    transitions: addTransitions(["y", "x", "h", "w"], {duration, timingFunction}),
                    Content: {
                        w: w=>w, h: h=>h,
                        flex: {direction: "column"},
                        Direction: {
                            flexItem: {marginLeft: 10, marginTop: 10},
                            rtt: true,
                            shader: {type: Lightning.shaders.RoundedRectangle, radius: 4},
                            w: w=>w - 20, h: 100, rect: true, color: 0xff2a2a5c,
                            Arrow: {
                                x: 20, mountY: 0.5, y: 50,
                                src: Utils.asset("images/left-2.png")
                            },
                            Street: {
                                x: 84, y: 10,
                                text: {fontFace: "Regular", text: "Mariniersweg", fontSize: 32}
                            },
                            Distance: {
                                x: 84, y: 55, color: 0xaaffffff,
                                text: {fontFace: "Regular", text: "850 m", fontSize: 21}
                            },
                            Indicator: {
                                w: 100, h: 3, y: 97, rect: true
                            }
                        },
                        DirectionNextUp: {
                            flexItem: {marginLeft: 10, marginTop: 10},
                            shader: {type: Lightning.shaders.RoundedRectangle, radius: 4},
                            w: w=>w - 20, h: 100, rect: true, color: 0xff2a2a5c, alpha: 0.5,
                            Arrow: {
                                x: 20, mountY: 0.5, y: 50,
                                src: Utils.asset("images/right.png")
                            },
                            Street: {
                                x: 84, y: 10,
                                text: {fontFace: "Regular", text: "Sirus", fontSize: 32}
                            },
                            Distance: {
                                x: 84, y: 55, color: 0xaaffffff,
                                text: {fontFace: "Regular", text: "500 m", fontSize: 21}
                            }
                        }
                    }
                },
                Bottom: {
                    w: 364, h: 130, mountX: 0.5, x: w=>w/2, y: h=>h-130, rect: true,
                    transitions: addTransitions(["y", "x", "h", "w"], {duration, timingFunction}),
                    colorTop: 0xff2a2a5c, colorBottom: 0xff2a2279,
                    Title: {
                        y: 18,
                        x: 24,
                        text: {fontFace: "Regular", text: "NAVIGATION", fontSize: 48}
                    },
                    Description: {
                        x: 24,
                        y: 76,
                        color: 0xFFDDD6FF,
                        text: {fontFace: "Light", text: "choose a destination", fontSize: 21}
                    }
                }
            }
        };
    }

}