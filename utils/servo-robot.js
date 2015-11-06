var Robot = function(left_wheel, right_wheel, eyes) {

    this.eyes = eyes;

    var actions = {

        forward: function() {
            //console.log('Forward');
            left_wheel.ccw(0.5);
            right_wheel.cw(0.5);
        },

        reverse: function() {
            //console.log('Backward');
            left_wheel.cw(0.5);
            right_wheel.ccw(0.5);
        },

        left: function() {
            //console.log('Left');
            left_wheel.cw(0.5);
            right_wheel.cw(0.5);
        },

        right: function() {
            //console.log('Right');
            left_wheel.ccw(0.5);
            right_wheel.ccw(0.5);
        },

        stop: function() {
            //console.log('Stopping');
            left_wheel.stop(-0.5);
            right_wheel.stop(-0.5);
            left_wheel.center();
            right_wheel.center();
        }
    };

    return {
        forward: actions['forward'],
        reverse: actions['reverse'],
        left: actions['left'],
        right: actions['right'],
        stop: actions['stop'],
        direction: function(actionName, duration) {
            console.log("=========");
            console.log(actionName);
            var action = actions[actionName];
            if (duration) {
                setTimeout(function() {
                    self.stop();
                }, duration);
            } else {
                action();
            }
        }
    }

}

module.exports = Robot;
