var gulp = require('gulp');
var cp = require('child_process');

gulp.task('build:webpack', function (cb) {
  cp.spawn('webpack', [], {stdio: 'inherit'})
    .on('exit', function () {
      cb();
    });
});

