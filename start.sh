#!/bin/bash
node X11webcam.js &
sleep 1
chromium-browser "https://streamium.io/b/global-tv-canada" &
sleep 5
node audio.js
node vlc.js
