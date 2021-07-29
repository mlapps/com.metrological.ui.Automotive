import {Lightning, Utils} from "@lightningjs/sdk";

export default class Player extends Lightning.Component {

    static _template() {
        return {
            w: 1780, h: 260,
            // w: 1820,
            // h: 260,
            // clipping: true,
            Previous: {
                type: Lightning.components.FastBlurComponent,
                w: 260, h: 260, amount: 0,
                content: {
                    Texture: {
                        w: 260, h: 260, mount: 0.5, x: 130, y: 130,
                        src: Utils.asset("images/gorillaz-plastic-beach.png")
                    }
                },
                Overlay: {
                    w: w=>w, h: h=>h, rect: true, color: 0xaa000000
                },
                TimeLeft: {
                    mount: 0.5, x: 130, y: 130,
                    src: Utils.asset("images/previous.png")
                }
            },
            NowPlaying: {
                x: 260,
                Slider: {
                    y: 260, zIndex: 2
                },
                Indicator: {
                    w: 1, h: 260, rect: true, colorBottom: 0x25000000, colorTop: 0x00000000,
                    TimeLeft: {
                        y: 250, mount: 1, zIndex: 2,
                        text: {fontFace: "Regular", text: "0:00", fontSize: 19}
                    }
                },
                Track: {
                    y: 20,
                    x: 20,
                    Cover: {
                        w: 120, h: 120,
                        rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 12},
                        src: Utils.asset("images/gorillaz-humanz.png")
                    },
                    Title: {
                        x: 150, y: 10,
                        text: {fontFace: "SemiBold", text: "Busted and Blue", fontSize: 42}
                    },
                    Artist: {
                        x: 150, y: 64, color: 0xffFF6363,
                        text: {fontFace: "Light", text: "Gorillaz", fontSize: 28}
                    }
                }
            },
            Next: {
                type: Lightning.components.FastBlurComponent,
                x: 1520, w: 260, h: 260, amount: 0,
                content: {
                    Texture: {
                        w: 260, h: 260,
                        src: Utils.asset("images/gorillaz-gorillaz.png")
                    }
                }
            }
            // Covers: {
            //
            // }
            // PreviousCover: {
            //     x: -230, y: 30, w: 200, h: 200,
            //     rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 12},
            //     src: Utils.asset("images/gorillaz-plastic-beach.png")
            // },
            // PlayingCover: {
            //     x: 30, y: 30, w: 200, h: 200,
            //     rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 12},
            //     src: Utils.asset("images/gorillaz-humanz.png")
            // },
            // MetadataNowPlaying: {
            //     flex: {direction: "column"},
            //     x: 300, y: 20,
            //     Title: {
            //         text: {fontFace: "SemiBold", text: "Busted and Blue", fontSize: 42}
            //     },
            //     Artist: {
            //         color: 0xffFF6363,
            //         text: {fontFace: "Light", text: "Gorillaz", fontSize: 32}
            //     }
            // },
            // NextUpCover: {
            //     mountX: 1, x: 1750, y: 30, w: 200, h: 200,
            //     rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 12},
            //     src: Utils.asset("images/gorillaz-gorillaz.png")
            // },
            // MetadataNextUp: {
            //     flex: {direction: "column"},
            //     mountX: 1,
            //     x: 1470, y: 20,
            //     Title: {
            //         text: {fontFace: "SemiBold", text: "Clint Eastwood", fontSize: 42}
            //     },
            //     Artist: {
            //         color: 0xffE94560, x: w=>w, mountX: 1,
            //         text: {fontFace: "Light", text: "Gorillaz", fontSize: 32}
            //     }
            // }
        };
    }

    _init() {
        this.tag("Slider").children = new Array(1260).fill('').map((item, index) => {
            return {
                rect: true, color: 0xff0F3460, w: 1, h: 6, x: index, mountY: 1
            }
        });

        this._xPosition = 0;
        this._index = 2;
        this._firstDrag = false;
    }

    _active() {
        this.tag("TimeLeft").loadTexture();
        this.tag("TimeLeft").x = this.tag("TimeLeft").renderWidth + 10;
    }

    set data(v) {
        this._items = v;
    }

    get activeItem() {
        return this.tag("Covers").children[this._index];
    }

    get nextItem() {
        return this.tag("Covers").children[this._index+1];
    }

    _onDrag(recording){
        const {delta, startposition} = recording;

        const xPosition = Math.ceil((delta.x + startposition.x - 330));
        const yPosition = delta.y;

        if (xPosition > 0 && xPosition < 1260) {
            this.tag("TimeLeft").text.text = this._getMmSs((xPosition/256)*60);
        }

        if (xPosition <= 0) {
            if (this._action !== "previous") {
                this.tag("NowPlaying").setSmooth("x", 300, {duration: 0.2});
                this._action = "previous";
                this.tag("Previous").patch({
                    smooth: {amount: [2, {duration: 0.15}], w: [300, {duration: 0.2}]},
                    content: {
                        Texture: {
                            smooth: {w: [340, {duration: 0.2}], h: [340, {duration: 0.2}]}
                        }
                    }
                });

                this.tag("Next").patch({
                    smooth: {x: [1560, {duration: 0.2}]}
                });

                this._reset();
            }
        } else if (xPosition >= 1260) {
            if (this._action !== "next") {
                this.tag("NowPlaying").setSmooth("x", 220, {duration: 0.2});
                this._action = "next";
                this._reset();
            }
        } else {
            if (this._action !== null) {
                this.tag("NowPlaying").setSmooth("x", 260, {duration: 0.2});
                this._action = null;

                this.tag("Previous").patch({
                    smooth: {amount: [0, {duration: 0.15}], w: [260, {duration: 0.2}]},
                    content: {
                        Texture: {
                            smooth: {w: [260, {duration: 0.2}], h: [260, {duration: 0.2}]}
                        }
                    }
                });

                this.tag("Next").patch({
                    smooth: {x: [1520, {duration: 0.2}]}
                });
            }

            this._xPosition = xPosition;
            this._yPosition = yPosition;
            this._reposition()
        }
    }

    _getMmSs(totalSeconds) {
        totalSeconds %= 3600;
        const minutes = Math.floor(totalSeconds / 60)<10?`0${Math.floor(totalSeconds / 60)}`:Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60)<10?`0${Math.floor(totalSeconds % 60)}`:Math.floor(totalSeconds % 60);

        return `${minutes}:${seconds}`;
    }

    _reposition(skip) {
        this.tag("Indicator").w = this._xPosition;

        if (!skip && !this._firstDrag) {
            this.tag("Slider").setSmooth("zIndex", 1);
            this._firstDrag = true;
            this.tag("TimeLeft").text = {fontFace: "Regular", fontSize: 24};
            this.tag("TimeLeft").y = 170;
        }

        if (this._xPosition < 50) {
            this.tag("TimeLeft").x = this.tag("TimeLeft").renderWidth + 10;
        } else {
            this.tag("TimeLeft").x = this._xPosition - 6;
        }

        this.tag("Slider").children.forEach((child,index)=>{
            if (index > this._xPosition - 70 && index < this._xPosition) {
                child.color = 0xffE94560;
                child.alpha = (100 - (this._xPosition - index)) / 100;
                if (!skip) {
                    child.setSmooth("h", 260, {duration: 0.15});
                }
            } else {
                if (index < this._xPosition) {
                    child.color = 0xffE94560;
                    child.alpha = 0.3;
                } else {
                    child.color = 0xff0F3460;
                    child.alpha = 1;
                }
                child.setSmooth("h", 6);
            }
        });
    }

    _onDragEnd(){
        if (this._action) {
            this.tag("NowPlaying").setSmooth("x", 260);

            this.tag("Previous").patch({
                smooth: {amount: [0, {duration: 0.2}], w: [260, {duration: 0.2}]},
                content: {
                    Texture: {
                        smooth: {w: [260, {duration: 0.2}], h: [260, {duration: 0.2}]}
                    }
                }
            });

            this.tag("Next").patch({
                smooth: {x: [1520, {duration: 0.2}]}
            });
        }

        this._reset();
    }

    _reset() {
        this.tag("Slider").children.forEach((child)=>{
            child.setSmooth("h", 6);
        });
        this.tag("TimeLeft").setSmooth("y", 250);
        this.tag("MetadataNowPlaying").setSmooth("y", 20)
        this.tag("MetadataNextUp").setSmooth("y", 20)
        this.tag("TimeLeft").text = {fontFace: "Regular", fontSize: 19};
        this._firstDrag = false;
    }

    _onSingleTap(recording) {
        if (recording.startposition.x - 420 < 0) {
            console.log("left");
        } else if (recording.startposition.x - 420 > 1260) {
            console.log("right");
        } else {
            this._positionIndex = recording.startposition.x - 420;
            this._reposition(true);
        }
    }

}