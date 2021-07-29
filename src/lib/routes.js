import {
    Main, Splash
} from '@/pages';
import {Utils} from "@lightningjs/sdk";


export default {
    boot: (params) => {
        return new Promise((resolve, reject) => {
            resolve();
        });
    },
    root: async () => {
        return {
            path: "splash"
        };
    },
    beforeEachRoute: (from, to) => {
        return Promise.resolve(true);
    },
    afterEachRoute: async (req) => {
        // console.log("AFTER:", req)
    },
    routes: [
        {
            path: 'splash',
            component: Splash,
        },
        {
            path: 'main',
            component: Main,
            before: async (page) => {
                page.data = await fetch(Utils.asset("data/test.json"))
                    .then(response => response.json())
                    .then((json) => {
                        return json;
                    });
            }
        }
    ]
};