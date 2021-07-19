import {Lightning, Router, Utils, Events} from "@lightningjs/sdk";

export default class MapDemo  extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080, color:0xff000000,
            Image:{
                w:1920, h: 1080, src: Utils.asset('images/map.jpg')
            },
            ButtonsTitle:{
                x: 30, y: 20,
                text:{
                    text:'Automotive Pinch zoom rotation demo', fontFace:'julius'
                }
            },
            Scale:{
                x: 30, y: 70, alpha:0.5,
                text:{ fontSize:18,
                    text:'', fontFace:'julius'
                }
            },
            Rotation:{
                x: 30, y: 95, alpha:0.5,
                text:{fontSize:18,
                    text:'', fontFace:'julius'
                }
            }
        }
    }

    _active(){

        Events.listen('App', 'pinch', ({distance, angle}) => {
            const level = (distance / 1920) * 6 + 1;
            this.tag("Image").scale = level > 0 ? level : 0.001;
            
            this.tag("Image").rotation = angle;
            this.tag("Scale").text = `scale: ${level + 1}`;
            this.tag("Rotation").text = `rotation: ${angle}`;
        });

        Events.listen('App', 'pinchEnd', (data) => {
            this.tag("Image").patch({
                smooth: {
                    scale:[1,{duration:0.8}], rotation:[0,{duration:0.8}]
                }
            })
            this.tag("Scale").text = ``;
            this.tag("Rotation").text = ``;
        });
    }

    _inactive() {
        Events.clear('App', 'pinch')
    }


    pageTransition(i, o){
        const outHash = o[Router.symbols.hash];
        if(outHash === "rotatedcollision"){
            return "right"
        }
        return "left"
    }

    swipeUp(recording){
        if(recording.fingersTouched === 4){
            Router.navigate("listdemo2")
        }
    }

    swipeLeft(){
        // block
    }

    swipeRight(){
        // block
    }

    swipeDown(recording){
        if(recording.fingersTouched === 4){
            Router.navigate("rotatedcollision")
        }
    }


}
