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

import {Lightning, Router, Utils} from "@lightningjs/sdk";
import {settings} from "../lib/automotiveSettings";

export default class MapDemo  extends Lightning.Component {
    static _template() {
        return {
            rect: true, w: w=>w, h: h=>h, color: 0xff000000,
            Image: {
                w: w=>w, h: h=>h, src: Utils.asset('images/map.jpg')
            },
            ButtonsTitle: {
                x: 30, y: 20,
                text: {
                    text: 'Automotive Pinch zoom rotation demo', fontFace: 'julius'
                }
            },
            Scale: {
                x: 30, y: 70, alpha: 0.5,
                text: {
                    fontSize: 18,
                    text: '', fontFace: 'julius'
                }
            },
            Rotation: {
                x: 30, y: 95, alpha: 0.5,
                text: {
                    fontSize: 18,
                    text: '', fontFace: 'julius'
                }
            }
        }
    }


    _onPinch(record) {
        const {distance, angle} = record.pinch;
        const level = (distance / settings.w) * 6 + 1;
        this.tag("Image").scale = level > 0 ? level : 0.001;

        this.tag("Image").rotation = angle;
        this.tag("Scale").text = `scale: ${level + 1}`;
        this.tag("Rotation").text = `rotation: ${angle}`;
    }

    _onPinchEnd() {
        this.tag("Image").patch({
            smooth: {
                scale: [1, {duration: 0.8}], rotation: [0, {duration: 0.8}]
            }
        })
        this.tag("Scale").text = ``;
        this.tag("Rotation").text = ``;
    }

    _inactive() {

    }


    pageTransition(i, o) {
        return "left"
    }
}
