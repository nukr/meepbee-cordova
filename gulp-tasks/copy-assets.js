var gulp = require('gulp');
var config = require('./config');

gulp.task('copy:assets', function () {
  gulp.src(config.img.src + '/*')
    .pipe(gulp.dest(config.img.dest))
})

