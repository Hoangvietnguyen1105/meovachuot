import Tween from '@tweenjs/tween.js';
import { Container } from 'pixi.js';

export class Tween1 extends Container {
    constructor(sprite, targetX, targetY, duration) {
        super();
        this.sprite = sprite;
        this.addChild(sprite)
        this.targetX = targetX;
        this.targetY = targetY;
        this.duration = duration;
        this.tween = null
        this.start1()
        this.update()
    }

    start1() {
        this.tween = new Tween.Tween(this.sprite)
            .to({ x: this.targetX, y: this.targetY }, this.duration)
            .easing(Tween.Easing.Linear.None)
            .start();
    }

    update() {
        requestAnimationFrame(this.update.bind(this))
        Tween.update();
    }
}
