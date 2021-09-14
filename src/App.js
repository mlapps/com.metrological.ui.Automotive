import {Router, Utils} from "@lightningjs/sdk";
import {Automotive} from "@lightningjs/automotive";
import routes from "./lib/routes";
import {settings} from "./lib/automotiveSettings";
import {DemoSelector} from "./widgets";

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
                zIndex:999,
                DemoSelector:{ w: settings.w, h: settings.h,
                    type: DemoSelector
                }
            }
        };
    }

    _captureKey() {
        this.stage.drawFrame();
        this.core.render();
        return false;
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

    // _onDoubleTap(){
    //     this.tag("DemoSelector").setSmooth('alpha',0, {
    //         duration:0.3, delay:0
    //     })
    // }

    /**
     * Example of extending the Router.App StateMachine
     */
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

