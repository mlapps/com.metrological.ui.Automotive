import {Lightning, Utils} from "@lightningjs/sdk";

export default class Album extends Lightning.Component {

    static _template() {
        const duration = 0.3;
        const timingFunction = `cubic-bezier(.2,.6,0,1.2)`;

        return {
            h: 294, w: 454,
            x: 182,
            rtt: true,
            shader: {type: Lightning.shaders.Perspective, rx: 0, fudge: .2},
            Blur: {
                h: 294, w: 454,
                type: Lightning.components.FastBlurComponent, amount: 0, content: {
                    h: 294, w: 294,
                    Lp: {
                        mountY: 0.5, y: 150,
                        h: 294, w: 294,
                        Art: {
                            mount: 0.5, x: 150, y: 150, h: 110, w: 110
                        },
                        Vinyl: {
                            src: Utils.asset("images/vinyl.png")
                        }
                    },
                    Cover: {
                        Overlay: {
                            w: 300, h: 300, rect: true, colorLeft: 0xffffffff, colorRight: 0x00ffffff, colorTop: 0x25ffffff, colorBottom: 0x00ffffff
                        }
                    }
                }
            }
        }
    }

    // touchMove(distance) {
    //     const d = distance*0.5;
    //
    //     if (distance/175 <= 1 && distance/175 >= 0.8) {
    //         this.setSmooth("scale", 0.8 + (1 - (distance/175)));
    //     }
    //
    //     this.tag("Blur").content.tag("Lp").x = 150 - d < 80 ? 80 : 150 - d;
    //     this.tag("Blur").content.tag("Lp").rotation = d / 100;
    //     this.tag("Blur").content.tag("Cover").x = d > 80 ? 80 : d;
    // }

    expand(v) {
        const duration = 0.3;
        const timingFunction = `cubic-bezier(.2,.6,0,1.2)`;

        this.tag("Blur").content.tag("Lp").setSmooth("x", v?150:0, {duration, timingFunction});
    }

    set item(v) {
        this._item = v;
        this.tag("Blur").content.tag("Art").src = Utils.asset(`images/${v.cover}`)
        this.tag("Blur").content.tag("Cover").src = Utils.asset(`images/${v.cover}`)
    }

    get item() {
        return this._item;
    }

    set index(v) {
        this._index = v;
    }

    get index() {
        return this._index;
    }

    set position(v) {
        this.x = v.x;
        this.scale = v.scale;
        this.zIndex = v.zIndex;
        this.alpha = v.alpha;
        this.shader.rx = v.rx;
        this.tag("Blur").amount = v.amount
        this.tag("Blur").content.tag("Cover").color = v.color;
    }

    animateToPosition({x,zIndex,scale,alpha,rx,amount,color}) {
        this.patch({
            smooth: {x, zIndex, scale, alpha, "shader.rx": rx},
            Blur: {
                smooth: {amount},
                content: {
                    Cover: {
                        smooth: {color}
                    }
                }
            }
        });
    }

}