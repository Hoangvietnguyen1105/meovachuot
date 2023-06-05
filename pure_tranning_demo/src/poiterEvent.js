import { Container, FederatedPointerEvent, Sprite } from "pixi.js";

export class Poiter1 extends Container {
    constructor(screenWidth, screenHeight) {
        super();
        this.clampy = Sprite.from("../assets/images/mouse.png");

        this.clampy.anchor.set(0.5);
        this.clampy.x = screenWidth / 2;
        this.clampy.y = screenHeight / 2;
        this.addChild(this.clampy);

        // events that begin with "pointer" are touch + mouse
        this.clampy.on("pointertap", this.onClicky, this);

        // This only works with a mouse
        // this.clampy.on("click", this.onClicky, this);

        // This only work with touch
        // this.clampy.on("tap", this.onClicky, this);

        // Super important or the object will never receive mouse events!
        this.clampy.interactive = true;
    }

    onClicky(e) {
        console.log("You interacted with Clampy!")
        console.log("The data of your interaction is super interesting", e)

        // Global position of the interaction
        // e.global

        // Local (inside clampy) position of the interaction
        // clampy.toLocal(e.global)
        // or the "unsafe" way:
        // (e.target as DisplayObject).toLocal(e.global)
        // Remember Clampy has the 0,0 in its center because we set the anchor to 0.5!
    }
}