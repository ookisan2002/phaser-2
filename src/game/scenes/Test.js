
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Test extends Phaser.Scene {

	constructor() {
		super("Test");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		this.add.image(515, 384, "background");

		// dish
		const dish = this.add.image(506, 694, "dish");
		dish.scaleX = 0.5;
		dish.scaleY = 0.5;

		// ball
		/** @type {Phaser.GameObjects.Image & { body: Phaser.Physics.Arcade.Body }} */
		const ball = this.add.image(498, 273, "ball");
		ball.setInteractive(new Phaser.Geom.Circle(1250, 1250, 1250), Phaser.Geom.Circle.Contains);
		ball.scaleX = 0.05;
		ball.scaleY = 0.05;
		this.physics.add.existing(ball, false);
		ball.body.setCircle(64);

		// arcadeimage_1
		const arcadeimage_1 = this.physics.add.image(705, 351, "ball");
		arcadeimage_1.scaleX = 0.05;
		arcadeimage_1.scaleY = 0.05;
		arcadeimage_1.body.setSize(2500, 2500, false);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
