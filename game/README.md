Dylan Vanelli - dgv3
I started this assignment on Feb. 10 and finished Feb. 12, and spent about 8 hours working on the game. I didn't discuss this assignment with any other students, but used a tutorial as a refrence for developing Breakout (https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript). The tutorial instructed me how to setup the game, but I added functionality and features on top of the base game in order to develop my ability to program in JavaScript.

Added features:
	- Level counter (after destroying all the bricks, the player levels up. They keep the same amout of lives throughout levels. The top level is recorded)
	- Best level (highest achieved level is stored)
	- Bricks have different values (bricks in the final row are worth 2 points, regular bricks are worth 1 point)

In order to keep track of level number and best level, I modified the way in which the game resets. The tutorial reccomends using document.reset(), which resets all game variables. To get around this issue, when the game ends, I regenerate the 2D array that stores bricks, redraw the bricks, and reset the ball and paddle to starting positons. This allows my version of the game to retain data from previous games since the page never resets.

Cheat sheet:

	Movement: move mouse left and right to control paddle.
	Points: 1 point for red, 2 points for gold.
	Level up: eliminate all visible blocks (blocks reset each level)
	Top level: displays highest achieved level after 3 lives are used.
	Lives: pkayer has 3 lives. A life is lost if the ball hits the bottom of the canvas without touching the paddle. If the player runs out of lives, the current level reverts back to 1.

