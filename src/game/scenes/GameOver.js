/* START OF COMPILED CODE */
/* START-USER-IMPORTS */
import { EventBus } from "../EventBus";
/* END-USER-IMPORTS */

export default class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");

        /* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
    }

    /** @returns {void} */
    editorCreate() {
        // upKey
        const upKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.UP
        );

        // downKey
        const downKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.DOWN
        );

        // leftKey
        const leftKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.LEFT
        );

        // rightKey
        const rightKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.RIGHT
        );

        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;

        // background
        // const background = this.add.image(512, 384, "background");
        // background.alpha = 0.5;
        // background.alphaTopLeft = 0.5;
        // background.alphaTopRight = 0.5;
        // background.alphaBottomLeft = 0.5;
        // background.alphaBottomRight = 0.5;
        this.bg = this.add.tileSprite(0, 0, this.cameras.main.width , this.cameras.main.height * 2 , 'bg_2').setOrigin(0, 0);

        // textgameover
        this.textgameover = this.add.text(512, 384, "", {});
        this.textgameover.setOrigin(0.5, 0.5);
        this.textgameover.text = "Game Over";
        this.textgameover.setStyle({
            align: "center",
            color: "#ffffff",
            fontFamily: "Arial Black",
            fontSize: "64px",
            stroke: "#000000",
            strokeThickness: 8,
        });

        if (this.scene || this.textgameover) {
            console.log("start follow");
            this.cameras.main.startFollow(this.textgameover);
        }
    }

    textgameover;
    /** @type {Phaser.Input.Keyboard.Key} */
    upKey;
    /** @type {Phaser.Input.Keyboard.Key} */
    downKey;
    /** @type {Phaser.Input.Keyboard.Key} */
    leftKey;
    /** @type {Phaser.Input.Keyboard.Key} */
    rightKey;

    /* START-USER-CODE */

    // Write your code here

    create() {
        this.editorCreate();

        this.cameras.main.setBackgroundColor(0xff0000);

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("MainMenu");
    }

    update() {
        if (this.upKey.isDown) {
            this.textgameover.y -= 10;
            this.bg.y -= 10
            this.bg.tilePositionY -= 10;
        }
        if (this.downKey.isDown) {
            this.textgameover.y += 10;
            this.bg.y += 10
            this.bg.tilePositionY += 10;
        } else if (this.leftKey.isDown) {
            this.textgameover.x -= 10;
        } else if (this.rightKey.isDown) {
            this.textgameover.x += 10;
        }

        // this.bg.tilePositionY += 0.5;

    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
