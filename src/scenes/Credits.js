class Credits extends Phaser.Scene
{
    constructor()
    {
        super("credits");
    }

    preload()
    {

    }

    create()
    {
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