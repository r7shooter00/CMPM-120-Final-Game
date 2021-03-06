let config = {
	type: Phaser.CANVAS,
	width: 640,
	height: 480,
	scene: [Menu, Play, Upgrade, GameOver, Credits],
};

google: 
{
    families: ['Waiting for the Sunrise'];
}

let game = new Phaser.Game(config);

let enemyHealth, playerHealth, enemyStrength, playerStrength, enemyIntelligence, playerIntelligence, music, roundNumber;