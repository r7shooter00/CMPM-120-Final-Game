//Starting menu scene
class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        this.load.audio('option1', './assets/option1.mp3');
    }

    create()
    {
        //Initialize starting stats
        enemyHealth = 50;
        playerHealth = 100;
        enemyStrength = 5;
        playerStrength = 5;
        enemyIntelligence = 5;
        playerIntelligence = 5;

        //keyboard button information
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        //Informational text
        this.text = this.add.text(game.config.width / 2, game.config.height / 2 - 50, "Game title pending").setOrigin(0.5);
        this.text = this.add.text(game.config.width / 2, game.config.height / 2 + 50, "Press S to play").setOrigin(0.5);
    }

    update()
    {
        //When S is pressed, the game begins
        if (Phaser.Input.Keyboard.JustDown(this.keyS))
        {
            this.sound.play('option1');
            this.scene.start("playScene");
        }
    }
}