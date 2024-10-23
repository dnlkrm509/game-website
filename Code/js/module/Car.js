import { Object } from './Object.js';

export class Car extends Object {
    startXPosition;
    isInitial = true;
    isMoving = false;
    speed;

    constructor(imgPath, context, speed, xPosition, yPosition) {
        super(imgPath, context, xPosition, yPosition);
        this.startXPosition = xPosition;
        this.yPosition = yPosition;
        this.speed = speed;
    }

    // start moving if car's ceased 
    start() {
        if(!this.isMoving) {
            if(this.isInitial) {
                this.speed = 15;
                this.isInitial = false;
            }
            this.xPosition = this.startXPosition;
        }
        this.isMoving = true;
    }

    updateSpeed(isGameOver) {
        if(!isGameOver) {
            this.speed += 3;
        } else {
            this.speed = 15;
        }
    }

    reset() {
        this.isInitial = true;
        this.isMoving = false;
        this.start();
    }

    draw() {
        if(this.isMoving) {
            this.xPosition -= this.speed;
            if(this.xPosition <= -this.image.width) {
                this.isMoving = false;
                this.xPosition = this.startXPosition;
                this.start();
            }
        }
        super.draw(this.image, this.xPosition, this.yPosition);
    }
}