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

import {Lightning, Registry, Router, Utils} from "@lightningjs/sdk";
// @todo: correct import
import {Automotive} from "../../../../Lightning-Automotive";
import {settings} from "../lib/automotiveSettings";
import {Slider} from "../components";

const sliders = [

    {
        label:'Amount of pixels that will be extracted from registered touch x',
        min:-50, max: 50, steps:1, startValue: 0, prop:'viewportOffsetX'
    },
    {
        label:'Amount of pixels that will be extracted from registered touch y',
        min:-50, max: 50, steps:1, startValue: 0, prop:'viewportOffsetY'
    },

    {
        label:'The amount of milliseconds we keep the \'bridge\' open for new new fingers.',
        min:40, max: 250, steps:1, startValue: 110, prop:'bridgeCloseTimeout'
    },
    {
        label:'Max Amount of milliseconds between touchstart / end to be flagged',
        min:50, max: 1000, steps:1, startValue: 120, prop:'tapDelay'
    },
    {
        label:'ms for a touchstart can start after a tap flag to be flagged as a double tap',
        min:50, max: 1000, steps:1, startValue: 180, prop:'beforeDoubleTapDelay'
    },
    {
        label:'Minimal time (ms) to start flagging recording as a hold (i.e) drag',
        min:50, max: 1000, steps:1, startValue: 800, prop:'flagAsHoldDelay'
    },
    {
        label:'Max distance between 2 taps to be flagged as double tap',
        min:0, max: 500, steps:1, startValue: 40, prop:'doubleTapMaxDistance'
    },
    {
        label:'Minimal pixels fingers need to travel before it gets recognized as a swipe (x)',
        min:20, max: 500, steps:1, startValue: 30, prop:'swipeXTreshold'
    },
    {
        label:'Minimal pixels fingers need to travel before it gets recognized as a swipe (y)',
        min:20, max: 500, steps:1, startValue: 30, prop:'swipeYTreshold'
    },
    {
        label:'Amount of positions we keep in memory per finger during drag',
        min:10, max: 1000, steps:1, startValue: 250, prop:'touchQueueMaxLength'
    },
    {
        label:'Delay (ms) between execution of _onDrag event',
        min:0, max: 1000, steps:1, startValue: 1, prop:'dragInterval'
    }
]

const toggles = [ ]

export default class Settings extends Lightning.Component{
    static _template(){
        return {
            rect:true, w: settings.w, h: settings.h, alpha: 0,
            colorTop: 0xff000000, colorBottom: 0xff414345,
            Sliders:{
                x: 20, y: 40
            },
            Close:{ w: 70, h:70, zIndex: 99,
                type: CloseButton, y: 70,
                x: settings.w - 140,
            },
            Reloading:{
                zIndex: 998, rect: true, w: settings.w, h: settings.h, color: 0xff000000,
                alpha:0,
                Label:{
                    mount: 0.5, x: settings.w / 2, y: settings.h / 2,
                    text:{
                        text: 'Reloading browser..'
                    }
                }
            }
        }
    }

    _init(){
        this.tag("Sliders").children = sliders.map(({min, max, steps, prop, label, startValue}, idx)=>{
            const x = idx > Math.floor(sliders.length / 2) ? settings.w / 2.5 : 50

            return {
                ref: `S${idx}`, y: idx % 6 * 129, x,
                Label:{ mountY: 0.5, y: 50,
                    alpha: 0.2,
                    text:{
                        wordWrapWidth: settings.w / 3,
                        lineHeight:30,
                        text: label, fontSize:18
                    }
                },
                Slider:{
                    type: Slider, y: 90, x: 40,
                    config:{
                        min, max, width:settings.w / 4,
                        startValue, steps,
                        onChange(value){

                        }
                    }
                },
                R:{
                    w: settings.w / 3, h: 2, rect: true, color: 0x10ffffff, y: 145,
                }
            }
        })
    }

    _onMultiTap(recording){
        if(recording.fingers.size === 3){
            this.tag("Reloading").setSmooth('alpha', 1);
            Registry.setTimeout(()=>{
                document.location.reload();
            },1000)
        }
    }
}

class CloseButton extends Lightning.Component {
    static _template() {
        return {
            w: 70, h:70,
            src: Utils.asset('images/close-touch.png')
        }
    }

    _onSingleTap(){
        const page = Router.getActivePage();
        const {settings} = page.widgets;
        settings.patch({
            smooth:{
                alpha:[0, {duration:0.2}], x: [settings.w / 2, {duration:0.2}]
            }
        })
    }
}

