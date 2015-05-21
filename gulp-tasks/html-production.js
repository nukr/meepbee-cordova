var gulp = require('gulp');
var rename = require('gulp-rename');
var env = 'production';

var html = './src-www/html/index.production.html';

gulp.task('build:html:production', function () {
  gulp.src([ html ])
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./www'));

  gulp.src('src-www/assets/elements/login_bg.png')
    .pipe(gulp.dest('./www'));

  return gulp.src('src-www/assets/elements/icon.png')
    .pipe(gulp.dest('./www'));

});

