import Phaser from "phaser";

export default class ItemButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height,item, onClick) {
        super(scene, x, y);

        // === 1. Nền màu đỏ 200x200 bo góc ===
        const bg = scene.add.graphics();
        bg.fillStyle(0xff0000, 1); // đỏ
        bg.fillRoundedRect(0, 0, width, height, 20); // bo góc 20px
        
        // === 2. Ảnh icon ở giữa nút ===
        const icon = scene.add.image(width / 2, height / 2, item.name); // tâm giữa
        icon.setDisplaySize(width * 0.6, height * 0.6); // kích thước ảnh
        icon.setOrigin(0.5);

        // === 3. Thêm vào container ===
        this.add(bg);
        this.add(icon);
        this.setDepth(1);
        

        // === 4. Tương tác ===
        this.setSize(width, height);
        this.setInteractive(new Phaser.Geom.Rectangle(width / 2, height / 2, width, height), Phaser.Geom.Rectangle.Contains);

        // this.on('pointerdown', (pointer) => {
        //     pointer.stopPropagation();
        //     console.log('clicked');
        // });

        this.setInteractive().on(
            Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
            (pointer, localX, localY, event) => {
                event.stopPropagation();
                onClick(item);
            }
        );

        this.setInteractive().on(
            Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,
            (pointer, localX, localY, event) => {
                event.stopPropagation();
                console.log("over");
            }
        );

        // === 5. Thêm vào scene ===
        scene.add.existing(this);
    }
}
