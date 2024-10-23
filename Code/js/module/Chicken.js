import { Object } from "./Object.js";

export class Chicken extends Object {
    startYPosition;
    startXPosition;
    keyEvent = "";
    gameOver;
    endReached = false;
    inMotion = false;

    constructor(imgPath, context, gameOver, xPosition, yPosition) {
        super(imgPath, context, xPosition, yPosition);
        this.startXPosition = xPosition;
        this.startYPosition = yPosition;
        this.gameOver = gameOver;
    }

    // A keaboard event detected
    setEvent(e) {
        if(!this.inMotion && this.endReached) {
            this.yPosition = this.startYPosition;
        }
        this.endReached = false;
        this.inMotion = true;
        this.keyEvent = e;
    }

    reset() {
        this.keyEvent = "";
        this.yPosition = this.startYPosition;
        this.xPosition = this.startXPosition;
        this.image.src = "../../images/chicken.png"
        this.endReached = false;
        this.inMotion = false;
        this.gameOver = false;
    }

    updatePic(path) {
        this.image.src = path;
    }

    draw() {
        if(this.inMotion) {
            if(this.keyEvent.key === "ArrowUp" && this.yPosition >= -this.yPosition) {
                this.yPosition -= 15;
            } else if(this.keyEvent.key === "ArrowDown" && this.yPosition < this.startYPosition) {
                this.yPosition += 15;
            }

            if(this.keyEvent.key === "ArrowRight" && this.xPosition <= 570) {
                this.xPosition += 10;
            } else if(this.keyEvent.key === "ArrowLeft" && this.xPosition >= 10) {
                this.xPosition -= 10;
            }

            this.inMotion = false;
        }


        if(this.yPosition < 0 && !this.gameOver) {
            this.endReached = true;
            super.draw(this.image, this.xPosition, this.yPosition);

            return true;
        } else {
            super.draw(this.image, this.xPosition, this.yPosition);

            return false;
        }
    
    }
}