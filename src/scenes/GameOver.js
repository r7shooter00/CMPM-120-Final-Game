//Gameover scene
class GameOver extends Phaser.Scene
{
    constructor()
    {
        super("gameOverScene");
    }

    preload()
    {
        this.load.image('background', './assets/background.png');
        this.load.image('background2', './assets/background2.png');
        this.load.image('background3', './assets/background3.png');
        this.load.audio('option3', './assets/option3.mp3');
        this.load.audio('game_over', './assets/game_over.wav');
    }

    create()
    {
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        this.background2 = this.add.tileSprite(0, 0, 640, 480, 'background2').setOrigin(0, 0);
        this.background3 = this.add.tileSprite(0, 0, 640, 480, 'background3').setOrigin(0, 0);

        this.game_over_music = this.sound.add('game_over');
        this.game_over_music.setVolume(1);
        this.game_over_music.play();

        this.option3 = this.sound.add('option3');
        this.option3.setVolume(0.25);

        //keyboard information
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //Displayed text
        this.info = this.add.text(game.config.width / 2, game.config.height / 2, "You lost! You made it to round " + roundNumber).setOrigin(0.5);
        this.info.setColor("red");
        this.info.setFontFamily('Waiting for the Sunrise');
        this.info.setFontSize(24);
        this.info.setPadding(10, 10, 10, 10);
        this.startOver = this.add.text(game.config.width / 2, game.config.height / 2 + 50, "Press S to start over").setOrigin(0.5);
        this.startOver.setColor("red");
        this.startOver.setFontFamily('Waiting for the Sunrise');
        this.startOver.setFontSize(24);
        this.startOver.setPadding(10, 10, 10, 10);
    }

    update()
    {
        //Restart the game if S is pressed
        if (Phaser.Input.Keyboard.JustDown(this.keyS))
        {
            this.game_over_music.stop();
            this.option3.play();
            this.scene.start("menuScene");
        }
    }
}