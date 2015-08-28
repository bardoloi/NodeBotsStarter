var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  // Create a standard `led` component instance
  // var led = new five.Led(13);
  // led.blink(250);
  // "blink" the led in X ms on-off phase periods

  // Create a standard `led` component instance  
  var servo = new five.Servo(9);
  var servo2 = new five.Servo(11);
//  var servo3 = new five.Servo(11);

  // this.repl.inject({
  // 	servo: servo
  // });

  servo.sweep();
  servo2.sweep();
//  servo3.sweep();
});