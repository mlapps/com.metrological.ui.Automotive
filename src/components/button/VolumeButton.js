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

import {Utils} from "@lightningjs/sdk";
import {RotatingButton} from "../index";
import {isFunction} from "@lightningjs/automotive/src/helpers";

// define unique style symbol
const style = Symbol("style");

export default class VolumeButton extends RotatingButton{
    static _template() {
        return {
            w:234, h:234,
            Shadow:{
                src: Utils.asset('images/rotate-bg.png'), scale:1.2, x: -100, y: -100
            },
            Button:{
                w:234, h:234,
                src: Utils.asset('images/volume-button.png')
            },
            Indicators:{
                x: 10
            },
            Value:{ x: 115, y: 60, mountX: 0.5,
                alpha: 0.2,
                text:{
                    text:'0', fontSize:63, fontFace: 'julius'
                }
            },
            Label:{
                x: 115, y: 128, mountX: 0.5,
                text:{
                    text:'volume', fontSize:18, fontFace: 'julius'
                }
            }
        };
    }

    _init(){
        super._init();

        let numElements = 42, angle = 2.45;
        let step = (Math.PI * 1.45) / (numElements-1);
        let children = [];

        for(let i = 0; i < numElements; i++) {
            let x = 220/2 + 170 * Math.cos(angle);
            let y = 220/2 + 170 * Math.sin(angle);

            const rotation = angle-0.5*Math.PI;
            children.push({
                type: Indicator, x:x-6, y:y-10, rotation,
                color: i < 30?0xff2db5e5:0xfff7070a,
                alpha: 0.2
            })
            angle += step;
        }

        this.tag("Indicators").children = children;
    }

    _onDrag(recording) {
        let {firstFinger:{position:{x,y}}} = recording;

        // grab config from base class
        const {dmin, dmax, vmin, vmax, onChange} = this.config;

        const r =  Math.atan2(
            ~~(y) - this.center.y, ~~(x) - this.center.x
        );

        // clamp arc tangent between 0 - 360
        let d = (r *  180 / Math.PI + 450) % 360

        // lock rotation if configured
        if(dmin && dmax && (d < dmin || d > dmax)){
            return;
        }

        // get normalized value
        const nv = (d - dmin) / (dmax - dmin);
        const v = (vmax - vmin) * nv + vmin;

        // apply rotation on element
        this.button.rotation = r;

        // call hook
        if(isFunction(onChange)){
            onChange(v, nv);
        }

        this.update(v, nv);
    }

    update(v, nv){
        this.value = v;

        const len = this.indicators.length;
        const max = len * nv;

        for(let i = 0; i < len; i++){
            this.indicators[i].setSmooth('alpha', i < max ? 1 : 0.2)
        }
    }

    get value(){
        return this._value;
    }

    set value(v){
        this._value = v;
        this.tag("Value").text = `${Math.round(v)}`
    }

    get indicators(){
        return this.tag("Indicators").children
    }



}


class Indicator extends lng.Component{
    static _template(){
        return {
            rect: true, w:10, h:25
        }
    }
}