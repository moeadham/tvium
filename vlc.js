
var spawn = require('child_process').spawn;

function vlc_loop(options, callback) {
    var channel = '';
    if(options.channel){
        channel = options.channel;
    } else {
        console.log('NO CHANNEL GIVEN!');
        channel = 'atsc://frequency=473000000:modulation=8';
    }
    var args = ['--fullscreen', channel];
    var cmd = 'vlc';
    console.log('splitter:', cmd, args);
    var vlc = spawn(cmd, args);
	var die_counter = 0 ;

    vlc.stderr.on('data', function(buf) {
        console.log(buf.toString());
		if (/ts demux error:/.test(buf.toString()) ) { 
			die_counter++;
			if(die_counter == 9){
				    callback(new Error('restart me please'));
				
			}
			console.log('Die counter is:' + die_counter);
		}
    });
    vlc.on('error', function() {
        //callback(new Error('splitter error'));
    });
    vlc.on('exit', function() {
        //callback(new Error('splitter exited'));
    });
    return vlc;
};
var opts = {
    channel : 'atsc://frequency=473000000:modulation=8'
};
function doIt() {
	var vlc_object = vlc_loop(opts,function(){
		vlc_object.kill('SIGINT');
		process.nextTick(doIt);
	});
}
doIt();
