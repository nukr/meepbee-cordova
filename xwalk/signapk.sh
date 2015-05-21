#!/bin/bash
PROJ_ROOT=`dirname $0` #relative
PROJ_ROOT=`cd $PROJ_ROOT/.. && pwd` #absulutized and normalized
KEYSTORE_PATH=$HOME/Documents/keystore/meepBee.keystore

rm -rf $PROJ_ROOT/xwalk/meepbee.unsigned.apk
rm -rf $PROJ_ROOT/xwalk/meepBee.apk

cp $PROJ_ROOT/platforms/android/build/outputs/apk/android-armv7-release-unsigned.apk $PROJ_ROOT/xwalk/meepbee.unsigned.apk

echo $KEYSTORE_PATH

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore $KEYSTORE_PATH $PROJ_ROOT/xwalk/meepbee.unsigned.apk meepBee


zipalign -v 4 $PROJ_ROOT/xwalk/meepbee.unsigned.apk $PROJ_ROOT/xwalk/meepBee.apk
