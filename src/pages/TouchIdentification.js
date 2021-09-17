/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 Metrological
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Lightning} from "@lightningjs/sdk";
import {Automotive} from "@lightningjs/automotive";

export default class Main extends Lightning.Component {
    static _template() {
        return {
            w: w=>w, h: h=>h, rect: true,
            colorBottom: 0xff000428, colorTop: 0xff004e92,
            Label: {
                alpha: 0.2,
                x: w=>w/2, y: h=>h/2, mount: 0.5,
                text: {
                    text: 'Touch identification demo', fontSize: 60, fontFace: 'julius'
                }
            },
            Interaction: {
                alpha: 0.8,
                x: w=>w/2, y: h=>h/2 + 60, mountX: 0.5,
                text: {
                    text: 'Interact with screen', fontSize: 50, fontFace: 'julius', textAlign:'center', lineHeight:70
                }
            }
        };
    }

    _onSingleTap(recording) {
        this.tag("Interaction").text = "single tap";
    }

    _onDoubleTap(recording) {
        this.tag("Interaction").text = "double tap";
    }

    _onMultiTap(recording) {
        this.tag("Interaction").text = `${recording.fingersTouched} fingers tap`;
    }

    _onLongpress(recording) {
        this.tag("Interaction").text = `${recording.fingersTouched} fingers longpress`;
    }

    _onSwipeLeft(rec) {
        this.handleSwipe(rec, 'left');
    }

    _onSwipeRight(rec) {
        this.handleSwipe(rec, 'right');
    }

    _onSwipeUp(rec) {
        this.handleSwipe(rec, 'up');
    }

    _onSwipeDown(rec) {
        this.handleSwipe(rec, 'down');
    }

    handleSwipe(rec, dir) {
        const amount = rec.fingersTouched;
        const forceX = Automotive.getHorizontalForce(rec.firstFinger);
        const forceY = Automotive.getVerticalForce(rec.firstFinger);

        this.tag("Interaction").text = [
            `${amount} finger${amount > 1 ? 's' : ''} swipe ${dir}`,
            `force x: ${parseFloat(forceX).toFixed(6)}`,
            `force y: ${parseFloat(forceY).toFixed(6)}`
        ].join('\n');
    }

    _onPinch({pinch}) {
        this.tag("Interaction").text = `${pinch.distance > 0 ? 'spread' : 'pinch'}`;
    }
}



