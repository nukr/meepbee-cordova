var gulp = require('gulp');
var rename = require('gulp-rename');
var config = require('./config').html;
var env = process.env.NODE_ENV || 'development';

var html = config.src + '/index.' + env + '.html';

gulp.task('build:html', function () {
  return gulp.src([ html ])
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.dest));
});
