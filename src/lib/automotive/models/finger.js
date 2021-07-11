import createVector from "./vector";

export default (data)=>{
    let identifier = data.identifier;
    let startPosition = createVector(data.screenX, data.screenY);
    let currentPosition = startPosition;
    let delta = createVector(0.0, 0.0);
    let moveRegistered = false;
    let moved = false;

    const update = (data) =>{
        currentPosition = createVector(data.screenX, data.screenY);
        delta = currentPosition.subtract(
            startPosition
        );

        if (Math.abs(delta.x) > 40 || Math.abs(delta.y) > 40) {
            if (!moveRegistered) {
                moved = true;
            }
        }
    }
    return {
        update,
        get moved() {
            return moved;
        },
        get identifier() {
            return identifier;
        },
        get start() {
            return startPosition;
        },
        get end() {
            return currentPosition;
        },
        get position(){
            return currentPosition;
        },
        get delta() {
            return delta;
        }
    }
}