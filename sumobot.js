var five = require("johnny-five");
var board = new five.Board();

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

var leftServoConfig = { pin: 11, type: 'continuous', startAt: 0 };
var rightServoConfig = { pin: 9, type: 'continuous', startAt: 0 };
var frontServoConfig = { pin: 10, type: 'continuous', startAt: 0 };

var frontWeapons = {
    stop: function () {
        frontWeapons.left.center();
    },
    rollDown: function () {
        frontWeapons.left.ccw();
    },
    rollUp: function () {
        frontWeapons.left.cw();
    }
};

var wheels = {
    stop: function () {
        wheels.left.center();
        wheels.right.center();
    },
    forward: function () {
        wheels.left.ccw();
        wheels.right.cw();
    },
    pivotLeft: function () {
        wheels.right.cw();
        wheels.left.cw();
    },
    pivotRight: function () {
        wheels.right.ccw();
        wheels.left.ccw();
    },
    back: function () {
        wheels.left.cw();
        wheels.right.ccw();
    },
    fastLeft: function(){
        wheels.left.ccw(0.1);
        wheels.right.cw(1);
    },
    fastRight: function(){
        wheels.left.ccw(1);
        wheels.right.cw(0.1);
    },
    fastBackLeft: function(){
        wheels.left.cw(0.1);
        wheels.right.ccw();
    },
    fastBackRight: function(){
        wheels.left.cw();
        wheels.right.ccw(0.1);
    }
};

var move = function(chunk, key) {
    if (!key) return;
    
    switch (key.name) {
        case 'z':
        case 'b':
            frontWeapons.rollDown();
            console.log("rollDown");
            break;

        case 'x':
        case 'n':
            frontWeapons.rollUp();
            console.log("rollUp");            
            break;

        case 'c':
        case 'm':
            frontWeapons.stop();
            console.log("weapons stop");
            break;

        case 'w':
        case 'up':
            wheels.forward();
            console.log("forward");            
            break;        
        
        case 's':
        case 'down':
            wheels.back();
            console.log("back");
            break;            

        case 'left':
            wheels.pivotLeft();
            console.log("pivotLeft");
            break;            

        case 'right':
            wheels.pivotRight();
            console.log("pivotRight");
            break;

        case 'q':
            wheels.fastLeft();
            console.log("fastLeft");
            break;

        case 'a':
            wheels.fastBackLeft();
            console.log("fastBackLeft");
            break;                    
        
        case 'e':
            wheels.fastRight();
            console.log("fastRight");        
            break;

        case 'd':
            wheels.fastBackRight();
            console.log("fastBackRight");
            break;
        
        case 'space':
        case 'escape':
            wheels.stop();
            break;
    }
};

var initializeWheels = function(){
    wheels.left = new five.Servo(leftServoConfig),
    wheels.right = new five.Servo(rightServoConfig),
    wheels.stop();
};

var initializeWeapons = function(){
    frontWeapons.left = new five.Servo(frontServoConfig),
    frontWeapons.stop();
};

var boardOperation = function () {
    initializeWheels();    
//    initializeWeapons();
    console.log("Use the cursor keys or QWEASD to move your bot. Hit escape or the spacebar to stop.");
  
    stdin.on("keypress", move);
};

board.on("ready", boardOperation);
