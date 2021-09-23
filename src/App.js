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

import {Router, Utils} from "@lightningjs/sdk";
import {Automotive} from "@lightningjs/automotive";
import routes from "./lib/routes";
import {settings} from "./lib/automotiveSettings";
import {DemoSelector, Settings} from "./widgets";

export default class App extends Router.App {
    static getFonts() {
        return [
            {family: 'julius', url: Utils.asset('fonts/JuliusSansOne-Regular.ttf'), descriptors: {}},
        ];
    }

    _setup() {
        // start automotive engine
        Automotive.start(
            this.application, settings
        );
        Router.startRouter(routes, this);
    }

    static _template() {
        return {
            w: settings.w, h: settings.h,
            rect: true, color:0x00ffffff,
            Background: {
                rect: true, color: 0xff000000, w: settings.w, h: settings.h,
                Label: {
                    color: 0xffffffff, mount: 0.5,
                    x: 960, y: 540,
                    text: {
                        fontFace: 'julius',
                        text: '', fontSize: 80
                    }
                }
            },
            // we MUST spread the base-class template
            // if we want to provide Widgets.
            ...super._template(),
            Pages: {
                forceZIndexContext: true, w: settings.w, h: settings.h
            },
            Widgets: {
                zIndex:996,
                DemoSelector:{
                    w: settings.w, h: settings.h,
                    type: DemoSelector
                },
                Settings:{
                    zIndex:997,
                    w: settings.w, h: settings.h,
                    type: Settings,
                    x: settings.w / 2
                }
            }
        };
    }

    _handleAppClose() {
        this.application.closeApp();
    }

    _onSwipe2fDown(){
        this.tag("DemoSelector").visible = true;
        this.tag("DemoSelector").setSmooth('alpha',1, {
            duration:0.3, delay:0
        })
    }

    static _states() {
        const states = super._states();
        states.push(
            class ExampleState extends this {
                $enter() {

                }

                $exit() {

                }
            }
        );
        return states;
    }
}

