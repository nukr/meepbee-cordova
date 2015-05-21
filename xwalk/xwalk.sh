#!/bin/zsh
PROJ_ROOT=`dirname $0` #relative
PROJ_ROOT=`cd $PROJ_ROOT/.. && pwd` #absulutized and normalized

rm -rf $PROJ_ROOT/platforms
rm -rf $PROJ_ROOT/plugins

cp $PROJ_ROOT/src-www/assets/elements/icon.png $PROJ_ROOT/www
cp $PROJ_ROOT/src-www/assets/elements/login_bg.png $PROJ_ROOT/www

cordova platforms add android
cordova plugin add cordova-plugin-crosswalk-webview
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-media-capture
cordova plugin add cordova-plugin-dialogs
cordova plugin add cordova-plugin-contacts
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-network-information
cordova plugin add nl.x-services.plugins.socialsharing
cordova plugin add https://github.com/benjie/phonegap-parse-plugin
cordova plugin add https://github.com/Lewie9021/video-thumbnail.git
