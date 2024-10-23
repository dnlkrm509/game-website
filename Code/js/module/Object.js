export class Object {
    //declare the variables
    image;
    xPosition;
    yPosition;
    context;

    // define constructor of the class
    constructor(imgPath, context, xPosition, yPosition) {
        this.image = new Image();
        this.image.src = imgPath;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.context = context;
    }

    // draw object
    draw() {
        this.context.drawImage(this.image, this.xPosition, this.yPosition);
    }

    // checks if objects have collision and return true, otherwise false
    collision(object) {
        if(object.yPosition <= this.yPosition + this.image.height &&
            object.yPosition >= this.yPosition &&
            object.xPosition <= this.xPosition + this.image.width &&
            object.xPosition >= this.xPosition) {
            return true;
        }
        return false;
    }

}