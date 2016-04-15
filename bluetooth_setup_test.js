var five = require("johnny-five"),
  board;

// Johnny-Five will try its hardest to detect the port for you,
// however you may also explicitly specify the port by passing
// it as an optional property to the Board constructor:
board = new five.Board({
  port: "/dev/tty.CAPEBOT2-DevB"
  //port: "/dev/tty.OptiBot-DevB"
  //port: "/dev/tty.HC-06-DevB"
  //port : "/dev/tty.ReiBot-DevB"
  //port : "/dev/tty.KhayaBot-DevB"
  //port : "/dev/tty.KhayaBot-DevB"
  //port : "/dev/tty.VivaBot-DevB"
});

// The board's pins will not be accessible until
// the board has reported that it is ready
board.on("ready", function() {
  var val = 0;
  console.log('board is ready...');

  // Set pin 13 to OUTPUT mode
  var PIN_NR = 13;
  this.pinMode(PIN_NR, 1);

  // Mode Table
  // INPUT:   0
  // OUTPUT:  1
  // ANALOG:  2
  // PWM:     3
  // SERVO:   4

  // Create a loop to "flash/blink/strobe" an led
  this.loop(1000, function() {
    this.digitalWrite(PIN_NR, (val = val ? 0 : 1));
  });
});


// Schematic
// http://arduino.cc/en/uploads/Tutorial/ExampleCircuit_bb.png
