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

import {Lightning} from "@lightningjs/sdk";
import {Automotive} from "@lightningjs/automotive";
import {Item1} from "../index";
import {settings} from "../../lib/automotiveSettings";

export default class List extends Lightning.Component {
    static _template() {
        return {
            w: w=>w, h: 400,
            Items: {

            }
        };
    }

    _init() {
        this.itemWidth = 500;
        this.tag("Items").children = new Array(300).fill('').map((el, index) => {
            const x = index * (this.itemWidth / 1.107);
            return {
                type: Item1,
                w: 500, h: 600,
                x, startX: x,
                image: `https://picsum.photos/id/${index + 30}/500/600`,
                shader: {
                    type: Lightning.shaders.Perspective, rx: 0, fudge: .2
                }
            };
        });

        this.items.forEach(
            (item) => this.update(item)
        );
    }

    _active() {
        this._current = Automotive.createVector(
            this.tag("Items").x, this.tag("Items").y
        );
    }

    _onDrag(recording) {
        const {delta} = recording;
        this.items.forEach(
            (item) => this.update(item, item.startX + delta.x)
        );
    }

    _onDragEnd() {
        this.items.forEach((item) => {
            item.startX = item.x;
        });
    }

    _onSwipeLeft(recording) {
        this.swipe(recording, -1);
    }

    _onSwipeRight(recording) {
        this.swipe(recording, 1);
    }

    swipe(rec, dir){
        const force = Automotive.getHorizontalForce(rec.firstFinger);
        const power = force * 500 * dir;

        this.items.forEach((item) => {
            const position = item.x + (power);
            item.setSmooth('x', position, {
                duration: 0.9, timingFunction: 'ease-out'
            });
            item.transition('x').on('progress', () => this.update(item));
            item.startX = position;
        });
    }

    update(item, x) {
        // if x is set we update it's position
        // else we use it's current position
        // for calculation
        if (x) {
            item.x = x;
        } else {
            x = item.x;
        }

        const center = settings.w / 2 - (this.itemWidth / 2);
        const absDis = Math.abs(x - center);
        const offset = absDis / center;
        const zIndex = 40 - offset * 10;
        const scale = 1 - Automotive.smoothstep(0, center, absDis / 3);
        const alpha = Automotive.smoothstep(0.1, 0.7, scale) + 0.3;

        if(absDis < settings.w / 2){
           item.shader.rx = (x - center) / (settings.w / 2);
        }

        item.patch({
            zIndex, scale, alpha
        });
    }

    get items() {
        return this.tag("Items").children;
    }
}