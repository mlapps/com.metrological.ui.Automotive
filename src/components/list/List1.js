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
import {Item} from "../index";
import {Automotive} from "@lightningjs/automotive";
import {findSlope} from "@lightningjs/automotive/src/analyzer";

export default class List extends Lightning.Component {
    static _template() {
        return {
            w: 1920, h: 400,
            Items: {
                y: 100, x: 30
            }
        };
    }

    _init() {
        const children = new Array(50).fill('').map((el, index) => {
            return {
                type: Item, x: index * 240, idx: index, startX: index * 240
            };
        });

        this.add(children);
    }

    add(children) {
        this.tag("Items").children = children;
    }

    _onDrag(recording) {
        const {delta} = recording;

        this.items.forEach((item) => {
            item.x = item.startX + delta.x;
        });
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

    swipe(recording, dir) {
        const force = Automotive.getHorizontalForce(recording.firstFinger);
        let power = force * 500 * dir;
        const bounds = this.items[dir === 1 ? 0 : this.items.length - 1].x + power;
        let outOfBounds = false;

        // prevent list going out of bounds
        if (dir === 1 && bounds > 0) {
            power = power - bounds;
            outOfBounds = true;
        } else if (dir === -1 && bounds < 1650) {
            const diff = 1650 - bounds;
            power += diff;
            outOfBounds = true;
        }

        // position items accordingly to force
        this.items.forEach((item) => {
            const position = item.x + (power);
            item.setSmooth('x', position, {
                duration: 0.5,
                timingFunction: outOfBounds ? 'cubic-bezier(.8,-0.5,0,2.19)' : 'ease-out'
            });
            item.startX = position;
        });
    }


    get items() {
        return this.tag("Items").children;
    }
}