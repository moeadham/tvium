
var spawn = require('child_process').spawn;

function x11sink(options, callback) {

    var args = '-f x11grab -r 30 -s 1280x720 -i :0.0+0,0 -vcodec rawvideo -pix_fmt yuv420p -threads 0 -f v4l2 /dev/video10'.split(' ');
    var cmd = 'ffmpeg';
    console.log('Command:', cmd, args);
    var ffmpeg = spawn(cmd, args);

    ffmpeg.stderr.on('data', function(buf) {
        //console.log(buf.toString());
    });
    ffmpeg.on('error', function() {

    });
    ffmpeg.on('exit', function() {

    });
    return ffmpeg;
};

function doIt() {
	var avconv_object = x11sink(null,function(){
		avconv_object.kill('SIGINT');
		process.nextTick(doIt);
	});
}
doIt();
