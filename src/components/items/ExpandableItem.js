import {Lightning} from "@lightningjs/sdk";
import {addTransitions} from "../../lib/helpers";

export default class ExpandableItem extends Lightning.Component {

    static _template() {
        const duration = 0.3;
        const timingFunction = `cubic-bezier(.2,.6,0,1.2)`;

        return {
            rtt: true, w: 364, h: 500, rect: true, zIndex: 1,
            shader: {type: Lightning.shaders.RoundedRectangle, radius: 4},
            transitions: addTransitions(["zIndex", "y", "x", "h", "w"], {duration, timingFunction})
        };
    }

    _init() {
        this._setState("Collapsed");
    }

    collapse() {
        this.patch({
            smooth: {
                w: 364,
                h: 500,
                x: this._worldX - this._originalX - this.parent.finalX,
                y: 0,
                zIndex: 1
            }
        });

        this._setState("Collapsed");
    }

    expand() {
        this._originalX = this.finalX;
        this._worldX = this.core.renderContext.px;
        this._worldY = this.core.renderContext.py;

        this.patch({
            smooth: {
                w: 1780,
                h: 940,
                x: 70 - this._worldX,
                y: 70 - this._worldY,
                zIndex: 2
            }
        });

        this._setState("Expanded");
    }

    set startX(v) {
        this._startX = v;
    }

    get startX() {
        return this._startX;
    }

    lock(v) {
        this._setState(v?"Locked":"Collapsed");
    }

    static _states() {
        return [
            class Locked extends this {
                $exit() {
                    const duration = 0.3;
                    const timingFunction = `cubic-bezier(.2,.6,0,1.2)`;
                    this.transitions = addTransitions(["zIndex", "y", "x", "h", "w"], {duration, timingFunction})
                }
            },
            class Collapsed extends this {
                _onSingleTap() {
                    console.log("1");
                    this.expand();
                }
            },
            class Expanded extends this {
                _onSingleTap() {
                    console.log("1");
                    this.collapse();
                }
            }
        ];
    }

}