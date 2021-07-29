import ExpandableItem from "./ExpandableItem";
import {addTransitions} from "../../lib/helpers";
import Carousel from "../Carousel";
import {Lightning, Utils} from "@lightningjs/sdk";
import SwirlShader from "../../shaders/SwirlShader";
import {components} from "@lightningjs/sdk/src/Router/utils/router";
import {Item} from "../../lib/automotive/components";
import {Player} from "../index";

export default class MultimediaItem extends ExpandableItem {

    static _template() {
        const duration = 0.3;
        const timingFunction = `cubic-bezier(.2,.6,0,1.2)`;

        return {
            ...super._template(),
            ref: "MultimediaItem",
            color: 0xff1A1A2E, rect: true,
            Widget: {
                Blur: {
                    type: Lightning.components.FastBlurComponent,
                    w: 500, h: 670,
                    amount: 3,
                    content: {
                        Texture: {
                            colorTop: 0xffffffff, colorBottom: 0x00ffffff,
                            w: 500, h: 540
                        }
                    }
                },
                Effect: {
                    color: 0xff1A1A2E, rect: true,
                    w: 500, h: 670,
                    shader: {type: SwirlShader, blur: 1, pull: 1},
                },
                Album: {
                    mountX: 0.5, x: 250, y: 74, w: 300, h: 300,
                    rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 12},
                    src: Utils.asset("images/gorillaz-humanz.png")
                },
                Metadata: {
                    NowPlaying: {
                        mountX: 0.5, x: 250, y: 26,
                        text: {fontFace: "Light", text: "NOW PLAYING", fontSize: 19},
                    },
                    Title: {
                        mountX: 0.5, x: 250, y: 400,
                        text: {fontFace: "SemiBold", text: "Busted and Blue", fontSize: 36}
                    },
                    Artist: {
                        mountX: 0.5, x: 250, y: 456, color: 0xffE94560,
                        text: {fontFace: "Light", text: "Gorillaz", fontSize: 26}
                    },
                    Bar: {
                        y: 506,
                        Right: {
                            rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 5},
                            mountY: 0.5, y: 25, x: 100, w: 300, h: 8, rect: true, color: 0xff0F3460
                        },
                        Left: {
                            rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 4},
                            w: 33, h: 8, mountY: 0.5, y: 25, x: 100, rect: true, color: 0xffE94560
                        },
                        TimeLeft: {
                            y: 12, x: 34,
                            text: {fontFace: "Bold", text: "0:34", fontSize: 19}
                        },
                        TotalDuration: {
                            y: 12, mountX: 1, x: 466,
                            text: {fontFace: "Bold", text: "4:25", fontSize: 19}
                        }
                    },
                    Buttons: {
                        Previous: {
                            mount: 0.5, x: 150, y: 600,
                            src: Utils.asset("images/previous.png")
                        },
                        Pause: {
                            mount: 0.5, x: 250, y: 600,
                            src: Utils.asset("images/pause.png")
                        },
                        Next: {
                            mount: 0.5, x: 350, y: 600,
                            src: Utils.asset("images/next.png")
                        }
                    }
                }
            },
            FullScreen: {
                alpha: 0, y: 30,
                w: w=>w, h: h=>h,
                Player: {
                    type: Player
                },
                // Album: {
                //     x: 30, y: 30, w: 200, h: 200,
                //     rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 12},
                //     src: Utils.asset("images/gorillaz-humanz.png"),
                //     // Overlay: {
                //     //     w: 200, h: 200,
                //     //     rect: true, color: 0x80000000
                //     // },
                //     // Pause: {
                //     //     mount: 0.5, x: 100, y: 100,
                //     //     src: Utils.asset("images/pause.png")
                //     // }
                // },
                // Title: {
                //     x: 260, y: 30,
                //     text: {fontFace: "SemiBold", text: "Busted and Blue", fontSize: 42}
                // },
                // Artist: {
                //     x: 260, y: 88, color: 0xffFF6363,
                //     text: {fontFace: "Light", text: "Gorillaz", fontSize: 32}
                // },
                // Bar: {
                //     x: 230, y: 128,
                //     Right: {
                //         rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 5},
                //         mountY: 0.5, y: 25, x: 100, w: 1180, h: 8, rect: true, color: 0xff0F3460
                //     },
                //     Left: {
                //         rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 4},
                //         w: 133, h: 8, mountY: 0.5, y: 25, x: 100, rect: true, color: 0xffE94560
                //     },
                //     TimeLeft: {
                //         y: 12, x: 34,
                //         text: {fontFace: "Bold", text: "0:34", fontSize: 19}
                //     },
                //     TotalDuration: {
                //         y: 12, mountX: 1, x: 1346,
                //         text: {fontFace: "Bold", text: "4:25", fontSize: 19}
                //     }
                // },
                // Next: {
                //     Album: {
                //         mountX: 1, x: 1750, y: 30, w: 140, h: 140,
                //         rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 12},
                //         src: Utils.asset("images/gorillaz-gorillaz.png"),
                //         Overlay: {
                //             w: 140, h: 140, rect: true, color: 0xdd202040
                //         },
                //         Next: {
                //             mount: 0.5, x: 70, y: 70,
                //             src: Utils.asset("images/next.png")
                //         }
                //     },
                //     Title: {
                //         mountX: 1, x: 1580, y: 30,
                //         text: {fontFace: "SemiBold", text: "Clint Eastwood", fontSize: 32}
                //     },
                //     Artist: {
                //         mountX: 1, x: 1580, y: 76, color: 0xffE94560,
                //         text: {fontFace: "Light", text: "Gorillaz", fontSize: 22}
                //     },
                //     Buttons: {
                //         Previous: {
                //             mount: 0.5, x: 284, y: 208, scale: 0.8,
                //             src: Utils.asset("images/previous.png")
                //         },
                //         Pause: {
                //             mount: 0.5, x: 354, y: 208, scale: 0.8,
                //             src: Utils.asset("images/pause.png")
                //         }
                //     }
                //     // Title: {
                //     //     mountX: 1, x: 1750,
                //     //     // x: 260,
                //     //     y: 130,
                //     //     text: {fontFace: "SemiBold", text: "Waiting On A War", fontSize: 32}
                //     // },
                //     // Artist: {
                //     //     mountX: 1, x: 1750,
                //     //     // x: 260, y: 92,
                //     //     y: 170,
                //     //     color: 0xffFF6363,
                //     //     text: {fontFace: "Light", text: "Foo Fighters", fontSize: 22}
                //     // },
                //     // Overlay: {
                //     //     w: 200, h: 200,
                //     //     rect: true, color: 0x80000000
                //     // },
                //     // Pause: {
                //     //     mount: 0.5, x: 100, y: 100,
                //     //     src: Utils.asset("images/pause.png")
                //     // }
                // },
                Content: {
                    w: w=>w, h: 680, y: 260, rect: true, colorTop: 0x25000000, colorBottom: 0x00000000,
                    Menu: {
                        flex: {direction: "column"},
                        x: 30, y: 30,
                        YourLibrary: {
                            color: 0xff595B83,
                            text: {fontFace: "Regular", text: "YOUR LIBRARY", fontSize: 24}
                        },
                        LastAdded: {
                            flexItem: {marginTop: 20},
                            text: {fontFace: "Light", text: "Last added songs", fontSize: 24}
                        },
                        Favorites: {
                            flexItem: {marginTop: 15},
                            text: {fontFace: "Light", text: "Favorites", fontSize: 24}
                        },
                        Artists: {
                            flexItem: {marginTop: 15},
                            text: {fontFace: "Light", text: "Artists", fontSize: 24}
                        },
                        Songs: {
                            flexItem: {marginTop: 15},
                            text: {fontFace: "Light", text: "Songs", fontSize: 24}
                        },
                        Genres: {
                            flexItem: {marginTop: 15},
                            text: {fontFace: "Light", text: "Genres", fontSize: 24}
                        }
                    },
                    Albums: {
                        x: 270, y: 30,
                        Title: {
                            color: 0xff595B83,
                            text: {fontFace: "Regular", text: "MY ALBUMS", fontSize: 24}
                        },
                        Grid: {
                            y: 50
                        }
                    }
                }
            }
        };
    }

    _init() {
        super._init();

        this.tag("Blur").content.tag("Texture").texture = this.tag("Album").getTexture()
    }

    set data(v) {
        this.tag("Player").data = v.albums;

        let x = 0;
        let y = 0;

        const children = v.albums.map((album, index) => {
            const child = {
                x, y,
                Cover: {
                    w: 300, h: 300,
                    rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 12},
                    src: Utils.asset(`images/${album.cover}`),
                },
                Title: {
                    y: 310,
                    text: {fontFace: "SemiBold", text: album.title, wordWrapWidth: 300, maxLines: 1, fontSize: 24}
                },
                Artist: {
                    y: 345, color: 0xffE94560,
                    text: {fontFace: "Light", text: album.artist, fontSize: 21}
                }
            };

            x += 370;

            if (index % 4 === 3) {
                x = 0;
                y += 420;
            }

            return child;
        });

        this.add(children);

        // this.tag("Carousel").items = v.albums;
    }

    add(children) {
        this.tag("Grid").children = children;
    }

    expand() {
        super.expand();
        // this.tag("Carousel").expand();
    }

    collapse() {
        super.collapse();
        // this.tag("Carousel").collapse();
    }

}