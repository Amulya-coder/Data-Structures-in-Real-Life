function load_images(){
    //player,enemies,virus,diamond
    enemy_image=new Image;
    enemy_image.src= "Assets/v1.png";
    
    player_image=new Image;
    player_image.src="Assets/superhero.png";
    
    gem_image=new Image;
    gem_image.src="Assets/gemm.png";
}

function init(){
    //define the game objects that we will have in the game
    canvas=document.getElementById("mycanvas");
    console.log(canvas);
    
    W=700;
    H=400;
    
    canvas.height=H;
    canvas.width=W;
    game_over=false;
    
    //create a context
    pen=canvas.getContext('2d');
    console.log(pen);
    
    e1= {
        x:150,
        y:50,
        w:80,
        h:80,
        speed:25, 
    };
    
    e2= {
        x:300,
        y:150,
        w:80,
        h:80,
        speed:30, 
    };
    
    e3= {
        x:450,
        y:20,
        w:80,
        h:80,
        speed:40, 
    };
    
    enemy=[e1,e2,e3];
    
    player={
        x:20,
        y:H/2,
        w:60,
        h:60,
        speed:20,
        moving:false,
        health:100
         
    };
    
    gem={
        x:W-100,
        y:H/2,
        w:60,
        h:60,
    };
    
    //listen to events on canvas
    canvas.addEventListener('mousedown',function(){
       
        console.log("Mouse clicked");
        player.moving=true;
    });
       
    canvas.addEventListener('mouseup',function(){
       
        console.log("Mouse Released");
        player.moving=false;
    });
}
 
function isCollide(rect1,rect2){
    
    if(Math.abs(rect1.x - rect2.x)<=30 && Math.abs(rect1.y-rect2.y)<=30){
        return true;
    }
    
    return false;
    
}

  
function draw(){
    
    //Clear the canvas from the old frame
    pen.clearRect(0,0,W,H);
    
    pen.fillStyle="red";
    //pen.fillRect(enemy_image,box.x,box.y,box.w,box.h);
    //pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);
    
    //draw the player
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    
    //draw the gem
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    
    
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    
    pen.font="15px sans-serif";
    pen.fillStyle = "white";
    pen.fillText("Score" +player.health,10,20); 
    
}

function update(){
    
    //if the player is moving
    if(player.moving==true){
        player.x += player.speed;
        player.health +=20;
    }
    
    for(let i=0;i<enemy.length;i++){
        if(isCollide(enemy[i],player)){
            player.health -= 50;
            
            if(player.health<0){
            console.log(player.health);
            game_over=true;
            alert("Game Over" + player.health);
        }
            
        }    
    }
    
    //Overlap Overlap
    if(isCollide(player,gem)){
        console.log("You Won");
        alert("You Won the game");
        game_over =true;
        return;
    }
     
    //move the box downwards
    //update each enemy for the same logic
    
    for(let i=0;i<enemy.length;i++){
        
        enemy[i].y+=enemy[i].speed;
        if(enemy[i].y>H-enemy[i].h || enemy[i].y<0){
            enemy[i].speed *=-1;
        }
    }
}


function gameloop(){
    
    if(game_over==true){
        clearInterval(f);
    }
    
    draw();
    update();
    
    console.log("In gameloop");
    
}

load_images();
init();
var f=setInterval(gameloop,100);










