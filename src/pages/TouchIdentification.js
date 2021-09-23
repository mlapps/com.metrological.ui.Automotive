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

import {Lightning, Utils, Router} from "@lightningjs/sdk";
import {Automotive} from "@lightningjs/automotive";
import {settings} from "../lib/automotiveSettings";
import {Overlay} from "../components";

export default class Main extends Lightning.Component {
    static _template() {
        return {
            w: w=>w, h: h=>h, rect: true,
            colorBottom: 0xff000428, colorTop: 0xff004e92,
            Label: {
                alpha: 0.2,
                x: w=>w/2, y: h=>h/2, mount: 0.5,
                text: {
                    text: 'Touch identification demo', fontSize: 60, fontFace: 'julius'
                }
            },
            Interaction: {
                alpha: 0.8,
                x: w=>w/2, y: h=>h/2 + 60, mountX: 0.5,
                text: {
                    text: 'Interact with screen', fontSize: 50, fontFace: 'julius', textAlign:'center', lineHeight:70
                }
            },
            Positions:{
                x: 50, y:50,
                text:{
                    fontSize:25
                }
            },
            H:{
                rect: true, w: settings.w, h: 2,
                color:0xffffffff, alpha: 0
            },
            V:{
                rect: true, w: 2, h: settings.h,
                color:0xffffffff, alpha: 0
            },
            Overlay:{
                type: Overlay,
            },
            Draggable:{
                type: Draggable
            },
            SettingsIcon:{
                type: SettingButton,
                y: 70, x: settings.w - 140,
            }
        };

    }

    _init(){
        this.stage.on('position',({x, y, c})=>{
            this.patch({
                Label:{
                    smooth:{
                        alpha: c ? 0.2: 0
                    }
                },
                Interaction:{
                    smooth:{
                        alpha: c ? 1: 0
                    }
                },
                SettingsIcon:{
                    smooth:{
                        alpha: c ? 1: 0
                    }
                },
                Positions:{
                    text: c ? '' : `x: ${x.toFixed(5)} y: ${y.toFixed(5)}`,
                    smooth:{
                        alpha: c ? 0: 1
                    }
                },
                H:{ y:y + 35, alpha: c ? 0 : 1 },
                V:{ x:x + 35, alpha: c ? 0 : 1 }
            })
        })
    }

    _onSingleTap(recording) {
        this.tag("Interaction").text = "single tap";
    }

    _onDoubleTap(recording) {
        this.tag("Interaction").text = "double tap";
    }

    _onMultiTap(recording) {
        this.tag("Interaction").text = `${recording.fingersTouched} fingers tap`;
    }

    _onLongpress(recording) {
        this.tag("Interaction").text = `${recording.fingersTouched} fingers longpress`;
    }

    _onSwipeLeft(rec) {
        this.handleSwipe(rec, 'left');
    }

    _onSwipeRight(rec) {
        this.handleSwipe(rec, 'right');
    }

    _onSwipeUp(rec) {
        this.handleSwipe(rec, 'up');
    }

    _onSwipeDown(rec) {
        this.handleSwipe(rec, 'down');
    }

    handleSwipe(rec, dir) {
        const amount = rec.fingersTouched;
        const forceX = Automotive.getHorizontalForce(rec.firstFinger);
        const forceY = Automotive.getVerticalForce(rec.firstFinger);

        this.tag("Interaction").text = [
            `${amount} finger${amount > 1 ? 's' : ''} swipe ${dir}`,
            `force x: ${parseFloat(forceX).toFixed(6)}`,
            `force y: ${parseFloat(forceY).toFixed(6)}`
        ].join('\n');
    }

    _onPinch({pinch}) {
        this.tag("Interaction").text = `${pinch.distance > 0 ? 'spread' : 'pinch'}`;
    }
}

class SettingButton extends Lightning.Component {
    static _template() {
        return {
            w: 70, h:70,
            src: Utils.asset('images/touch-settings.png')
        }
    }

    _onSingleTap(){
        const page = Router.getActivePage();
        const {settings} = page.widgets;
        settings.patch({
            smooth:{
                alpha:[1, {duration:0.2}],
                x: [0, {duration:0.2}]
            }
        })
    }
}


class Draggable extends Lightning.Component {
    static _template(){
        return {
            w: 70, h: 70, x: 70, y: 70,
            TouchArea:{
                w: 70, h: 70,  alpha: 1,
                src: Utils.asset('images/move.png')
            }
        }
    }

    _onDragStart() {
        this.restore = {
            x: this.x, y: this.y
        };
        Automotive.lock([
            "_onDragStart",
            "_onDragEnd",
            "_onDrag"
        ])
    }

    _onDragEnd() {
        this.restore = {x: this.x, y: this.y};
        setTimeout(()=>{
            this.patch({
                smooth:{
                    x: 70, y: 70
                },
                Label:{
                    text:''
                }
            })
            this.animation({
                duration:0.2, actions:[
                    {p:'scale', v:{0:1, 0.5:0.4, 1:1}}
                ]
            }).start();
            this.stage.emit('position',{
                x: this.x, y: this.y, c: true
            })
        },500)

        Automotive.unlock([
            "_onDragStart",
            "_onDragEnd",
            "_onDrag"
        ])
    }

    _onDrag(recording) {
        const {x: startX, y: startY} = this.restore;
        const {x, y} = recording.delta;

        this.x = startX + x;
        this.y = startY + y;

        this.stage.emit('position',{
            x: this.x, y: this.y
        })
    }
}


