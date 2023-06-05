import { Container, Sprite, Ticker } from "pixi.js";
export class Ticker1 extends Container {

    constructor(screenWidth, screenHeight) {
        super();

        this.clampy;
        this.clampyVelocity = 5;
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        this.clampy = Sprite.from("../assets/images/cat.png");

        this.clampy.anchor.set(0.5);
        this.clampy.x = this.screenWidth / 2; // we start it at 0
        this.clampy.y = this.screenHeight / 2;
        this.addChild(this.clampy);

        // See the `, this` thingy there? That is another way of binding the context!
        Ticker.shared.add(this.update, this);

        // If you want, you can do it the bind way
        // Ticker.shared.add(this.update.bind(this));
    }

    update(deltaTime) {
        this.clampy.x = this.clampy.x + this.clampyVelocity * deltaTime;
        if (this.clampy.x > this.screenWidth) {
            // Woah there clampy, come back inside the screen!
            this.clampy.x = 0;
        }
    }
} 