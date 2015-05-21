var gulp = require('gulp');

gulp.task('rebuild', ['copy:assets', 'build:html', 'build:webpack'], function () {
  gulp.start('server:restart');
});

