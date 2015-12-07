var fs = require('fs');
var temporal = require('temporal');
var five = require("johnny-five");
var keypress = require('keypress');
var Robot = require('./utils/servo-robot');
var RobotCommander = require('./robot-commander')

keypress(process.stdin);

var board = new five.Board(
  //{ port: "/dev/tty.COLIN-LEE-DevB"}
);

board.on("ready", function() {

  console.log("Welcome to Sumobot Jr!")
  console.log("Control Soccerbot with the arrow keys, and SPACE to stop.")

  //var left_wheel  = new five.Servo({ pin: 10, type: 'continuous' }).stop();
  var left_wheel  = new five.Servo({ pin: 10, type: 'continuous', offset : 1 }).stop();
  var right_wheel = new five.Servo({ pin: 11, type: 'continuous', offset : 7  }).stop();
  var robot = new Robot(left_wheel, right_wheel);

  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.setRawMode(true);

  //load commands

  var fileName = process.argv[2];
  var robotCommander = RobotCommander(fileName, robot);

  process.stdin.on('keypress', function (ch, key) {

    if ( !key ) return;
    if ( key.name == 'q' ) {

      console.log('Quitting');
      process.exit();

    } else if ( key.name == 'down' ) {

      console.log('Forward');
      robot.direction('forward');

      //robot.move('forward', 1500);

    } else if ( key.name == 'up' ) {

      console.log('Backward');
      robot.reverse()

    } else if ( key.name == 'left' ) {
      console.log('Left');
      robot.left();

    } else if ( key.name == 'right' ) {

      console.log('Right');
      robot.right();

    } else if ( key.name == 'space' ) {

      console.log('Stopping');
      robot.stop();

    }
    else if(key.ctrl && key.name == 'g'){
        robotCommander.execute();
    }
  });


  //

});
