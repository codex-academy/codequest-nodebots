var fs = require('fs');
var temporal = require('temporal');

module.exports = function(fileName, robot){

    console.log("Found file", fileName);

    var commandQueue = getCommands(fileName)
      .filter(function(cmd){ return cmd.direction != "" })
      .map(function(cmd){
        return {
            delay : cmd.duration,
            task : robotCommand(cmd)
        }
    });

    function getCommands(file_name){
        var commands = fs.readFileSync(file_name, 'utf8');
        var commandList = commands.split("\n");
        commandList = commandList.map(function(line){
            var lines = line.split(",")
            return {
                direction : lines[0],
                duration : Number(lines[1])
            };
        });

        console.log(commandList);
        return commandList;
    };

    function robotCommand(command){
        return function(){
            robot.direction(command.direction)
        }
    }


    return {

        execute : function () {
            temporal.queue(commandQueue);
        }

    }

}
