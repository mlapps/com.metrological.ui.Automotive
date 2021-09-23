import {Lightning, Router, Utils} from "@lightningjs/sdk";
import {settings} from "../../lib/automotiveSettings";

export default class Main extends Lightning.Component {
    static _template(){
        return {
            rect:true, w: settings.w, h: settings.h,
            color: 0x00000000,
            Indicators:{
                children: []
            }
        }
    }

    _onSingleTap(rec){
        this.addPoint(rec.startposition);
        return false
    }

    get indicators(){
        return this.tag("Indicators").childList;
    }

    addPoint(v) {
        const {x, y} = v;
        const l = this.stage.c({
            type: PositionPoint, x: x - 5, y: y - 5
        });
        this.indicators.add(l);
        l.setSmooth('scale', 2, {duration: 1});
        l.setSmooth('alpha', 0, {duration: 1});
        l.transition('scale').on('finish', () => {
            this.indicators.remove(l);
        });
    }
}

class PositionPoint extends Lightning.Component {
    static _template() {
        return {
            rect: true, w: 10, h: 10, color: 0xffffffff,
            shader: {
                type: Lightning.shaders.RoundedRectangle, radius: 5
            }
        };
    }

}