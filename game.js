let clouds;
let player;
let enemy;
let counter = 0;
let lives = 5;
let startTime = 0;

function setup() {
  createCanvas(400, 400);
  clouds = new Group();
  noStroke();
  enemy = new Group();

  for (let i = 0; i < 10; i++) {
    let c = createSprite(
      random(width), random(height),
      random(25, 100), random(25, 100));
    c.shapeColor = color(random(200, 255));
    clouds.add(c);
  }
  
  player = createSprite(
    width/2, height/2,
    random(7, 12), random(5, 10));
  player.shapeColor = color(0,255,0);
  player.friction = random(0.01, 0.1);
  player.maxSpeed = random(1, 4);
  player.rotateToDirection = true;
  startTime = millis();
}
function draw() {
  counter ++; 
  background(255, 255, 255);
  if (counter%100 ==0){
     let c = createSprite(
      random(width), random(height),
      random(25, 100), random(25, 100));
    c.shapeColor = color(random(200, 255));
    clouds.add(c);
  }
  
  
  if (counter%200 ==0){
   
    let c = createSprite(
      0, random(height),
      random(13,20), random(10, 15));
    c.shapeColor = color(255,0,0);
    enemy.add(c); // add new enemy sprite to enemy group
  }
  
   // keep player within the canvas boundaries
  if (player.position.x < player.width/2) {
    player.position.x = player.width/2;
  } else if (player.position.x > width - player.width/2) {
    player.position.x = width - player.width/2;
  }
  if (player.position.y < player.height/2) {
    player.position.y = player.height/2;
  } else if (player.position.y > height - player.height/2) {
    player.position.y = height - player.height/2;
  }
  
  
  // moving the groups horizontally
  for (let i = 0; i < enemy.length; i++) {
    enemy[i].position.x += enemy[i].width * random(0.1, 0.3);
    if (enemy[i].position.x > width) {
      enemy[i].position.x = 0;
    }
  }
  
  for (let i = 0; i < clouds.length; i++) {
    clouds[i].position.x += clouds[i].width * random (0.001, 0.05);
    if (clouds[i].position.x > width) {
      clouds[i].position.x = 0;
    }
  }
  
  // use velocity controlled by mouse
  player.velocity.x = (mouseX - player.position.x) * 0.2;
  player.velocity.y = (mouseY - player.position.y) * 0.2;
  
  // detect collision between player and enemy
  enemy.collide(player, function(enemySprite, playerSprite) {
    enemySprite.remove(); // remove the collided enemy sprite
    lives -= 1;
    console.log(lives);
    
  });
  
  // detect collision between player and cloud
  clouds.collide(player, function(cloudsSprite, playerSprite) {
    cloudsSprite.remove(); // remove the collided enemy sprite
    playerSprite.scale += 0.3;
  });
  
  textSize(72);
  textAlign(CENTER, CENTER);
  
  
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
    for (let i = 0; i < clouds.length; i++) {
  clouds[i].remove();
}

    textSize(40);
    background(255, 255, 255);
    
    let minutes = int(duration / 60);
    let seconds = int(duration % 60);
     text("Game Over" + "\n"+" Time: " + minutes + ":" + nf(seconds, 2), width/2, height/2);
    
    setTimeout(function() {
    noLoop();
  }, 1000); // wait for 1 second before stopping the loop
    
  }
}
