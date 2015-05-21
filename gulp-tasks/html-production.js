var gulp = require('gulp');
var rename = require('gulp-rename');
var config = require('./config').html;
var env = 'production';

var html = config.src + '/index.' + env + '.html';

gulp.task('build:html:production', function () {
  gulp.src([ html ])
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.dest));

  gulp.src('src-www/assets/elements/login_bg.png')
    .pipe(gulp.dest(config.dest));

  return gulp.src('src-www/assets/elements/icon.png')
    .pipe(gulp.dest(config.dest));

});

