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
        this.load.audio('option3', './assets/option3.mp3');
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

        this.healUses = Math.round(playerIntelligence / 3);

        //Keyboard button information
        this.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //All the text that is displayed
        this.roundNumberText = this.add.text(game.config.width / 2, 25, "Round " + roundNumber).setOrigin(0.5);
        this.enemyHealthDisplay = this.add.text(game.config.width / 1.375, game.config.height / 4, "Enemy Health: " + enemyHealth).setOrigin(0.5);
        this.playerHealthDisplay = this.add.text(game.config.width / 4, game.config.height / 4, "Player Health: " + playerHealth).setOrigin(0.5);
        this.attackCommand = this.add.text(game.config.width / 2, game.config.height / 2 + 70, "Attack").setOrigin(0.5);
        this.magicCommand = this.add.text(game.config.width / 2, game.config.height / 2 + 95, "Magic").setOrigin(0.5);
        this.playerResult = this.add.text(game.config.width / 2, game.config.height / 2 - 25, "").setOrigin(0.5);
        this.enemyResult = this.add.text(game.config.width / 2, game.config.height / 2, "").setOrigin(0.5);
        this.commandDescription = this.add.text(game.config.width / 2, game.config.height / 2 + 40, "").setOrigin(0.5);
        this.healCommand = this.add.text(game.config.width / 2, game.config.height / 2 + 70, "Heal").setOrigin(0.5);
        this.healCommand.visible = false;
        this.fireCommand = this.add.text(game.config.width / 2, game.config.height / 2 + 95, "Fire").setOrigin(0.5);
        this.fireCommand.visible = false;
        this.auraSlashCommand = this.add.text(game.config.width / 2, game.config.height / 2 + 120, "Aura Slash").setOrigin(0.5);
        this.auraSlashCommand.visible = false;
        this.backToMenu = this.add.text(game.config.width / 2, game.config.height / 2 + 145, "Back").setOrigin(0.5);
        this.backToMenu.visible = false;

        //Main commands. Commands are stored in array to later create menu behavior
        this.mainCommands = [this.attackCommand, this.magicCommand];

        //The index variables help keep track of the highlighted option
        this.mainCommandsIndex = 0;

        //Magic menu
        this.magicMenu = [this.healCommand, this.fireCommand, this.auraSlashCommand, this.backToMenu];
        this.magicMenuIndex = 0;

        //commands array stores all menus so that the code can be abstract with menu behavior
        this.commands = [this.mainCommands, this.magicMenu];
        this.commandsIndices = [this.mainCommandsIndex, this.magicMenuIndex];
        this.commandsIndex = 0;

        if(!music.isPlaying)
            music.play();

        this.option1 = this.sound.add('option1');
        this.option2 = this.sound.add('option2');
        this.option3 = this.sound.add('option3');
        this.option1.setVolume(0.25);
        this.option2.setVolume(0.25);
        this.option3.setVolume(0.25);
    }

    update()
    {
        //initializes the highlight for the options
        this.commands[this.commandsIndex][this.commandsIndices[this.commandsIndex]].setColor("green");

        //update to current health values
        this.playerHealthDisplay.text = "Player Health: " + playerHealth;
        this.enemyHealthDisplay.text = "Enemy Health: " + enemyHealth;

        //If player dies, go to game over scene
        if(playerHealth <= 0)
        {
            music.stop();
            this.scene.start("gameOverScene");
        }

        //if enemy dies, go to attribute upgrade scene
        else if(enemyHealth <= 0)
        {
            roundNumber++;

            //reset health values
            enemyHealth = this.startingEnemyHealth;
            playerHealth = this.startingPlayerHealth;

            //go to Upgrade scene
            this.scene.start("upgradeScene");
        }

        //All the menu behavior
        this.activeMenu(this.commandsIndex);

        //checks every frame for the highlighted command to print description
        this.findCommandDescription();
    }

    //deals regular damage to the enemy
    Attack()
    {
        let damage = 10 + Math.round(playerStrength * Math.random());
        enemyHealth -= damage;
        this.playerResult.setText("Player attacks and deals " + damage + " damage to the enemy!");
    }

    //switches to the magic menu
    Magic()
    {
        //turns off the options for the currently active menu
        for (let i = 0; i < this.commands[this.commandsIndex].length; i++)
            this.commands[this.commandsIndex][i].visible = false;

        //turns on the options for the magic menu
        this.healCommand.visible = true;
        this.fireCommand.visible = true;
        this.auraSlashCommand.visible = true;
        this.backToMenu.visible = true;

        //changes the active menu in the commands array to the magic menu
        this.commandsIndex = 1;
    }

    //heals player
    Heal()
    {
        if (this.healUses > 0)
        {
            let healAmount = 50 + Math.round(playerIntelligence * Math.random());
            playerHealth += healAmount;
            if (playerHealth > this.startingPlayerHealth)
                playerHealth = this.startingPlayerHealth;
            this.healUses--;
            this.playerResult.setText("Player casts heal and restores " + healAmount + " health! Has " + this.healUses + " heals left!");
        }
        else
        {
            this.playerResult.setText("Player's attempt to heal failed, due to having no heals left.");
        }
    }

    //Magic attack
    Fire()
    {
        let damage = Math.round(playerIntelligence * Math.random());
        enemyHealth -= damage;
        this.playerResult.setText("Player casts Fire and deals " + damage + " damage to the enemy!");
    }

    //Magic attack
    Aura_slash()
    {
        let damage = 10 + Math.round(playerStrength * Math.random() / 2) + Math.round( 0.75 * playerIntelligence * Math.random() / 2);
        enemyHealth -= damage;
        this.playerResult.setText("Player uses Aura Slash and deals " + damage + " damage to the enemy!");
    }

    //Takes the player back from the magic menu to the main menu
    BackToMenu()
    {
        for (let i = 0; i < this.commands[this.commandsIndex].length; i++)
            this.commands[this.commandsIndex][i].visible = false;

        this.attackCommand.visible = true;
        this.magicCommand.visible = true;
        this.commandsIndex = 0;
    }

    //Enemy AI
    enemyAction()
    {
        this.enemyAttack();
    }
    
    //deals damage to player
    enemyAttack()
    {
        let damage = 15 + Math.round(enemyStrength * Math.random());
        playerHealth -= damage;
        this.enemyResult.setText("Enemy deals " + damage + " damage to the player!");
    }

    //All menu behavior
    activeMenu(currentMenu)
    {
        //Menu selection behavior when pressing up
        if (Phaser.Input.Keyboard.JustDown(this.keyUP))
        {
            //if at the top of the menu, go to the bottom
            if(this.commandsIndices[currentMenu] === 0)
            {
                //unhighlight current option
                this.setToWhite(currentMenu);

                //highlight bottom option
                this.commandsIndices[currentMenu] = this.commands[currentMenu].length - 1;
                this.setToGreen(currentMenu);
            }

            //if not at the top of the menu
            else
            {
                //unhighlight current option
                this.setToWhite(currentMenu);

                //go up and highlight the next option
                this.commandsIndices[currentMenu]--;
                this.setToGreen(currentMenu);
            }

            //play sound for appropriate option
            for(let i = 0; i < this.commands[currentMenu].length; i++)
            {
                if(i % 3 === 0 && this.commands[currentMenu][i].style.color === "green")
                    this.option1.play();
                else if(i % 3 === 1 && this.commands[currentMenu][i].style.color === "green")
                    this.option2.play()
                else if(i % 3 === 2 && this.commands[currentMenu][i].style.color === "green")
                    this.option3.play()
            }
        }

        //Menu selection behavior when pressing down
        if (Phaser.Input.Keyboard.JustDown(this.keyDOWN))
        {
            //if at the bottom of the menu
            if(this.commandsIndices[currentMenu] === this.commands[currentMenu].length - 1)
            {
                //unhighlight current option
                this.setToWhite(currentMenu);

                //go to the top and highlight that option
                this.commandsIndices[currentMenu] = 0;
                this.setToGreen(currentMenu);
            }

            //if not at the bottom of the menu
            else
            {
                //unhighlight current option
                this.setToWhite(currentMenu);

                //go down and highlight the next option
                this.commandsIndices[currentMenu]++;
                this.setToGreen(currentMenu);
            }

            //play sound for appropriate option
            for(let i = 0; i < this.commands[currentMenu].length; i++)
            {
                if(i % 3 === 0 && this.commands[currentMenu][i].style.color === "green")
                    this.option1.play();
                else if(i % 3 === 1 && this.commands[currentMenu][i].style.color === "green")
                    this.option2.play();
                else if(i % 3 === 2 && this.commands[currentMenu][i].style.color === "green")
                    this.option3.play();
            }
        }

        //Selects highlighted command when enter is pressed
        if (Phaser.Input.Keyboard.JustDown(this.keyENTER))
        {
            //play sound for appropriate option
            for(let i = 0; i <this.commands[currentMenu].length; i++)
            {
                if(i % 3 === 0 && this.commands[currentMenu][i].style.color === "green")
                    this.option1.play();
                else if(i % 3 === 1 && this.commands[currentMenu][i].style.color === "green")
                    this.option2.play();
                else if(i % 3 === 2 && this.commands[currentMenu][i].style.color === "green")
                    this.option3.play();
            }

            //executes a command based on which command is highlighted, iterate through each menu.
            for(let i = 0; i < this.commands.length; i++)
            {
                //iterate through current menu
                for (let j = 0; j < this.commands[i].length; j++)
                {
                    //checks every command and sees if it's highlighted
                    if (this.commands[i][j].text === "Attack" && this.commands[i][j].style.color === "green")
                    {
                        this.Attack();
                        this.enemyAction();
                        this.commands[i][j].setColor("white");
                        return;
                    }
                    else if (this.commands[i][j].text === "Magic" && this.commands[i][j].style.color === "green")
                    {
                        this.Magic();
                        this.commands[i][j].setColor("white");
                        return;
                    }
                    else if (this.commands[i][j].text === "Heal" && this.commands[i][j].style.color === "green")
                    {
                        this.Heal();
                        this.enemyAction();
                        this.commands[i][j].setColor("white");
                        return;
                    }
                    else if (this.commands[i][j].text === "Fire" && this.commands[i][j].style.color === "green")
                    {
                        this.Fire();
                        this.enemyAction();
                        this.commands[i][j].setColor("white");
                        return;
                    }
                    else if (this.commands[i][j].text === "Aura Slash" && this.commands[i][j].style.color === "green")
                    {
                        this.Aura_slash();
                        this.enemyAction();
                        this.commands[i][j].setColor("white");
                        return;
                    }
                    else if (this.commands[i][j].text === "Back" && this.commands[i][j].style.color === "green")
                    {
                        this.BackToMenu();
                        this.commands[i][j].setColor("white");
                        return;
                    }
                }
            }
        }
    }

    //set current command back to white
    setToWhite(currentMenu)
    {
        this.commands[currentMenu][this.commandsIndices[currentMenu]].setColor("white");
    }

    //set current command to green
    setToGreen(currentMenu)
    {
        this.commands[currentMenu][this.commandsIndices[currentMenu]].setColor("green");
    }

    //iterates through the commands and prints the description of the highlighted command
    findCommandDescription()
    {
        for(let i = 0; i < this.commands.length; i++)
            {
                //iterate through current menu
                for (let j = 0; j < this.commands[i].length; j++)
                {
                    //checks every command and sees if it's highlighted
                    if (this.commands[i][j].text === "Attack" && this.commands[i][j].style.color === "green")
                    {
                        this.commandDescription.setText("Deals damage to the enemy based on strength");
                        return;
                    }
                    else if (this.commands[i][j].text === "Magic" && this.commands[i][j].style.color === "green")
                    {
                        this.commandDescription.setText("Access menu of magic commands");
                        return;
                    }
                    else if (this.commands[i][j].text === "Heal" && this.commands[i][j].style.color === "green")
                    {
                        this.commandDescription.setText("Heals your health based on intelligence");
                        return;
                    }
                    else if (this.commands[i][j].text === "Fire" && this.commands[i][j].style.color === "green")
                    {
                        this.commandDescription.setText("Deals damage to the enemy based on intelligence");
                        return;
                    }
                    else if (this.commands[i][j].text === "Aura Slash" && this.commands[i][j].style.color === "green")
                    {
                        this.commandDescription.setText("Deals damage to the enemy based on strength and intelligence");
                        return;
                    }
                    else if (this.commands[i][j].text === "Back" && this.commands[i][j].style.color === "green")
                    {
                        this.commandDescription.setText("Return to the main menu");
                        return;
                    }
                }
            }
    }
}