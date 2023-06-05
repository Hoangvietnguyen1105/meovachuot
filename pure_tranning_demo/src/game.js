import { Application, Sprite, Container } from 'pixi.js';
import { Scene } from './animated.js'
import { Ticker1 } from "./Ticker.js"
import { Tween1 } from "./Tween.js"
import { Poiter1 } from "./poiterEvent.js"
export class Game {
    static init() {
        this.app = new Application({
            width: 720,
            height: 800,
            backgroundColor: 0x1099bb,
        });
        const texture = new Container();

        document.body.appendChild(this.app.view);
        this.cat = Sprite.from("../assets/images/cat.png");
        this.cat.anchor.set(0.5);
        this.cat.x = this.app.screen.width;
        this.cat.y = this.app.screen.height;
        this.mouse = Sprite.from("../assets/images/mouse.png"); // Thay đổi tên biến thành this.mouse
        this.mouse.anchor.set(0.5);
        this.mouse.x = 0;
        this.mouse.y = 0;
        this.mouse2 = Sprite.from("../assets/images/mouse.png")
        this.mouse2.x = 0
        this.mouse2.y = 0
        texture.addChild(this.cat);
        texture.addChild(this.mouse); // Sử dụng this.mouse thay cho mouse
        let scene = new Scene()
        let ticker = new Ticker1(this.app.screen.width, this.app.screen.height)
        let tween = new Tween1(this.mouse2, this.app.screen.width / 2, this.app.screen.height / 2, 1000)
        let poiter = new Poiter1(this.app.screen.width, this.app.screen.height)
        this.app.stage.addChild(poiter)
        scene.positionSetup(this.app.screen.width, this.app.screen.height)
        // this.app.stage.addChild(scene)
        this.app.stage.addChild(texture);
        // this.app.stage.addChild(ticker)
        // this.app.stage.addChild(tween)
        // Biến lưu trữ vị trí chuột
        this.mousePosition = { x: 0, y: 0 };
        this.catPosition = { x: this.app.screen.width, y: this.app.screen.height }
        // Sự kiện lắng nghe nút mũi tên
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));

        // Game loop

        this.app.ticker.add(this.gameLoop.bind(this));
    }

    static handleKeyDown(event) {
        switch (event.keyCode) {
            case 37: // Arrow left
                this.moveLeft1 = true;
                console.log('left')
                this.mouse.rotation = Math.PI / 2
                break;
            case 38: // Arrow up
                this.moveUp = true;
                this.mouse.rotation = Math.PI

                break;
            case 39: // Arrow right
                this.moveRight = true;
                this.mouse.rotation = Math.PI / 2 + Math.PI

                break;
            case 40: // Arrow down
                this.moveDown = true;
                this.mouse.rotation = 0

                break;
        }
    }

    static handleKeyUp(event) {
        switch (event.keyCode) {
            case 37: // Arrow left
                this.moveLeft1 = false;
                break;
            case 38: // Arrow up
                this.moveUp = false;
                break;
            case 39: // Arrow right
                this.moveRight = false;
                break;
            case 40: // Arrow down
                this.moveDown = false;
                break;
        }
    }

    static gameLoop() {
        const speed = 5; // Tốc độ di chuyển của chuột

        if (this.moveLeft1) {
            this.mousePosition.x -= speed;
        }
        if (this.moveUp) {
            this.mousePosition.y -= speed;
        }
        if (this.moveRight) {
            this.mousePosition.x += speed;
        }
        if (this.moveDown) {
            this.mousePosition.y += speed;
        }

        // Giới hạn vị trí chuột trong khung canvas
        const maxX = this.app.screen.width;
        const maxY = this.app.screen.height;
        this.mousePosition.x = Math.max(0, Math.min(maxX, this.mousePosition.x));
        this.mousePosition.y = Math.max(0, Math.min(maxY, this.mousePosition.y));
        this.catPosition.x = Math.max(0, Math.min(maxX, this.catPosition.x));
        this.catPosition.y = Math.max(0, Math.min(maxY, this.catPosition.y));

        if (this.catPosition.x < this.mousePosition.x) {
            this.catPosition.x += speed / 2;
        }
        if (this.catPosition.x > this.mousePosition.x) {
            this.catPosition.x -= speed / 2;
        }
        if (this.catPosition.y < this.mousePosition.y) {
            this.catPosition.y += speed / 2;
        }
        if (this.catPosition.y > this.mousePosition.y) {
            this.catPosition.y -= speed / 2;
        }
        // Cập nhật vị trí chuột
        this.mouse.x = this.mousePosition.x;
        this.mouse.y = this.mousePosition.y;
        this.cat.x = this.catPosition.x;
        this.cat.y = this.catPosition.y;
    }
}

window.onload = function () {
    Game.init();
};
