import {Registry} from "@lightningjs/sdk";
import {createFinger, createVector} from "./index";
import {sticky, config} from "../index";
import {distance} from "../helpers";
import Events from "../../Events";

export default (event) => {
    const starttime = Date.now();
    const touches = event.touches;
    const fingers = new Map();
    const len = touches.length;
    let endtime = Date.now();
    let isTap = false;
    /**
     * Is user long holding the screen
     * @type {boolean}
     */
    let isHold = false;

    /**
     * Did one of the fingers in this recording move
     * @type {boolean}
     */
    let moved = false;

    let isPinched = false;

    // register every finger
    for (let i = 0; i < len; i++) {
        const touch = touches[i];
        fingers.set(touch.identifier, createFinger(touch));
    }

    // we schedule a timeout in which this recording flags
    // itself as a 'hold'. A touchend can clear the timeout
    // if callback hasn't fired
    Registry.setTimeout(() => {
        if (!isHold) {
            isHold = true;
            Registry.setInterval(() => {
                sticky('_onDrag', record);
            }, 1);
        }
    }, config.get('flagAsHoldDelay'));

    /**
     * Update current with recording with data collected from
     * a touchmove event
     * @param event
     */
    const update = (event) => {
        const touches = event.touches;
        const len = touches.length;

        for (let i = 0; i < len; i++) {
            const touch = touches[i];
            if (fingers.has(touch.identifier)) {
                const finger = fingers.get(touch.identifier);
                // update new event data
                finger.update(touch);
            }
        }

        // if finger has moved we start emitting dragEvent early
        // drag always initiated by one finger
        if (!isHold && hasFingerMoved()) {
            isHold = true;
            moved = true;
            Registry.clearTimeouts();
            Registry.setInterval(() => {
                sticky('_onDrag', record);
            }, 1);
        }

        const pinch = getPinch();

        if (pinch) {
            Events.broadcast("pinch", pinch);
            isPinched = true;
        }
    };

    const hasFingerMoved = () => {
        for (let finger of fingers.values()) {
            if (finger.moved) {
                return true;
            }
        }
        return false;
    };

    const getPinch = () => {
        if (fingers.size !== 2) {
            return false;
        }
        let f1, f2;
        for (let finger of fingers.values()) {
            if (!f1) {
                f1 = finger;
            } else {
                f2 = finger;
            }
        }

        if (f1.queue.length < 10 || f2.queue.length < 10) {
            return false;
        }

        const {queue: f1q, start: f1s, position: f1p} = f1;
        const {queue: f2q, start: f2s, position: f2p} = f2;
        const f1hDis = distance(f1q[0], f1q[~~(f1q.length / 2)]);
        const f2hDis = distance(f2q[0], f2q[~~(f2q.length / 2)]);
        const f1Dis = distance(f1q[0], f1q[f1q.length - 1]);
        const f2Dis = distance(f2q[0], f2q[f2q.length - 1]);
        const sDis = distance(f1s, f2s);
        const cDis = distance(f1p, f2p);

        if (cDis > sDis && cDis - sDis > 30 && f1Dis > f1hDis && f2Dis > f2hDis) {
            const angle = Math.atan2(f1p.y - f2p.y, f1p.x - f2p.x);
            const start = Math.atan2(f1s.y - f2s.y, f1s.x - f2s.x);
            return {
                distance: cDis - sDis,
                angle: angle - start
            };
        }
        return false;
    };

    const record = {
        update,
        get starttime() {
            return starttime;
        },
        get fingers() {
            return fingers;
        },
        get fingersTouched() {
            return fingers.size;
        },
        set endtime(ms) {
            Registry.clearTimeouts();
            Registry.clearIntervals();
            if (isHold) {
                sticky('_onDragEnd', record);
            }
            endtime = ms;
        },
        get endtime() {
            return endtime;
        },
        get duration() {
            return endtime - starttime;
        },
        set isTap(v) {
            isTap = v;
        },
        get isTap() {
            return isTap;
        },
        set isHold(v) {
            isHold = v;
        },
        get moved() {
            return moved;
        },
        set moved(v) {
            moved = v;
        },
        get isHold() {
            return isHold;
        },
        /**
         * return if fingers have moved
         */
        hasFingerMoved() {
            for (let finger of fingers.values()) {
                if (finger.moved) {
                    return true;
                }
            }
            return false;
        },
        /**
         * Returns the first finger startposition
         */
        get startposition() {
            return fingers?.values()?.next()?.value?.start;
        },
        /**
         * returns delta between start and current position
         * for first finger
         */
        get delta() {
            const finger = fingers?.values()?.next()?.value;
            if (finger) {
                return finger.delta;
            } else {
                return createVector(0.0, 0.0);
            }
        }
    };
    return record;
}
