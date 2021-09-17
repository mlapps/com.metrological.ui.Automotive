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
import {Automotive} from "@lightningjs/automotive";
const config = Symbol("config");

export default class RotatingButton extends Lightning.Component {
    static _template() {
        return {
            w:234, h:234,
            Shadow:{
                src: Utils.asset('images/rotate-bg.png'), scale:1.2, x: -100, y: -100
            },
            Button:{
                w:234, h:234,
                src: Utils.asset('images/rotating-button.png')
            }
        };
    }

    _init(){
        this.started = false;
    }

    get button(){
        return this.tag("Button")
    }

    get config(){
        return this[config];
    }

    set config(data) {
        // store config object in a special unique symbol
        // on the component instance
        this[config] = data;
    }

    _onDragStart(){
        if(this.started){
            return
        }

        let {px, py} = this.button.core._worldContext;

        this.center = Automotive.createVector(
            ~~(px) + (this.w / 2),
            ~~(py) + (this.h / 2)
        );

        this.a = 0;
        this.r = 0

        this.startAngle = 0;
        this.button.rotation = 0;

        this.started = true;
    }

    _onDrag(recording) {
        let {firstFinger:{position:{x,y}}} = recording;

        // apply rotation
        this.button.rotation = Math.atan2(
            ~~(y) - this.center.y, ~~(x) - this.center.x
        );
    }
}