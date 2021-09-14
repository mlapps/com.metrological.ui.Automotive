import {Lightning, Router} from "@lightningjs/sdk";
import {settings} from "../lib/automotiveSettings";

const demos = [
    {label:'Touch identifcation', link:'touchidentification'},
    {label:'Buttons', link:'buttonsdemo'},
    {label:'List', link:'listdemo'},
    {label:'Custom List', link:'listdemo2'},
    {label:'Navigation (Pinch)', link:'mapdemo'},
    {label:'Rotated collision', link:'rotatedcollision'},
    {label:'Distance demo', link:'distancedemo'},
    {label:'Car Controls', link:'controlsdemo'}
]

const dimension = settings.h / 3;
const gap = (settings.w - (dimension * 4)) / 6;
const position = dimension + gap;

export default class DemoSelector extends Lightning.Component{
    static _template(){
        return {
            rect:true, w: w=>w, h: h=>h, alpha: 0,
            colorLeft: 0xee141e30, colorRight: 0xee243b55,
            Label:{
                y: 30, mountX: 0.5, x: w=>w/2,
                text:{
                    text:'Select a demo', fontFace:'julius'
                }
            },
            Demos:{
                x: gap, y: gap < 70 ? 70 : gap
            }
        }
    }

    _init(){
        this.demos = demos.map(({label, link}, index)=>{
            return {
                type: Demo,
                x: index % 4 * (position),
                y: Math.floor(index / 4) * (position) - 800,
                w: dimension,
                h: dimension,
                alpha:0,
                label, link,
                widget:this,
                zIndex:1
            }
        })
    }

    _active(){
        this.toggle(true);
    }

    _inactive(){
        this.toggle(false)
    }

    toggle(visible){
        this.demos.forEach((el, idx)=>{
            const pos = Math.floor(idx / 4) * position;
            el.patch({
                smooth:{
                    alpha:1,
                    y: [
                        visible ? pos + 60 : pos - 800, {
                            duration:0.3,
                            delay: idx * 0.02,
                            timingFunction: 'ease-out'
                        }]
                }
            })
        })

        const page = Router.getActivePage();
        page.visible = !visible;
    }

    get demos(){
        return this.tag("Demos").children;
    }

    set demos(v){
        this.tag("Demos").children = v;
    }
}

class Demo extends Lightning.Component{
    static _template(){
        return {
            rect:true, color: 0x705b86e5,
            Label:{ mount: 0.5, x: dimension / 2, y: dimension / 2,
                text:{
                    fontSize:30, textAlign:'center', fontFace:'julius',
                    wordWrapWidth: dimension - 20, lineHeight:40
                }
            }
        }
    }

    set label(v){
        this.tag("Label").text = v;
    }

    set link(v){
        this._link = v;
    }

    get link(){
        return this._link;
    }

    set widget(v){
        this._widget = v;
    }

    _onSingleTap(){
        this._widget.setSmooth('alpha', 0)
        Router.navigate(this._link)
    }

    /**
     * Force refresh
     * @private
     */
    _onLongpress(){
        // @todo: remove
        document.location.reload();
    }
}
