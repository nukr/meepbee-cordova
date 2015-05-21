var gulp = require('gulp');

gulp.task('default', ['build', 'watch'], function () {
 gulp.start('browserSync');
});

