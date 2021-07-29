import {Lightning} from "@lightningjs/sdk";
import {addTransitions} from "../../lib/helpers";

export default class ExpandableItem extends Lightning.Component {

    static _template() {
        const duration = 0.3;
        const timingFunction = `cubic-bezier(.2,.6,0,1.2)`;

        return {
            w: 500, h: 670, zIndex: 1,
            rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 12},
            transitions: addTransitions(["zIndex", "y", "x", "h", "w"], {duration, timingFunction})
        };
    }

    _init() {
        this.application.on("lock", ({locked})=> {
            this._setState(locked?"Collapsed.Locked":"Collapsed")
        });

        this._setState("Collapsed");
    }

    collapse() {
        this._expanded = false;
        this.application.emit("lock", {locked: false, item: this});

        const duration = 0.3;
        const timingFunction = `cubic-bezier(.2,.6,0,1.2)`;

        this.patch({
            smooth: {
                w: 500,
                h: 670,
                x: [this._startX, {duration, timingFunction}],
                y: 0,
                zIndex: 1
            }
        });

        this.tag("Widget").setSmooth("alpha", 1, {duration: 0.2, delay: 0.1});
        this.tag("FullScreen").setSmooth("alpha", 0, {duration: 0.1});
        this.tag("FullScreen").setSmooth("y", 30, {duration: 0.1});

        this._setState("Collapsed");
    }

    expand() {
        this._expanded = true;

        const duration = 0.3;
        const timingFunction = `cubic-bezier(.2,.6,0,1.2)`;

        this.tag("Widget").setSmooth("alpha", 0, {duration: 0.15});
        this.tag("Widget").transition("alpha").on("finish", ()=> {
            if (this._expanded) {
                this.application.emit("lock", {locked: true, item: this});

                this.patch({
                    smooth: {
                        w: 1780,
                        h: 940,
                        x: [0, {duration, timingFunction}],
                        y: 70 - this.core.renderContext.py,
                        zIndex: 2
                    }
                });

                this.tag("FullScreen").setSmooth("alpha", 1, {duration: 0.15});
                this.tag("FullScreen").setSmooth("y", 0, {duration: 0.3});

                this._setState("Expanded");
            }
        })

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
                // _onSingleTap() {
                //     this.expand();
                // }
                static _states() {
                    return [
                        class Locked extends this {
                            _onSingleTap() {}
                        }
                    ]
                }
            },
            class Expanded extends this {
                // _onSingleTap() {
                //     this.collapse();
                // }
            }
        ];
    }

    static get width() {
        return 500;
    }

    static get offset() {
        return 40;
    }

}