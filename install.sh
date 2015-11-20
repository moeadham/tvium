#!/bin/bash
# this gets rid of system error messages on ubuntu
sudo sed -i '/^enabled=/s/=.*/=0/' /etc/default/apport
# maybe add more stuff like :
# - adding start.sh to autostart, 
#	- install the chrome extention? 
