import Boot from './scenes/Boot';
import Game from './scenes/Game';
import GameOver from './scenes/GameOver';
import MainMenu from './scenes/MainMenu';
import Phaser from 'phaser';
import Preloader from './scenes/Preloader';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver
    ],
    physics: {
        // default: 'arcade',
        // arcade: {
        //     gravity: { y: 200 },
        //     debug: {
        //         collisionColor: 0xff0000,
        //         boundsColor: 0xff0000,
        //         staticLineColor: 0xff0000,
        //     },
        //     setBounds: true
        // }
        default: 'matter',
        matter: {
            gravity: { y: 1 },
            // debug: {
            //     collisionColor: 0xff0000,
            //     boundsColor: 0xff0000,
            //     staticLineColor: 0xff0000,
            // },
            setBounds: {
                top: false,
                left: true,
                right: true,
                bottom: true
            }
        }
    },
};

const StartGame = (parent) => {

    return new Phaser.Game({ ...config, parent });

}

export default StartGame;
