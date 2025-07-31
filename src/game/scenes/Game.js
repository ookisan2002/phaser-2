/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
import { EventBus } from '../EventBus';
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
		const shapes = this.cache.json.get('meetBall');
		console.log(shapes);

		// const ball = this.matter.add.sprite(400, 300, 'ball', null, { shape: shapes.meetBall });

		// background
		const background = this.add.image(512, 384, "background");
		background.alpha = 0.5;

		// meetBall_1
		const meetBall_1 = this.matter.add.image(453, 382, "meetBall_1",undefined, { shape: shapes.meetBall });
		// meetBall_1.setCircle(1036);
		meetBall_1.setBounce(0.1);
		meetBall_1.setFriction(0, 0, 0.5);
		meetBall_1.setScale(0.1596273824361197, 0.1596273824361197);
		meetBall_1.setDensity(1)

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();

		this.cameras.main.setBackgroundColor(0x00ff00);

		EventBus.emit('current-scene-ready', this);
	}

	changeScene() {
		this.scene.start('GameOver');
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
