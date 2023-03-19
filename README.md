# The One Minute Game
Link: https://editor.p5js.org/ft2063/sketches/tdpuJutuN

# An overview of the code and how it works

This is a game in which the user is penalized for touching other groups of objects. Users should avoid other groups od of objects that fly in the sky. The user wins the game if he survives alive for 60 seconds. Otherwise, the user loses. 

Gaming is a valuable learning opportunity because it allows you to visualize coding ideas and people can enjoy the product of your code. In order to learn how to use the play.js library I watched a series of tutorials by Matthew Bardin, who explains the most important concepts of the libraries: sprite objects, groups, and collisions

# Color Scheme 
The color scheme of the game aims to be futuristic and simple. The color scheme is used to give meaning to the entities in the game:
Red for enemies to indicate danger. 
Green for the user indicating life and correctness. 
Gray for clouds to resemble a threat or something negative. 
White background because white has been proven to be one of the eyes that most please the eye. It is a color widely used in web development because it gives a sense of equilibrium and elegance. 
Lives are displayed in the top right corner not to distract the user. 


# Code Explanation
Groups are created as follows:

Let enemy: 
In setup: enemy = new Group();
In draw function: 

if (counter%200 ==0){
   
    let c = createSprite(
      0, random(height),
      random(13,20), random(10, 15));
    c.shapeColor = color(255,0,0);
    enemy.add(c); // add new enemy sprite to enemy group
  }

They are declared as global variables, identified as group in the setup. At regular interval a new sprite object is created and added to the enemy group

Groups are sliding as follows: 

	 for (let i = 0; i < enemy.length; i++) {
    enemy[i].position.x += enemy[i].width * random(0.1, 0.3);
    if (enemy[i].position.x > width) {
      enemy[i].position.x = 0;
    }
  }
For each of the elements in the group their position is shifted a bit randomly to the right. If they exit the widow width restart at x = 0

User control the players as follows: 

		 player.velocity.x = (mouseX - player.position.x) * 0.2;
 player.velocity.y = (mouseY - player.position.y) * 0.2;

The velocity is updated depending on the position of the mouse and the current position of the object, the factor diminishes this to have a delay. 

Collision is handled as follows:

 enemy.collide(player, function(enemySprite, playerSprite) {
    enemySprite.remove(); // remove the collided enemy sprite
    lives -= 1;
    console.log(lives);
    
  });

If there is a collision between the enemy and the player then return a function that removes that enemy sprite and decreases the user life. Life is console logged for debugging.
Similarly, upon cloud collision, the size of the player sprite is increased that minimizing the chances of survival due to increased surface area. 


Time is handled as follows:

  let endTime = millis();
    let duration = (endTime - startTime) / 1000; // calculate time elapsed in seconds
  
  if (lives > 0 && duration<60) {
    text(lives, width - 30, 45);
  } 
   else if (lives > 0 && duration>=60) {
    text("You Win!", width/2, height/2);
    setTimeout(function() {
    noLoop();
  }, 1000); 
  } 
  
  else {
`		//code for game over
 }
}

The function millis() takes track of the number of milliseconds elapsed. The duration is obtained by subtracting millis() from storytime. When this is greater than 60 the user wins provided lives are not exhausted.

  
# Resources:

This section includes all the resources that I used to learn about the library. I might come back to this list in the future.

Youtube Matthew Bardin: 
https://youtube.com/playlist?list=PLvqAGa7mJm0XgzljScjXUsbOLshmIQ7-S

Docs:
https://p5play.org/docs/classes/Sprite.html

Guide:
https://creative-coding.decontextualize.com/making-games-with-p5-play/

Examples: 
https://code-dot-org.github.io/p5.play/examples/






