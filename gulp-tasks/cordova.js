var gulp = require('gulp');
var spawn = require('child_process').spawn;

gulp.task('cordova', ['build:html:production', 'build:webpack'], function () {
  spawn('cordova', ['run', 'android', '--release'], {stdio: 'inherit'});
});
