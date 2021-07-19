import {Lightning} from "@lightningjs/sdk";
import {NavigationItem, RadioItem, MultimediaItem, PhoneItem, SettingsItem} from "../components/items";
import List from "../components/List";

export default class Main extends Lightning.Component{
    static _template(){
        return {
            // rect: true, w: 1920, h: 1080, color: 0xff000000,
            List: {
                type: List,
                mountY: 0.5,
                y: 540,
                h: 500,
                w: 1920,
                listPosition: {x: 70},
                items: [
                    NavigationItem,
                    RadioItem,
                    MultimediaItem,
                    PhoneItem,
                    SettingsItem
                ]
            }
        }
    }

    _active() {
        this.tag("List").show(true);
    }
}