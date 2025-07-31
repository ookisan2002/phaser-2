/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { EventBus } from '../EventBus';
/* END-USER-IMPORTS */

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
		const upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);

		// downKey
		const downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

		// leftKey
		const leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

		// rightKey
		const rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

		// background
		this.add.image(512, 384, "background");

		// logo
		const logo = this.add.image(513, 384, "logo");

		// text
		const text = this.add.text(512, 460, "", {});
		text.setOrigin(0.5, 0.5);
		text.text = "Main Menu";
		text.setStyle({ "align": "center", "color": "#ffffff", "fontFamily": "Arial Black", "fontSize": "38px", "stroke": "#000000", "strokeThickness": 8 });

		// arcadeimage_1
		const arcadeimage_1 = this.matter.add.image(490.59865828313093, 627, "dish");
		arcadeimage_1.setInteractive(new Phaser.Geom.Rectangle(54, 144, 437.9634824280046, 134.58620911602011), Phaser.Geom.Rectangle.Contains);
		// arcadeimage_1.scaleX = 0.6308267769212006;
		// arcadeimage_1.scaleY = 0.6859023001165873;
		arcadeimage_1.setScale(0.6308267769212006, 0.6859023001165873);
		// arcadeimage_1.setOrigin(0.4959014083732127, 0.5);
		arcadeimage_1.body.allowGravity = false;
		// arcadeimage_1.body.collideWorldBounds = true;
		arcadeimage_1.body.isStatic = true;
		// arcadeimage_1.body.setOffset(62, 182);
		arcadeimage_1.setSize(420, 86, false);

		// ball
		// const ball = this.matter.add.image(455, 182, "ball");
		// ball.setInteractive(new Phaser.Geom.Circle(1220, 1242, 1028.9064512498664), Phaser.Geom.Circle.Contains);
		// ball.setCircle(1036);
		// ball.setBounce(1);
		// ball.setFriction(0, 0, 0);
		// ball.setScale(0.023363868896597875, 0.023363868896597875);
		// ball.setVelocity(10, 10);
		// ball.scaleX = 0.023363868896597875;
		// ball.scaleY = 0.023363868896597875;
		// ball.body.maxSpeed = 10000;
		// ball.body.gravity.y = 1;
		// ball.body.friction.x = 100;
		// ball.body.friction.y = 100;
		// ball.body.bounce.x = 0.5;
		// ball.body.bounce.y = 0.5;
		// ball.body.collideWorldBounds = true;
		// ball.body.setOffset(150, 249);

		this.logo = logo;
		this.arcadeimage_1 = arcadeimage_1;
		this.upKey = upKey;
		this.downKey = downKey;
		this.leftKey = leftKey;
		this.rightKey = rightKey;
		this.ballArray = []
		this.shapes = this.cache.json.get('meetBall');

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

	/* START-USER-CODE */

	// Write your code here

	addBall = () => {
		this.currentBall = undefined;
		const pointer = this.input.activePointer;
		// const meetBall_1 = this.matter.add.image(pointer.x, 50, "ball");
		const meetBall_1 = this.matter.add.image(pointer.x, 90, "meetBall_1", undefined, {
			shape: this.shapes.meetBall, restitution: 0.3, // độ nảy
			friction: 0.8,
			inertia: Infinity
		});
		meetBall_1.body.pushable = false
		// meetBall_1.setCircle(1036);
		meetBall_1.setBounce(0);
		meetBall_1.setFriction(0, 0, 0);
		// meetBall_1.setDensity(1);
		// meetBall_1.setScale(0.023363868896597875, 0.023363868896597875);
		meetBall_1.setScale(0.1596273824361197, 0.1596273824361197);
		// ball.setVelocity(10, 10);
		meetBall_1.body.isStatic = true;
		this.currentBall = meetBall_1;

	}

	create() {
		this.editorCreate();
		this.addBall();
		this.input.on("pointermove", (pointer) => {
			// this.addBall(pointer.x, pointer.y);
			this.currentBall.x = pointer.x;
		})

		this.input.on('pointerdown', () => {
			this.currentBall.body.isStatic = false;
			this.currentBall.body.pushable = true;
			// this.currentBall.body.isStatic = false;
			// this.matter.add.gameObject(this.currentBall);
			// this.currentBall.setCircle(1036);
			// this.currentBall.setBounce(1);
			// this.currentBall.setFriction(0, 0, 0);
			this.addBall();
		});

		EventBus.emit('current-scene-ready', this);

	}


	changeScene() {
		if (this.logoTween) {
			this.logoTween.stop();
			this.logoTween = null;
		}

		this.scene.start('Game');
	}


	moveLogo(reactCallback) {
		if (this.logoTween) {
			if (this.logoTween.isPlaying()) {
				this.logoTween.pause();
			}
			else {
				this.logoTween.play();
			}
		}
		else {
			this.logoTween = this.tweens.add({
				targets: this.logo,
				x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
				y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
				yoyo: true,
				repeat: -1,
				onUpdate: () => {
					if (reactCallback) {
						reactCallback({
							x: Math.floor(this.logo.x),
							y: Math.floor(this.logo.y)
						});
					}
				}
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
