//Main gameplay scene
class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        //loads image assets
        this.load.image('player', './assets/player.png');
        this.load.image('enemy', './assets/enemy.png');

        //loads audio assets
        this.load.audio('option1', './assets/option1.mp3');
        this.load.audio('option2', './assets/option2.mp3');
    }

    create()
    {
        //player and enemy sprites
        this.player = this.add.sprite(game.config.width / 4, game.config.height / 4 + 50, 'player');
        this.enemy = this.add.sprite(game.config.width / 1.375, game.config.height / 4 + 50, 'enemy');

        //starting health is kept track of to
        //help reset the values to the appropriate numbers
        this.startingPlayerHealth = playerHealth;
        this.startingEnemyHealth = enemyHealth;

        //Keyboard button information
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //All the text that is displayed
        this.enemyHealthDisplay = this.add.text(game.config.width / 1.375, game.config.height / 4, "Enemy Health: " + enemyHealth).setOrigin(0.5);
        this.playerHealthDisplay = this.add.text(game.config.width / 4, game.config.height / 4, "Player Health: " + playerHealth).setOrigin(0.5);
        this.instructions = this.add.text(game.config.width / 2, game.config.height / 2, "Use the UP and DOWN arrows to browse commands, \n      then hit ENTER to execute command").setOrigin(0.5);
        this.attackCommand = this.add.text(game.config.width / 2, game.config.height / 2 + 50, "Attack").setOrigin(0.5);
        this.magicCommand = this.add.text(game.config.width / 2, game.config.height / 2 + 100, "Magic").setOrigin(0.5);

        //commands are stored in array to later create menu behavior
        this.commands = [this.attackCommand, this.magicCommand];

        //keeps track of highlighted option
        this.commandsIndex = 0;

        //initializes the highlight for the options
        this.commands[this.commandsIndex].setColor("green");
    }

    update()
    {
        //update to current health values
        this.playerHealthDisplay.text = "Player Health: " + playerHealth;
        this.enemyHealthDisplay.text = "Enemy Health: " + enemyHealth;

        //If player dies, go to game over scene
        if(playerHealth <= 0)
        {
            this.scene.start("gameOverScene");
        }

        //if enemy dies, go to attribute upgrade scene
        else if(enemyHealth <= 0)
        {
            //reset health values
            enemyHealth = this.startingEnemyHealth;
            playerHealth = this.startingPlayerHealth;

            //go to Upgrade scene
            this.scene.start("upgradeScene");
        }

        //Menu selection behavior when pressing up
        if (Phaser.Input.Keyboard.JustDown(this.keyUP))
        {
            //if at the top of the menu, go to the bottom
            if(this.commandsIndex === 0)
            {
                //unhighlight current option
                this.commands[this.commandsIndex].setColor("white");
                
                //highlight bottom option
                this.commandsIndex = this.commands.length - 1;
                this.commands[this.commandsIndex].setColor("green");
            }

            //if not at the top of the menu
            else
            {
                //unhighlight current option
                this.commands[this.commandsIndex].setColor("white");

                //go up and highlight the next option
                this.commandsIndex--;
                this.commands[this.commandsIndex].setColor("green");
            }

            //play sound for appropriate option
            for(let i = 0; i < this.commands.length; i++)
            {
                if(i === 0 && this.commands[i].style.color === "green")
                    this.sound.play('option1');
                else if(i === 1 && this.commands[i].style.color === "green")
                    this.sound.play('option2');
            }
        }

        //Menu selection behavior when pressing down
        if (Phaser.Input.Keyboard.JustDown(this.keyDOWN))
        {
            //if at the bottom of the menu
            if(this.commandsIndex === this.commands.length - 1)
            {
                //unhighlight current option
                this.commands[this.commandsIndex].setColor("white");

                //go to the top and highlight that option
                this.commandsIndex = 0;
                this.commands[this.commandsIndex].setColor("green");
            }

            //if not at the bottom of the menu
            else
            {
                //unhighlight current option
                this.commands[this.commandsIndex].setColor("white");

                //go down and highlight the next option
                this.commandsIndex++;
                this.commands[this.commandsIndex].setColor("green");
            }

            //play sound for appropriate option
            for(let i = 0; i < this.commands.length; i++)
            {
                if(i === 0 && this.commands[i].style.color === "green")
                    this.sound.play('option1');
                else if(i === 1 && this.commands[i].style.color === "green")
                    this.sound.play('option2');
            }
        }

        //Selects highlighted command when enter is pressed
        if (Phaser.Input.Keyboard.JustDown(this.keyENTER))
        {
            //play sound for appropriate option
            for(let i = 0; i <this.commands.length; i++)
            {
                if(i === 0 && this.commands[i].style.color === "green")
                    this.sound.play('option1');
                else if(i === 1 && this.commands[i].style.color === "green")
                    this.sound.play('option2');
            }

            //Enemy randomly chooses to attack or use magic
            if(Math.random() > 0.4)
            {
                this.enemyAttack();
            }
            else
            {
                this.enemyMagic();
            }

            //executes a command based on which command is highlighted
            if(this.commands[0].style.color === "green")
            {
                this.Attack();
            }
            else if(this.commands[1].style.color === "green")
            {
                this.Magic();
            }
        }
    }

    //deals damage to the enemy
    Attack()
    {
        enemyHealth -= 10 + Math.round(playerStrength * Math.random());
    }

    //heals player
    Magic()
    {
        playerHealth += 10 + Math.round(playerIntelligence * Math.random());
    }

    //deals damage to player
    enemyAttack()
    {
        playerHealth -= 10 + Math.round(enemyStrength * Math.random());
    }

    //heals enemy
    enemyMagic()
    {
        enemyHealth += 10 + Math.round(enemyIntelligence * Math.random());
    }
}