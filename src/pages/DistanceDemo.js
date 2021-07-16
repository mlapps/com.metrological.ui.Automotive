import {Lightning, Router} from "@lightningjs/sdk";
import {distance, smoothstep} from "../lib/automotive/helpers";


export default class DistanceDemo extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080,
            colorLeft: 0xff9796f0, colorRight: 0xfffbc7d4,
            ButtonsTitle:{
                x: 30, y: 20,
                text:{
                    text:'Automotive distance demo', fontFace:'julius'
                }
            },
            Shapes:{

            },
            Locators: {

            }
        }
    }

    _init(){
        this.count = 0;
        this.tag("Shapes").children = new Array(1200).fill('').map((el, index)=>{
            return {
                rect:true, x: index % 50 * 50, y: ~~(index/50)*50, w: 50, h: 50, idx: index,
                alpha:0.4
            }
        })
        this.animation({
            duration: 10, repeat: -1,
            actions: [
                {p: 'colorLeft', v: {0: 0xff9796f0, 0.5: 0xff536976, 1: 0xff9796f0}},
                {p: 'colorRight', v: {0: 0xfffbc7d4, 0.5: 0xff292E49, 1: 0xfffbc7d4}}
            ]
        }).start();
    }

    _onDrag(rec) {
        for (let finger of rec.fingers.values()) {
            this.addPoint(finger.position);
            const len = this.shapes.length;
            for(let i = 0; i < len; i++){
                const el = this.shapes[i];
                const dis = distance(finger.position, {x: el.x, y: el.y})
                if(dis < 450){
                    el.setSmooth("scale", Math.min(1, smoothstep(0, 450, dis) + 0.2), {duration:0.7, timingFunction:'ease-out'});
                }else{
                    el.scale = 1;
                }
            }
        }
    }

    addPoint(v) {
        const {x, y} = v;
        const l = this.stage.c({
            type: PositionPoint, x: x - 15, y: y - 15
        });

        this.locators.add(l);
        l.setSmooth('scale', 1.1, {duration: 0.3});
        l.setSmooth('alpha', 0, {duration: 0.3});
        l.transition('scale').on('finish', () => {
            this.locators.remove(l);
        });
    }


    pageTransition(){
        return "left";
    }

    swipeLeft(recording){
        if (recording.fingersTouched === 2) {
            Router.navigate("main")
        }
    }

    swipeUp(){
        // block
    }


    _onDoubleTap(){

    }


    swipeRight(recording){
        if (recording.fingersTouched === 2) {
            Router.navigate("rotatedcollision")
        }
    }

    swipeDown(){
        // block
    }


    get locators() {
        return this.tag('Locators').childList;
    }

    get shapes() {
        return this.tag('Shapes').children;
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

