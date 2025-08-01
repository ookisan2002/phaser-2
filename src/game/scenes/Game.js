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

		// background
		const background = this.add.image(512, 384, "background");
		background.alpha = 0.5;

		// arcadeimage_1
		const arcadeimage_1 = this.physics.add.image(478, 572, "dish");
		arcadeimage_1.body.setOffset(72, 204);
		arcadeimage_1.body.setSize(407, 65, false);

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
