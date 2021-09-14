import {
    Main, ButtonDemo, ListDemo, CarouselDemo, MapDemo, RotatedCollision, DistanceDemo, ControlsDemo, TouchIdentification
} from '@/pages';

export default {
    root: 'main',
    routes: [
        {
            path: 'main',
            component: Main,
            widgets: ['DemoSelector']
        },{
            path: 'touchidentification',
            component: TouchIdentification,
        }, {
            path: 'buttonsdemo',
            component: ButtonDemo,
        }, {
            path: 'listdemo',
            component: ListDemo,
        },{
            path: 'listdemo2',
            component: CarouselDemo,
        }, {
            path: 'mapdemo',
            component: MapDemo,
        }, {
            path: 'rotatedcollision',
            component: RotatedCollision,
        }, {
            path: 'distancedemo',
            component: DistanceDemo,
        }, {
            path: 'controlsdemo',
            component: ControlsDemo,
        }
    ],
    boot: async ()=>{
        const appName = document.createElement('meta');
        appName.name = 'apple-mobile-web-app-title';
        appName.content = 'Automotive Ui';
        document.head.appendChild(appName);

        const touchIcon = document.createElement('link');
        touchIcon.rel = 'apple-touch-icon';
        touchIcon.href = 'static/homescreen-icon.png';
        document.head.appendChild(touchIcon);

        const color = document.createElement('link');
        color.name = 'apple-mobile-web-app-status-bar-style';
        color.content = '#03082E';
        document.head.appendChild(color);
    }
};