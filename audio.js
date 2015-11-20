
var spawn = require('child_process').exec;

//pactl list short sources - get name of source
//0	alsa_output.pci-0000_00_1b.0.analog-stereo.monitor	module-alsa-card.c	s16le 2ch 44100HzIDLE
//  You want this name (2nd parameter, has monitor)
//pactl list short source-outputs
//1	1	9	protocol-native.c	s16le 2ch 44100Hz
// We want the FIRST number
//
//pacmd move-source-output 3 alsa_output.pci-0000_00_1b.0.analog-stereo.monitor

function makeAudioPipe(options, callback) {
    var exec = require('child_process').exec;
    
    var source;
    var destination;
    
    exec('pactl list short sources', function (error, stdout, stderr) {
        if (error !== null) {
            //console.log('exec error: ' + error);
            callback(true, error);
        } else {
            //console.log(stdout);
            var list = stdout.split(/\r?\n/);
            //console.log(list);
            source = getAudioMonitor(list);
            
            exec('pactl list short source-outputs', function (error, stdout, stderr) {
                if (error !== null) {
                    //console.log('exec error: ' + error);
                    callback(true, error);
                } else {
                    //console.log(stdout);
                    var list = stdout.split(/\r?\n/);
                    //console.log(list);
                    destination = getChromeIndex(list);

                    console.log(source, destination);
                    exec('pacmd move-source-output '+ destination + ' ' + source, function (error, stdout, stderr) {
                        if (error !== null) {
                            //console.log('exec error: ' + error);
                            callback(true, error);
                        } else {
                            console.log(stdout);
                            callback(null, true);
                        }
                    });
                }
            });
        }
    });
    
};



function getAudioMonitor(list){
    var line_with_monitor = list.filter(function(line){
        return /.monitor\t/.test(line);
    });
    if(line_with_monitor[0]){
        var monitor_string = line_with_monitor[0].split(/\t/);
        return monitor_string[1];
    }
    return null;//This is an error.
};

function getChromeIndex(list){
    var line_with_monitor = list.filter(function(line){
        return /protocol-native.c\t/.test(line);
    });
    if(line_with_monitor[0]){
        var monitor_string = line_with_monitor[0].split(/\t/);
        return monitor_string[0];
    }
    return null;//This is an error.
};

function doIt() {
	makeAudioPipe(null, function(){
        console.log(arguments);
    });
}
doIt();
