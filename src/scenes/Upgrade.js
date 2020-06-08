//Attribute upgrade scene
class Upgrade extends Phaser.Scene
{
    constructor()
    {
        super("upgradeScene");
    }

    preload()
    {
        this.load.image('background', './assets/background.png');
        this.load.image('background2', './assets/background2.png');
        this.load.image('background3', './assets/background3.png');

        //loads audio assets
        this.load.audio('option1', './assets/option1.mp3');
        this.load.audio('option2', './assets/option2.mp3');
        this.load.audio('option3', './assets/option3.mp3');
    }

    create()
    {
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
        this.background2 = this.add.tileSprite(0, 0, 640, 480, 'background2').setOrigin(0, 0);
        this.background3 = this.add.tileSprite(0, 0, 640, 480, 'background3').setOrigin(0, 0);

        //keyboard button information
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //Displayed text
        this.info = this.add.text(game.config.width / 2, game.config.height / 2 - 100, "You defeated the enemy! Select an attribute to upgrade").setOrigin(0.5);
        this.info.setFontFamily('Waiting for the Sunrise');
        this.info.setFontSize(24);
        this.info.setPadding(10, 10, 10, 10);
        this.healthOption = this.add.text(game.config.width / 2, game.config.height / 2, "Health").setOrigin(0.5);
        this.healthOption.setFontFamily('Waiting for the Sunrise');
        this.healthOption.setFontSize(24);
        this.healthOption.setPadding(10, 10, 10, 10);
        this.strengthOption = this.add.text(game.config.width / 2, game.config.height / 2 + 50, "Strength").setOrigin(0.5);
        this.strengthOption.setFontFamily('Waiting for the Sunrise');
        this.strengthOption.setFontSize(24);
        this.strengthOption.setPadding(10, 10, 10, 10);
        this.intelligenceOption = this.add.text(game.config.width / 2, game.config.height / 2 + 100, "Intelligence").setOrigin(0.5);
        this.intelligenceOption.setFontFamily('Waiting for the Sunrise');
        this.intelligenceOption.setFontSize(24);
        this.intelligenceOption.setPadding(10, 10, 10, 10);

        //Array created to help create menu behavior
        this.commands = [this.healthOption, this.strengthOption, this.intelligenceOption];
        this.commandsIndex = 0;

        //initialize the selection process by highlighting the first option
        this.commands[this.commandsIndex].setColor("red");

        this.option1 = this.sound.add('option1');
        this.option2 = this.sound.add('option2');
        this.option3 = this.sound.add('option3');
        this.option1.setVolume(0.25);
        this.option2.setVolume(0.25);
        this.option3.setVolume(0.25);
    }

    update()
    {
        //The up and down branches behave exactly like in play
        if (Phaser.Input.Keyboard.JustDown(this.keyUP))
        {
            if(this.commandsIndex === 0)
            {
                this.commands[this.commandsIndex].setColor("white");
                this.commandsIndex = this.commands.length - 1;
                this.commands[this.commandsIndex].setColor("red");
            }
            else
            {
                this.commands[this.commandsIndex].setColor("white");
                this.commandsIndex--;
                this.commands[this.commandsIndex].setColor("red");
            }

            for(let i = 0; i < this.commands.length; i++)
            {
                if(i === 0 && this.commands[i].style.color === "red")
                    this.option1.play();
                else if(i === 1 && this.commands[i].style.color === "red")
                    this.option2.play();
                else if(i === 2 && this.commands[i].style.color === "red")
                    this.option3.play();
            }
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyDOWN))
        {
            if(this.commandsIndex === this.commands.length - 1)
            {
                this.commands[this.commandsIndex].setColor("white");
                this.commandsIndex = 0;
                this.commands[this.commandsIndex].setColor("red");
            }
            else
            {
                this.commands[this.commandsIndex].setColor("white");
                this.commandsIndex++;
                this.commands[this.commandsIndex].setColor("red");
            }

            for(let i = 0; i < this.commands.length; i++)
            {
                if(i === 0 && this.commands[i].style.color === "red")
                    this.option1.play();
                else if(i === 1 && this.commands[i].style.color === "red")
                    this.option2.play();
                else if(i === 2 && this.commands[i].style.color === "red")
                    this.option3.play();
            }
        }

        //Selects the highlighted option when enter is pressed
        if (Phaser.Input.Keyboard.JustDown(this.keyENTER))
        {
            for(let i = 0; i < this.commands.length; i++)
            {
                if(i === 0 && this.commands[i].style.color === "red")
                    this.option1.play();
                else if(i === 1 && this.commands[i].style.color === "red")
                    this.option2.play();
                else if(i === 2 && this.commands[i].style.color === "red")
                    this.option3.play();
            }

            //If health is highlighted when enter is pressed
            if(this.commands[0].style.color === "red")
            {
                //increase player maximum health
                playerHealth += 10;

                //increment enemy stats
                enemyHealth += 5;
                enemyStrength += 1;
                enemyIntelligence += 1;

                //continue the game
                this.scene.start("playScene");
            }

            //If Strength is highlighted when enter is pressed
            else if(this.commands[1].style.color === "red")
            {
                //Increase player strength
                playerStrength += 5;

                //increment enemy stats
                enemyHealth += 5;
                enemyStrength += 1;
                enemyIntelligence += 1;

                //continue the game
                this.scene.start("playScene");
            }

            //If intelligence is highlighted when enter is pressed
            else if(this.commands[2].style.color === "red")
            {
                //Increase player intelligence
                playerIntelligence += 3;

                //increment enemy stats
                enemyHealth += 5;
                enemyStrength += 1;
                enemyIntelligence += 1;

                //continue the game
                this.scene.start("playScene");
            }
        }
    }
}