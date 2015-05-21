var gulp = require('gulp');
var config = require('./config');
var reload = require('browser-sync').reload;

gulp.task('watch', function () {
  gulp.watch('./src-www/**/*', ['build', reload]);
});

