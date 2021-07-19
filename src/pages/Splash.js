import {Lightning, Utils, Router} from "@lightningjs/sdk";

export default class Splash extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080,
            color: 0xff000000,
            Intro: {
                w: 1920, h: 1080,
                Background: {
                    alpha: 0, scale: 0.98,
                    src: Utils.asset("images/grill.png")
                },
                Logo: {
                    mount: 0.5, x: 950, y: 554, w: 382, h: 382, rtt: true,
                    Circle: {
                        src: Utils.asset("images/logo-circle.png")
                    },
                    Lightning: {
                        mountX: 0.5, x: 191, y: 68,
                        src: Utils.asset("images/logo-chrome.png")
                    }
                }
            }
        }
    }

    _init() {
        this._startupAnimation = this.animation({duration: 2, timingFunction: 'cubic-bezier(.5,.5,1,.5)', actions: [
                {t: 'Logo', p: 'alpha', v: {0: {v: 0}, 1: {v: 1}}},
                {t: 'Logo', p: 'scale', v: {0: {v: 0.8}, 0.75: {v: 1.07}, 1: {v: 1}}}
            ]});
        this._startupAnimation.start();

        this._loadAnimation = this.animation({duration: 1.8, delay: 0.4, timingFunction: 'cubic-bezier(.5,.5,1,.5)', actions: [
                {t: 'Circle', p: 'rotation', v: {so: 1, 0: {v: Math.PI * 2}, 0.5: {v: Math.PI}, 1: {v: Math.PI * 0.5}}}
            ]});
        this._loadAnimation.start();

        this._revealCarAnimation = this.animation({duration: 0.6, delay: 1.6, timingFunction: 'cubic-bezier(.5,.5,1,.5)', actions: [
                {t: 'Background', p: 'alpha', v: {so: 1, 0: {v: 0}, 1: {v: 1}}},
                {t: 'Background', p: 'scale', v: {so: 1, 0: {v: 0.98}, 1: {v: 1}}}
            ]});
        this._revealCarAnimation.start();

        this._outroAnimation = this.animation({duration: 0.4, delay: 0.6, timingFunction: 'cubic-bezier(.5,.5,1,.5)', actions: [
                {t: 'Intro', p: 'alpha', v: {so: 1, 0: {v: 1}, 1: {v: 0}}},
                {t: 'Intro', p: 'scale', v: {so: 1, 0: {v: 1}, 1: {v: 2}}}
            ]});
        this._revealCarAnimation.on("finish", ()=> {
            this._outroAnimation.start();
        });

        this._outroAnimation.on("finish", ()=> {
            Router.navigate("main");
        });
    }
}