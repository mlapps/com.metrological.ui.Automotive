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

import {Lightning, Router} from "@lightningjs/sdk";
import {Button1} from "../components";
import {settings} from "../lib/automotiveSettings";

const dimension = settings.h / 4;
const gap = (settings.w - (dimension * 4)) / 6;
const position = dimension + gap;

export default class ButtonDemo extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: w=>w, h: h=>h,
            colorTop: 0xff330868, colorBl: 0xff330868, colorRight: 0xff30CFD0,
            ButtonsTitle:{
                x: 30, y: 20,
                text:{
                    text:'Automotive button demo', fontFace:'julius'
                }
            },
            Buttons:{
                y: 100,
                x: gap
            }
        }
    }

    _init(){
        this.count = 0;
        this.tag("Buttons").children = new Array(14).fill('').map((el, index)=>{
            return {
                type: Button1,
                x: index % 4 * position,
                y: ~~(index/4)* position,
                w: dimension,
                h: dimension, idx: index
            }
        })
    }

    pageTransition(){
        return "left";
    }
}
