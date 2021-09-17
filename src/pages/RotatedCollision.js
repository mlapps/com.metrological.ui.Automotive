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
import {Button3} from "../components";
import {Automotive} from "@lightningjs/automotive";
import {rotatePoint, collide} from "@lightningjs/automotive/src/helpers";

export default class RotatedCollision extends Lightning.Component {
    static _template() {
        return {
            rect: true, w: 1920, h: 1080, colorBottom: 0xffc94b4b, colorTop: 0xff4b134f,
            Title: {
                x: 30, y: 20,
                text: {
                    text: 'Automotive rotate collision', fontFace: 'julius'
                }
            },
            Shapes: {
                Shape1: {
                    type: Button3, x: 1920 / 2 - 150, y: 1080 / 2 - 150, w: 300, h: 300, alpha: 0.2, rotation: 0.8
                },
                Shape2: {
                    type: Button3, x: 300, y: 400, w: 200, h: 200, pivot:0
                },
                Shape3: {
                    type: Button3, x: 500, y: 600, w: 100, h: 100, pivot:1
                },
                Shape4: {
                    type: Button3, x: 200, y: 880, w: 100, h: 100
                }
            },
            Locators: {
                w: 1920, h: 1080,
                type: Lightning.components.FastBlurComponent, amount: 2, content: {
                    Indicators:{

                    }
                }
            }
        };
    }

    _init() {
        this.shape1.animation({
            duration: 20, repeat: -1,
            actions: [
                {p: 'rotation', v: {sm: 0, 0: 0, 1: Math.PI * 2}},
                {p: 'x', v: {sm: 0.7, 0: 1920 / 2 - 150, 0.5: 1500, 1: 1920 / 2 - 150}},
                {p: 'y', v: {sm: 0.7, 0: 1080 / 2 - 150, 0.5: 700, 1: 1080 / 2 - 150}},
                {p: 'w', v: {sm: 0.7, 0: 300, 0.5: 700, 1: 300}},
                {p: 'w', v: {sm: 0.7, 0: 300 , 0.5: 50, 1: 300}},
            ]
        }).start();

        this.shape2.animation({
            duration: 10, repeat: -1,
            actions: [
                {p: 'rotation', v: {sm: 0, 0: 0, 1: Math.PI * 2}}
            ]
        }).start();

        this.shape3.animation({
            duration: 3, repeat: -1,
            actions: [
                {p: 'rotation', v: {sm: 0, 0: 0, 1: Math.PI * -2}}
            ]
        }).start();

        this.shape4.animation({
            duration: 15, repeat: -1,
            actions: [
                {p: 'rotation', v: {sm: 0, 0: 0, 1: Math.PI * -2}}
            ]
        }).start();

        this.sc = 0xffffffff;
    }

    addPoint(v) {
        const {x, y} = v;

        const l = this.stage.c({
            type: PositionPoint, x: x - 15, y: y - 15, color: this.sc
        });

        this.locators.add(l);
        l.setSmooth('scale', 2, {duration: 0.4});
        l.setSmooth('alpha', 0, {duration: 0.4});
        l.transition('scale').on('finish', () => {
            this.locators.remove(l);
        });
    }

    _onDrag(rec) {
        for (let finger of rec.fingers.values()) {
            this.addPoint(finger.position);

            this.intersect(this.shape1, finger);
            this.intersect(this.shape2, finger);
            this.intersect(this.shape3, finger);
            this.intersect(this.shape4, finger);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              }
    }

    intersect(shape, finger){
        const ctx = shape.core._worldContext;
        const origin = Automotive.createVector(
            shape.x + shape.w / 2,
            shape.y + shape.h / 2
        );
        const p1 = rotatePoint(origin.x, origin.y,  -shape.rotation, {
            x: ctx.px, y:ctx.py
        });
        const t = rotatePoint(origin.x, origin.y, -shape.rotation , {
            x: finger.position.x, y:finger.position.y
        });

        if(
            collide(
                shape.w,
                shape.h,
                0,
                p1.x + shape.w / 2,
                p1.y + shape.h / 2,
                t.x, t.y
            )
        ){
            shape.alpha = 1
            this.sc = 0xff000000;
        }else{
            shape.alpha = 0.2
            this.sc = 0xffffffff;
        }
    }

    _active() {

    }

    _inactive() {

    }

    pageTransition() {
        return "down";
    }

    get locators() {
        return this.tag('Locators').content.tag("Indicators").childList;
    }

    get shape1(){
        return this.tag("Shape1")
    }

    get shape2(){
        return this.tag("Shape2")
    }

    get shape3(){
        return this.tag("Shape3")
    }

    get shape4(){
        return this.tag("Shape4")
    }
}

class PositionPoint extends Lightning.Component {
    static _template() {
        return {
            rect: true, w: 30, h: 30, color: 0xffffffff,
            shader: {
                type: Lightning.shaders.RoundedRectangle, radius: 15
            }
        };
    }

}
