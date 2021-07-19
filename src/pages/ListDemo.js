import {Lightning, Router} from "@lightningjs/sdk";
import {List1} from "../lib/automotive/components";

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

    swipeLeft(){
        Router.navigate("listdemo2")
    }

    swipeUp(){
        // block
    }

    swipeRight(){
        Router.navigate("buttonsdemo")
    }

    swipeDown(){
        // block
    }
}
