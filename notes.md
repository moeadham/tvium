#####detect audio issues
Audio issues at:
[00007fc7900025b8] ts demux error: libdvbpsi (PSI decoder): TS discontinuity (received 9, expected 3) for PID 48
[00007fc7900025b8] ts demux error: libdvbpsi (PSI decoder): TS discontinuity (received 8, expected 10) for PID 48
[00007fc7900025b8] ts demux error: libdvbpsi (PSI decoder): TS discontinuity (received 2, expected 9) for PID 48


########How to set up the audio pipe:
man pulse-cli-syntax
command is pacmd
" move-sink-input|move-source-output index sink-index|sink-name"
pacmd list-sources -> Index 0 is device.description = "Monitor of Built-in Audio Analog Stereo"
                   -> this is the audio we want to re-direct
pacmd list-sinks -> There is only 1 available, "index: 0"


pactl 
batv_user@batv:~$ pactl list source-outputs
Source Output #3 - THIS NUMBER CHANGES EVERY TIME YOU START THE APP
...
	Properties:
		application.icon_name = "chromium-browser"

Command is:
pacmd move-source-output 3 alsa_output.pci-0000_00_1b.0.analog-stereo.monitor
# 3 is the number of Chrome
# you get the alsa string from:
batv_user@batv:~$ pacmd list-sinks
Welcome to PulseAudio! Use "help" for usage information.
>>> 1 sink(s) available.
  * index: 0
	name: <alsa_output.pci-0000_00_1b.0.analog-stereo>


######SHARE SCREEN
Screen-share-webcam
#install v4l2loopback
#setup /etc/modules, video_nr=10
#sudo modprobe v4l2loopback video_nr=10
ffmpeg -f x11grab -r 30 -s 1280x720 -i :0.0+0,0 -vcodec rawvideo -pix_fmt yuv420p -threads 0 -f v4l2 /dev/video10

