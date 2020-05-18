//Gameover scene
class GameOver extends Phaser.Scene
{
    constructor()
    {
        super("gameOverScene");
    }

    preload()
    {
        this.load.audio('option3', './assets/option3.mp3');
    }

    create()
    {
        //keyboard information
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //Displayed text
        this.info = this.add.text(game.config.width / 2, game.config.height / 2, "You lost! Press S to start over.").setOrigin(0.5);
    }

    update()
    {
        //Restart the game if S is pressed
        if (Phaser.Input.Keyboard.JustDown(this.keyS))
        {
            this.sound.play('option3');
            this.scene.start("menuScene");
        }
    }
}