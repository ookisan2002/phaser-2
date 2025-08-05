/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import ItemButton from "../component/ItemButton";
import { EventBus } from "../EventBus";
/* END-USER-IMPORTS */

const ITEM_LIST = [
    {
        name: "meetBall_2",
        shape: "meetBall_2",
    },
    {
        name: "orange",
        shape: "orange",
    },
    {
        name: "crate",
        shape: "crate",
    },
    {
        name: "banana",
        shape: "banana",
    },
];
export default class MainMenu extends Phaser.Scene {
    constructor() {
        super("MainMenu");

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
        this.shapes = this.cache.json.get("itemShape");

        this.itemMeetBallButton = new ItemButton(
            this,
            900,
            100,
            100,
            100,
            ITEM_LIST[0],
            this.changeItem
        );

        this.itemOrangeButton = new ItemButton(
            this,
            900,
            220,
            100,
            100,
            ITEM_LIST[1],
            this.changeItem
        );

        this.itemCrateButton = new ItemButton(
            this,
            900,
            340,
            100,
            100,
            ITEM_LIST[2],
            this.changeItem
        );

        this.itemBananaButton = new ItemButton(
            this,
            900,
            460,
            100,
            100,
            ITEM_LIST[3],
            this.changeItem
        );

        this.currentItemType = ITEM_LIST[0];

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
    currentItemType;
    itemMeetBallButton;
    itemOrangeButton;
    itemCrateButton;
    itemBananaButton;

    /* START-USER-CODE */

    // Write your code here

    addBall = () => {
        const pointer = this.input.activePointer;
        const meetBall_1 = this.matter.add.image(
            pointer.x,
            90 + this.cameras.main.scrollY,
            this.currentItemType.name,
            undefined,
            {
                shape: this.shapes[this.currentItemType.shape],
            }
        );
        meetBall_1.body.pushable = false;
        meetBall_1.setBounce(0.3);

        meetBall_1.body.isStatic = true;
        this.currentBall = meetBall_1;
    };

    changeItem = (item) => {
        if (!this.currentBall) return;
        this.currentItemType = item;
        this.currentBall.destroy();
        this.currentBall = undefined;
        this.addBall();
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
                if (lastBall?.y < 400 + this.cameras.main.scrollY) {
                    // this.tweens.add({
                    //     targets: this.bg,
                    //     y: this.bg.y - 200,
                    //     tilePositionY: this.bg.tilePositionY - 200,
                    //     duration: 500, // Thời gian chạy tween (ms)
                    //     ease: "Cubic.easeOut", // Kiểu chuyển động
                    // });
                    // this.tweens.add({
                    //     targets: this.cameras.main,
                    //     scrollY: this.cameras.main.scrollY - 200,
                    //     duration: 500,
                    //     ease: "Cubic.easeOut",
                    // });
                    let startBgY = this.bg.y;
                    let startTileY = this.bg.tilePositionY;
                    let startScrollY = this.cameras.main.scrollY;
                    let delta = 200;
                    this.tweens.add({
                        targets: { value: 0 },
                        value: delta,
                        duration: 200,
                        ease: "Cubic.easeOut",
                        onUpdate: (tween) => {
                            let v = tween.getValue();
                            this.bg.y = startBgY - v;
                            this.bg.tilePositionY = startTileY - v;
                            this.cameras.main.scrollY = startScrollY - v;
                        },
						onComplete: () => {
							this.addBall();
						}
                    });
                }else {
					this.addBall();
				}
            }, 1000);
        });

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        if (this.logoTween) {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start("Game");
    }

    moveLogo(reactCallback) {
        if (this.logoTween) {
            if (this.logoTween.isPlaying()) {
                this.logoTween.pause();
            } else {
                this.logoTween.play();
            }
        } else {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: "Back.easeInOut" },
                y: { value: 80, duration: 1500, ease: "Sine.easeOut" },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (reactCallback) {
                        reactCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y),
                        });
                    }
                },
            });
        }
    }

    update() {
        // const speed = 10;
        // if (this.upKey?.isDown) {
        //     this.ball.setVelocityY(-speed);
        // } else if (this.downKey?.isDown) {
        //     // this.ball.y += speed;
        //     this.ball.setVelocityY(speed);
        // } else {
        //     this.ball.setVelocityY(0);
        // }
        //  if (this.leftKey?.isDown) {
        //     // this.ball.x -= speed;
        //     this.ball.setVelocityX(-speed);
        // } else if (this.rightKey?.isDown) {
        //     // this.ball.x += speed;
        //     this.ball.setVelocityX(speed);
        // } else {
        //     this.ball.setVelocityX(0);
        // }
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
