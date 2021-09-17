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
import {List1} from "../components";

export default class ListDemo extends Lightning.Component{
    static _template(){
        return {
            rect:true, w: 1920, h: 1080,
            colorLeft: 0xff4568dc, colorRight: 0xffb06ab3,
            ListTitle:{
                x: 30, y: 20,
                text:{
                    text:'Automotive list demo', fontFace:'julius'
                }
            },
            List1:{
                type: List1
            },
            List2:{
                y: 400, type: List1
            }
        }
    }

    pageTransition(){
        return "left";
    }
    }
