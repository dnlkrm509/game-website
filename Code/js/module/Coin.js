import { Object } from "./Object.js";

export class Coin extends Object {
    
    update(xPos, yPos) {
        this.xPosition = xPos;
        this.yPosition = yPos;
        super.draw(this.image, this.xPosition, this.yPosition);
    }
}