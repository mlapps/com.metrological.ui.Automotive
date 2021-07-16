import {
    Main, Splash
} from '@/pages';


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
        }
    ]
};