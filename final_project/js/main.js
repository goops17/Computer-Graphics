var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 80, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z=5;
//camera.position.x=1;
//camera.position.y=1;

var input = new Input();

var renderer = new THREE.WebGLRenderer();
//renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
renderer.setPixelRatio( window.devicePixelRation );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild( renderer.domElement );

// Encouraging players with array of quotes, it will appear with every time player scores
var quotes=new Array();
quotes[0] = "Good job fam!";
quotes[1] = "You are doing great!";
quotes[2] = "Dope run in cirlce !";
quotes[3] = "Sweet as donut!";
quotes[4] = "You are Awesome!";
quotes[5] = "King of Circle Run!";
quotes[6] = "Do you even die!";
quotes[7] = "Best in the world?!";

function showquote(){
    var q = quotes.length;
    var whichquote=Math.round(Math.random()*(q-1));
    document.getElementById("menu").style.top=120;
    document.getElementById("menu").innerHTML = quotes[whichquote];

    ;}


// PLAYER OBJECT
var geometry = new THREE.CircleGeometry( 0.1, 32 );
var material = new THREE.MeshBasicMaterial( { color: 0x000 } );
var player = new THREE.Mesh( geometry, material );
scene.add( player );
player.position.z=0;

//PARTICLE 
var geometry = new THREE.CircleGeometry( 0.1, 32 );
var material = new THREE.MeshBasicMaterial( { color: 0x696969 } );
var follow_one = new THREE.Mesh( geometry, material );
scene.add( follow_one );
follow_one.position.z=0;

var geometry = new THREE.CircleGeometry( 0.08, 32 );
var material = new THREE.MeshBasicMaterial( { color: 0xA9A9A9} );
var follow_two = new THREE.Mesh( geometry, material );
scene.add( follow_two );
follow_two.position.z=0;

var geometry = new THREE.CircleGeometry( 0.075, 32 );
var material = new THREE.MeshBasicMaterial( { color: 0xDCDCDC} );
var follow_three = new THREE.Mesh( geometry, material );
scene.add( follow_three );
follow_three.position.z=0;

// SCORE OBJECT
var geometry = new THREE.BoxGeometry( 0.1, 0.25, 0.1 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
cube.position.x=-1.1;
cube.position.y=0.49


//ENEMY OBJECT
var geometry = new THREE.CircleGeometry( 0.1, 32 );
var material = new THREE.MeshBasicMaterial( { color: 0x1e38e6 } );
var enemy_one = new THREE.Mesh( geometry, material );
scene.add( enemy_one );
enemy_one.y=1;

var geometry = new THREE.CircleGeometry( 0.1, 32 );
var material = new THREE.MeshBasicMaterial( { color: 0xe81c1f } );
var enemy_two = new THREE.Mesh( geometry, material );
scene.add( enemy_two );
enemy_two.y=1;


// PLAYER PATH
var geometry = new THREE.TorusGeometry( 1.65, .15, 2, 100 );
var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
var player_path = new THREE.Mesh( geometry, material );
scene.add( player_path );

player_path.position.x=-1.1;
player_path.position.y=-1.1;
player_path.position.z=-0.5;

// ENEMY PATH
var geometry = new THREE.TorusGeometry( 1.2, .15, 2, 100 );
var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
var enemy_path_one = new THREE.Mesh( geometry, material );
scene.add( enemy_path_one );

enemy_path_one.position.x=-2.4;
enemy_path_one.position.y=-1.1;
enemy_path_one.position.z=-0.5;

var geometry = new THREE.TorusGeometry( 1.2, .15, 2, 100 );
var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
var enemy_path_two = new THREE.Mesh( geometry, material );
scene.add( enemy_path_two );

enemy_path_two.position.x=.2;
enemy_path_two.position.y=-1.1;
enemy_path_two.position.z=-0.5;

//SCORE 
//document.getElementById("score").innerHTML = "POOP";
var score = 0;
var scoreTemp=0;
var scoreTemp2=0;
var scored = false;
var gameOver = false;

var x_player = 1 // center
var y_player = -1  // center
var r_player = 1.5 // radius

var x_enemy_one =2.2 // center
var y_enemy_one = -1  // center
var a_enemy_one = Math.random()

var r_enemy = 1.1 // radius


var x_enemy_two =-0.2 // center
var y_enemy_two = -1  // center
var a_enemy_two = Math.random()*4


//var s =1.5   // oval motion
var a_player = 1.5    // angle (from 0 to Math.PI * 2)
var a_follow_one = 1.4
var a_follow_two = 1.3
var a_follow_three = 1.2
var speed_player =1
var speed_enemy=1;
playerMovement(a_player);

var light = new THREE.PointLight( 0xffffff, 1, 200 );
light.position.set( -1, -1, 2);
light.castShadow = true;            // default false
scene.add( light );




//Platform generation
var geometry = new THREE.PlaneGeometry( 6, 10, 32 );
var material = new THREE.MeshPhongMaterial( {color: 0x4eb5ab, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );
scene.add( plane );
plane.position.x=-1.2;
plane.position.y=-1;
plane.position.z=-1;


//OBJECT MOVEMENT

function playerMovement(a) {
    var px = x_player + r_player * Math.cos(a_player); 
    var py = y_player + r_player * Math.sin(a_player);
    player.position.x = -px;
    player.position.y = py; 
    
    }

function followOneMovement(a) {

    var px = x_player + r_player * Math.cos(a_follow_one); 
    var py = y_player + r_player * Math.sin(a_follow_one);
    follow_one.position.x = -px;
    follow_one.position.y = py; 
    
    }

function followTwoMovement(a) {

    var px = x_player + r_player * Math.cos(a_follow_two); 
    var py = y_player + r_player * Math.sin(a_follow_two);
    follow_two.position.x = -px;
    follow_two.position.y = py; 
    
    }
function followThreeMovement(a) {

    var px = x_player + r_player * Math.cos(a_follow_three); 
    var py = y_player + r_player * Math.sin(a_follow_three);
    follow_three.position.x = -px;
    follow_three.position.y = py; 
    
    }

function enemyOneMovement(a) {
    var px = x_enemy_one + r_enemy * Math.cos(a_enemy_one); 
    var py = y_enemy_one + r_enemy * Math.sin(a_enemy_one);
    enemy_one.position.x = -px;
    enemy_one.position.y = py; 
    }

function enemyTwoMovement(a) {
    var px = x_enemy_two + r_enemy * Math.cos(a_enemy_two); 
    var py = y_enemy_two + r_enemy * Math.sin(a_enemy_two);
    enemy_two.position.x = -px;
    enemy_two.position.y = py; 
    }

setInterval(function() {
        if(gameOver==false)
        {
            playerMovement(a_player*speed_player);
            enemyOneMovement(a_enemy_one);
            enemyTwoMovement(a_enemy_two);

            followOneMovement(a_follow_one);
            followTwoMovement(a_follow_two);
            followThreeMovement(a_follow_three);
            checkCollision();
            a_player = a_player +( Math.PI / 360) % (Math.PI * 2);
            a_enemy_one = a_enemy_one +( Math.PI / 360) % (Math.PI * 2);
            a_enemy_two = a_enemy_two +( Math.PI / 360) % (Math.PI * 2);
            //Custom Particle effect maybe! 
            a_follow_one = a_follow_one +( Math.PI / 360) % (Math.PI * 2);
            a_follow_two = a_follow_two +( Math.PI / 360) % (Math.PI * 2);
            a_follow_three = a_follow_three +( Math.PI / 360) % (Math.PI * 2);
            a_enemy_two += Math.random()*Math.random()/100;
            a_enemy_one += Math.random()*Math.random()/100;
            if(!scored)
            {
                scoreSystem();
                //score=scoreTemp;
            }
            else
            {
                if(player.position.y<=cube.position.y)
                {
                    scored=false;
                    score+=scoreTemp;
                    scoreTemp=0;
                    showquote();
                }
            }
            //scoreTemp=Math.floor(score/40);
            //document.getElementById("score").innerHTML = scoreTemp;  
            //scoreTemp+=Math.floor(score/20);
            //scoreTemp2=Math.floor(score/11);
            
            if(!gameOver)
            {
                document.getElementById("score").innerHTML = score-1;
            }else
            {
                document.getElementById("menu").style.top=250;
                document.getElementById("menu").innerHTML = "You are awesome!<br>You are doing great!<br><br><high>Press <b>'R'</b> to restart.</high>";
            }
            
            //player.scale.set(2, 32);
            player.scale.y=1.5;
            player.scale.x=1.5;
            follow_one.scale.y=1;
            follow_one.scale.x=1;

            follow_two.scale.y=1;
            follow_two.scale.x=1;

            follow_three.scale.y=1;
            follow_three.scale.x=1;

        }
        else
        {
            gameOverEvent();
        }

    }, 1);
function checkCollision()
{
    if((player.position.x>= enemy_one.position.x-0.1) && (player.position.x<=enemy_one.position.x+0.1) && (player.position.y>= enemy_one.position.y-0.1) && (player.position.y<=enemy_one.position.y+0.1))
    {
        gameOver=true;
    }

    if((player.position.x>= enemy_two.position.x-0.1) && (player.position.x<=enemy_two.position.x+0.1) && (player.position.y>= enemy_two.position.y-0.1) && (player.position.y<=enemy_two.position.y+0.1))
    {
        gameOver=true;
    }
}

function gameOverEvent()
{
    enemy_one.position.z=-2;
    enemy_two.position.z=-2;
    player.position.z=-2;
    player_path.position.z=-1.5;
    enemy_path_two.position.z=-1.5;
    enemy_path_one.position.z=-1.5;
    cube.position.z=-1.5;

    follow_one.position.z=-1;
    follow_two.position.z=-1;
    follow_three.position.z=-1;
}

function scoreSystem()
{

    if(((cube.position.x+0.1 -player.position.x)<0.1) && (cube.position.y+0.2 -player.position.y)<0.2)
    {
            scoreTemp++;
            scored=true;
    }
}

    var lastTs = 0;
    var render = function (ts) {
    requestAnimationFrame( render );
    
    var timeDelta = (ts - lastTs)/1000;
    lastTs = ts;
    // If pressed up, w or space player and it's follow elements follow it
    if(input.isUpPressed) {
        a_player = a_player+0.05;
        a_follow_one = a_follow_one+0.05;
        a_follow_two = a_follow_two+0.05;
        a_follow_three = a_follow_three+0.05;
        player.scale.y=1;
        player.scale.x=1;

        follow_one.scale.y=0.5;
        follow_one.scale.x=0.5;

        follow_two.scale.y=0.5;
        follow_two.scale.x=0.5;

        follow_three.scale.y=0.5;
        follow_three.scale.x=0.5;
        if(!gameOver)
        {
            //fake tail particle generation
            follow_one.position.z=0;
            follow_two.position.z=0;
            follow_three.position.z=0;
        }
        
    }
    else
    {
        follow_one.position.z=-1;
        follow_two.position.z=-1;
        follow_three.position.z=-1;
    }
    // if Player presses R after death, game restarts
    if(input.isRightPressed) {
        if(gameOver)
        {
            enemy_one.position.z=0;
            enemy_two.position.z=0;
            player.position.z=0;
            player_path.position.z=-0.5;
            enemy_path_two.position.z=-0.5;
            enemy_path_one.position.z=-0.5;
            cube.position.z=0;

            follow_one.position.z=0;
            follow_two.position.z=0;
            follow_three.position.z=0;
            score=0;
            a_player = 1.5    // angle (from 0 to Math.PI * 2)
            a_follow_one = 1.4
            a_follow_two = 1.3
            a_follow_three = 1.2
            gameOver=false;
            showquote();
        }
    }
    renderer.render(scene, camera);
};

requestAnimationFrame(render);