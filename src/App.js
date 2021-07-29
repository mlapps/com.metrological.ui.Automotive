import {Router, Utils, Events} from "@lightningjs/sdk";
import {initAutomotive} from "./lib/automotive";
import routes from "./lib/routes";

import {getConfigMap} from "./lib/automotive/helpers";

export default class App extends Router.App {
    static getFonts() {
        return [
            {family: 'Light', url: Utils.asset('fonts/KoHo-Light.ttf'), descriptors: {}},
            {family: 'Regular', url: Utils.asset('fonts/KoHo-Regular.ttf'), descriptors: {}},
            {family: 'SemiBold', url: Utils.asset('fonts/KoHo-SemiBold.ttf'), descriptors: {}},
            {family: 'Bold', url: Utils.asset('fonts/KoHo-Bold.ttf'), descriptors: {}},
            {family: 'CorporateABold', url: Utils.asset('fonts/Corporate-A-Bold.ttf'), descriptors: {}}
        ];
    }

    _setup() {
        initAutomotive(this.application, getConfigMap());
        Router.startRouter(routes, this);
    }

    static _template() {
        return {
            // we MUST spread the base-class template
            // if we want to provide Widgets.
            ...super._template(),
            Widgets: {}
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

