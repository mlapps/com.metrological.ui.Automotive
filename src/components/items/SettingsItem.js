import {Lightning, Utils} from "@lightningjs/sdk";
import ExpandableItem from "./ExpandableItem";

export default class SettingsItem extends ExpandableItem {

    static _template() {
        return {
            w: 364, h: 500, rtt: true, rect: true, color: 0xff293241,
            shader: {type: Lightning.shaders.RoundedRectangle, radius: 4},
            Background: {
                w: 364, y: 250, h: 250, rect: true,
                colorTop: 0x00293241, colorBottom: 0x50E500A4
            }
        };
    }

}