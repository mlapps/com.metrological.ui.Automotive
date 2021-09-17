/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Lightning, Utils} from "@lightningjs/sdk";
import {isFunction} from "@lightningjs/automotive/src/helpers";

const style = Symbol("style");

export default class Button extends Lightning.Component {
    static _template() {
        return {
            LabelStart: {
                y: 4, mountX: 1,
                color: 0xff8b8b8b,
                text: {
                    text: '0', fontFace: 'julius', fontSize: 15
                }
            },
            Slider: {
                x: 20,
                Bar: {
                    Rounded:{
                        w: 400, h: 15, y: 6, rect: true, color: 0x50d8d8d8,
                        shader: {
                            type: Lightning.shaders.RoundedRectangle,
                            radius: 7
                        }
                    }
                },
                Drag: {
                    Shadow: {
                        src: Utils.asset('images/slider-drag-shadow.png'),
                        x: -30, y: -18, scale: 1.1
                    },
                    Visual: {
                        src: Utils.asset('images/slider-drag.png'),
                        x: -20, w: 40, h: 40, y: -6
                    },
                    LabelCurrent: {
                        y: -35, mountX: 0.5, x: 0,
                        color: 0xff8b8b8b,
                        text: {
                            text: '', fontFace: 'julius', fontSize: 15
                        }
                    }
                }
            },
            LabelEnd: {
                y: 5, mountX: 0,
                color: 0xff8b8b8b,
                text: {
                    text: '200', fontFace: 'julius', fontSize: 15
                }
            }
        };
    }

    set config(data) {
        // grab template configuration
        const {min, max, width, startValue, steps, vertical} = data;
        const start = startValue - min;

        // calculate amount of steps we can take
        data.maxSteps = (max - min) / steps;

        // amount of pixels per step
        data.sizeSteps = width / data.maxSteps;

        // store current position in config object
        // so every 'drag' we calculate delta with last position
        data.currentPosition = start / steps * data.sizeSteps;

        // store config object in a special unique symbol
        // on the component instance
        this[style] = data;

        // update according to position
        this[!vertical ? "upv" : "uph"](data);

        // set startvalue
        this.value = startValue;
    }


    _onDrag(recording) {
        const {delta: {x, y}} = recording;
        const {sizeSteps, min, width, vertical, currentPosition, steps} = this[style];
        const v = vertical ? y : x;
        let position = Math.max(
            0, Math.min(width, currentPosition + (v - v % sizeSteps))
        );
        let value = (position / sizeSteps * steps) + min;

        // keep in bounds
        if (position >= 0 && position <= width) {
            this.drag[vertical ? 'y' : 'x'] = position;
            this.value = value;
        }
    }

    _onDragEnd() {
        const {vertical} = this[style];
        this[style].currentPosition = this.drag[vertical ? 'y' : 'x'];
    }

    get drag() {
        return this.tag("Drag");
    }

    set value(v) {
        this._value = v;
        if (parseInt(v) === v) {
            this.tag("LabelCurrent").text = `${Math.ceil(v)}`;
        }

        if (isFunction(this[style].onChange)) {
            this[style].onChange(v);
        }
    }

    get value() {
        return this._value;
    }

    upv({min, max, width, currentPosition}) {
        this.patch({
            w: width, h: 80,
            LabelStart: {
                text: `${min}`
            },
            Slider: {
                Bar: {
                    Rounded:{
                        w: width
                    }
                },
                Drag: {
                    x: currentPosition
                }
            },
            LabelEnd: {
                x: width + 40,
                text: `${max}`
            }
        });
    }

    uph({min, max, width, currentPosition}) {
        this.patch({
            w: 80, h: width,
            LabelStart: {
                y: -40, mountX: 0.5, x: 28,
                text: `${min}`
            },
            Slider: {
                Bar: {
                    Rounded:{
                        h: width, w: 15
                    }
                },
                Drag: {
                    y: currentPosition, x: 8,
                    LabelCurrent: {
                        y: 0, mountX: 0, x: 30
                    }
                }
            },
            LabelEnd: {
                y: width + 40, mountX: 0.5, x: 28,
                text: `${max}`
            }
        });
    }

}