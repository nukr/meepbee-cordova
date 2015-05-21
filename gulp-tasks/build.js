var gulp = require('gulp');

gulp.task('build', ['build:html:production', 'build:webpack'], function (cb) {
  cb();
});
