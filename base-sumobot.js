var five = require("johnny-five");
var board = new five.Board();

var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();

var leftServoConfig = { pin: 10, type: 'continuous', startAt: 0 };
var rightServoConfig = { pin: 9, type: 'continuous', startAt: 0 };

var wheels = {
    stop: function () {
        wheels.left.center();
        wheels.right.center();
    },
    forward: function () {
        wheels.left.ccw();
        wheels.right.cw();
        // console.log("Forward");
    },
    pivotLeft: function () {
        wheels.right.cw();
        wheels.left.cw();
        // console.log("Left");
    },
    pivotRight: function () {
        wheels.right.ccw();
        wheels.left.ccw();
        // console.log("Right");
    },
    back: function () {
        wheels.left.cw();
        wheels.right.ccw();
        // console.log("Back");
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
        case 'w':
        case 'up':
            wheels.forward();
            break;        
        
        case 's':
        case 'down':
            wheels.back();
            break;            
        
        case 'q':
            wheels.fastLeft();
            break;            
        case 'a':
            wheels.fastBackLeft();
            break;            
        case 'left':
            wheels.pivotLeft();
            break;            
        
        case 'e':
            wheels.fastRight();
            break;
        case 'd':
            wheels.fastBackRight();
            break;            
        case 'right':
            wheels.pivotRight();
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

var boardOperation = function () {
    initializeWheels();    
    console.log("Use the cursor keys or ASWD to move your bot. Hit escape or the spacebar to stop.");
    
    stdin.on("keypress", move);
};

board.on("ready", boardOperation);

/*
Event {
  type: "info"|"warn"|"fail",
  timestamp: Time of event in milliseconds,
  class: name of relevant component class,
  message: message [+ ...detail]
}
*/
board.on("info", function(event) {
  console.log("%s sent an 'info' message: %s", event.class, event.message);
});
board.on("warn", function(event) {
  console.log("%s sent a 'warn' message: %s", event.class, event.message);
});
board.on("fail", function(event) {
  console.log("%s sent a 'fail' message: %s", event.class, event.message);
});

