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

export default class Button extends Lightning.Component {
    static _template() {
        return {
            rect: true, alpha: 0.5, collision: true,

        };
    }

    _active() {
        this.restore = {
            x: this.x, y: this.y
        };
        this._dragStarted = false;
    }


    _onSingleTap() {
        this.animation({
            duration: 0.4, actions: [
                {p: 'alpha', v: {0: 0.5, 0.2: 1, 1: 0.5}},
                {p: 'scale', v: {0: 1, 0.2: 2.5, 1: 1}},
            ]
        }).start();
    }


    /**
     * When one finger quickly double taps the same element
     * @private
     */
    _onDoubleTap() {
        this.animation({
            duration: 0.4, actions: [
                {p: 'alpha', v: {0: 0.5, 0.2: 1, 1: 0.5}},
                {p: 'scale', v: {0: 1, 0.2: 2.5, 1: 1}},
            ]
        }).start();
    }


    /**
     * Will be invoked if one or more fingers are pressing this element
     * for < 800ms. For  now the recording data holds data for all the fingers
     * so it could be that 3 fingers are touching 3 individual elements they all receive
     * this data
     * @param recording
     * @private
     */
    _onLongpress(recording) {
        this.animation({
            duration: 0.7, actions: [
                {p: 'alpha', v: {0: 1, 9: 1, 1: 0.2}},
                {p: 'scale', v: {0: 1, 0.5: 1.2, 1: 1}},
            ]
        }).start();
    }

    _onDrag(recording) {
        if (!this._dragStarted) {
            this.color = 0xffBAF2FF;
            this.animation({
                duration: 0.4, actions: [
                    {p: 'alpha', v: {0: 0.5, 1: 1}},
                    {p: 'scale', v: {0: 1, 0.2: 1.9, 1: 1}},
                ]
            }).start();
            this._dragStarted = true;
        }
        const {x, y} = recording.delta;
        const {x: startX, y: startY} = this.restore;
        this.x = startX + x;
        this.y = startY + y;
    }

    _onDragStart() { }

    _onDragEnd() {
        setTimeout(()=>{
            this.patch({
                smooth: {
                    x: [this.restore.x, {delay: 1}],
                    y: [this.restore.y, {delay: 1}]
                }
            });
            this._dragStarted = false;
        }, 800)

        this.color = 0xffffffff;
        this.alpha = 0.2;
    }

}