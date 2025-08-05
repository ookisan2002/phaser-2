/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { EventBus } from "../EventBus";
/* END-USER-IMPORTS */

export default class Game extends Phaser.Scene {
    constructor() {
        super("Game");

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

        // background
        this.bg = this.add
            .tileSprite(
                0,
                0,
                this.cameras.main.width,
                this.cameras.main.height,
                "bg_2"
            )
            .setOrigin(0, 0);
        // this.bg.setDispla

        // logo
        const logo = this.add.image(513, 384, "logo");

        // text
        const text = this.add.text(512, 460, "", {});
        text.setOrigin(0.5, 0.5);
        text.text = "Main Menu";
        text.setStyle({
            align: "center",
            color: "#ffffff",
            fontFamily: "Arial Black",
            fontSize: "38px",
            stroke: "#000000",
            strokeThickness: 8,
        });

        // arcadeimage_1
        const arcadeimage_1 = this.matter.add.image(
            490.59865828313093,
            627,
            "dish"
        );

        arcadeimage_1.setRectangle(407, 65);
        arcadeimage_1.setDisplayOrigin(270, 230);
        arcadeimage_1.setScale(0.6308267769212006, 0.6859023001165873);
        arcadeimage_1.body.allowGravity = false;
        arcadeimage_1.body.isStatic = true;

        this.logo = logo;
        this.arcadeimage_1 = arcadeimage_1;
        this.upKey = upKey;
        this.downKey = downKey;
        this.leftKey = leftKey;
        this.rightKey = rightKey;
        this.ballArray = [];
        this.shapes = this.cache.json.get("meetBallShape2");

        this.events.emit("scene-awake");
    }

    /** @type {Phaser.GameObjects.Image} */
    logo;
    /** @type {Phaser.Physics.Arcade.Image} */
    arcadeimage_1;
    /** @type {Phaser.Physics.Arcade.Image} */
    // ball;
    /** @type {Phaser.Input.Keyboard.Key} */
    upKey;
    /** @type {Phaser.Input.Keyboard.Key} */
    downKey;
    /** @type {Phaser.Input.Keyboard.Key} */
    leftKey;
    /** @type {Phaser.Input.Keyboard.Key} */
    rightKey;

    ballArray;
    currentBall;
    shapes;

    bg;

    /* START-USER-CODE */

    // Write your code here

    addBall = () => {
        const pointer = this.input.activePointer;
        // const meetBall_1 = this.matter.add.image(pointer.x, 50, "ball");
        const meetBall_1 = this.matter.add.image(
            pointer.x,
            90 + this.cameras.main.scrollY,
            "meetBall_2",
            undefined,
            {
                shape: this.shapes.meetBall_2,
            }
        );
        meetBall_1.body.pushable = false;
        meetBall_1.setBounce(0);

        meetBall_1.body.isStatic = true;
        this.currentBall = meetBall_1;
    };

    create() {
        this.editorCreate();
        this.addBall();
        this.input.on("pointermove", (pointer) => {
            if (!this.currentBall) return;
            this.currentBall.x = pointer.x;
        });

        this.input.on("pointerdown", () => {
            if (!this.currentBall) return;
            this.currentBall.body.isStatic = false;
            this.currentBall.body.pushable = true;
            this.ballArray.push(this.currentBall);
            this.currentBall = undefined;
            setTimeout(() => {
                console.log(this.ballArray[this.ballArray.length - 1].y);
                const lastBall = this.ballArray[this.ballArray.length - 1];
                if (lastBall?.y < 250 + this.cameras.main.scrollY) {
                    this.tweens.add({
                        targets: this.bg,
                        y: this.bg.y - 200,
                        tilePositionY: this.bg.tilePositionY - 200,
                        duration: 500, // Thời gian chạy tween (ms)
                        ease: "Cubic.easeOut", // Kiểu chuyển động
                    });
                    this.tweens.add({
                        targets: this.cameras.main,
                        scrollY: this.cameras.main.scrollY - 200,
                        duration: 500,
                        ease: "Cubic.easeOut",
                    });
                }
                this.addBall();
            }, 1000);
            // this.addBall();
        });

        EventBus.emit("current-scene-ready", this);
    }
    changeScene() {
        this.scene.start("GameOver");
    }

    update() {
        // this.bg.tilePositionY += 0.5;
    }
    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

