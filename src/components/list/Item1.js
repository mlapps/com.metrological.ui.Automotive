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

import {Img, Lightning} from "@lightningjs/sdk";

export default class Item extends Lightning.Component {
    static _template() {
        return {
            rect: true, alpha: 0.4, collision: true, w: 220, h: 300,
            Label: {
                mount: 0.5, x: 110, y: 150,
                text: {
                    text: '', fontSize: 25
                }
            }
        };
    }

    _init() {
        this.scaled = false;
        this.on("txError",()=>{
            this.patch({
                rect: true, alpha:1, color: 0xff000000
            })
        })
    }

    _onSingleTap() {
        this.animation({
            duration: 0.4, actions: [
                {p: 'y', v: {0: 0, 0.2: -100, 9: -100, 1: 0}}
            ]
        }).start();
    }

    /**
     *
     * @param recording - recording data
     * @private
     */
    _onMultiTap(recording) {
        this.animation({
            duration: 0.4, actions: [
                {p: 'y', v: {0: 0, 0.2: 100, 9: 100, 1: 0}}
            ]
        }).start();
    }

    /**
     * When one finger quickly double taps the same element
     * @private
     */
    _onDoubleTap() {
        if(!this.scaled){
            this.oldZ = this.zIndex;
        }

        this.animation({
            duration: 0.4, actions: [
                {p: 'scale', v: {0: this.scaled ? 4 : 1, 1: this.scaled ? 1 : 4}},
                {p: 'zIndex', v: {0: this.scaled ? this.zIndex : this.oldZ, 1: this.scaled ? this.oldZ : 99999}},
            ]
        }).start();
        this.scaled = !this.scaled;

    }

    set idx(v) {
        this.tag("Label").text = `${v}`;
    }

    set image(v) {
        this._image = v;
        this.texture = Img(v).original();
    }
}