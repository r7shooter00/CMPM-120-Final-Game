//Starting menu scene
class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        this.load.image('background', './assets/background.png');
        this.load.image('background2', './assets/background2.png');
        this.load.image('background3', './assets/background3.png');
        this.load.audio('option1', './assets/option1.mp3');
        this.load.audio('option2', './assets/option2.mp3');
        this.load.audio('music', './assets/music.wav');
        this.load.audio('music_intro', './assets/music_intro.wav');
    }

    create()
    {
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        this.background2 = this.add.tileSprite(0, 0, 640, 480, 'background2').setOrigin(0, 0);
        this.background3 = this.add.tileSprite(0, 0, 640, 480, 'background3').setOrigin(0, 0);

        music = this.sound.add('music');
        music.setLoop(true);
        music.setVolume(1);

        this.music_intro = this.sound.add('music_intro');
        this.music_intro.setLoop(true);
        this.music_intro.setVolume(1);
        this.music_intro.play()

        this.option1 = this.sound.add('option1');
        this.option1.setVolume(0.25);
        this.option2 = this.sound.add('option2');
        this.option2.setVolume(0.25);

        //Initialize starting stats
        enemyHealth = 50;
        playerHealth = 100;
        enemyStrength = 5;
        playerStrength = 5;
        enemyIntelligence = 5;
        playerIntelligence = 6;

        roundNumber = 1;

        //keyboard button information
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

        //Informational text
        this.text = this.add.text(game.config.width / 2, game.config.height / 2 - 100, "Plight of the Faithful").setOrigin(0.5);
        this.text.setFontFamily('Waiting for the Sunrise');
        this.text.setFontSize(48);
        this.text.setPadding(10, 10, 10, 10);
        this.goal = this.add.text(game.config.width / 2, game.config.height / 2 - 25, "Survive as long as you can against the immortal bird demon").setOrigin(0.5);
        this.goal.setFontFamily('Waiting for the Sunrise');
        this.goal.setFontSize(24);
        this.goal.setPadding(10, 10, 10, 10);
        this.playInstruction = this.add.text(game.config.width / 2, game.config.height / 2 + 50, "Press S to play").setOrigin(0.5);
        this.playInstruction.setFontFamily('Waiting for the Sunrise');
        this.playInstruction.setFontSize(24);
        this.playInstruction.setPadding(10, 10, 10, 10);
        this.creditsInstructions = this.add.text(game.config.width / 2, game.config.height / 2 + 100, "Press C for credits").setOrigin(0.5);
        this.creditsInstructions.setFontFamily('Waiting for the Sunrise');
        this.creditsInstructions.setFontSize(24);
        this.creditsInstructions.setPadding(10, 10, 10, 10);
        this.instructions = this.add.text(game.config.width / 2, game.config.height / 2 + 175, "Use the UP and DOWN arrows to browse commands, \n      then hit ENTER to execute command").setOrigin(0.5);
        this.instructions.setFontFamily('Waiting for the Sunrise');
        this.instructions.setFontSize(24);
        this.instructions.setPadding(10, 10, 10, 10);
    }

    update()
    {
        //When S is pressed, the game begins
        if (Phaser.Input.Keyboard.JustDown(this.keyS))
        {
            this.music_intro.stop();
            this.option1.play();
            this.scene.start("playScene");
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyC))
        {
            this.music_intro.stop();
            this.option2.play();
            this.scene.start("credits");
        }
    }
}