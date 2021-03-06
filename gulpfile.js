var gulp =require('gulp'),
sass = require('gulp-sass'),
browserSync = require('browser-sync').create();

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: "./"
  });

  gulp.watch("scss/**/*.scss", ['sass']);
  gulp.watch("*.html").on('change', browserSync.reload);
  

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {

  return gulp.src("scss/**/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("css/"))
    .pipe(browserSync.stream());

});
gulp.task ('watch',function () {

  gulp.watch("javascript/**/*.js").on('change', browserSync.reload);

});

gulp.task('default', ['serve','watch']);





