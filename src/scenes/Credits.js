class Credits extends Phaser.Scene
{
    constructor()
    {
        super("credits");
    }

    preload()
    {
        this.load.image('background', './assets/background.png');
        this.load.image('background2', './assets/background2.png');
        this.load.image('background3', './assets/background3.png');
    }

    create()
    {
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        this.background2 = this.add.tileSprite(0, 0, 640, 480, 'background2').setOrigin(0, 0);
        this.background3 = this.add.tileSprite(0, 0, 640, 480, 'background3').setOrigin(0, 0);
        
        this.credits = this.add.text(game.config.width / 2, game.config.height / 2, "All assets, designs, and programming were done by: ").setOrigin(0.5);
        this.myName = this.add.text(game.config.width / 2, game.config.height / 2 + 25, "Alain Kassarjian").setOrigin(0.5);
        this.instructions = this.add.text(game.config.width / 2, game.config.height / 2 + 75, "Press S to go back to the Title screen").setOrigin(0.5);

        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }

    update()
    {
        if (Phaser.Input.Keyboard.JustDown(this.keyS))
        {
            this.scene.start("menuScene");
        }
    }
}