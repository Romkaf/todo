'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
 
gulp.task('sass', function () {
  return gulp.src('./sass/style.scss')
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream:true}));
    
});

gulp.task('browser-sync', function() { 
  browserSync({ 
      server: { 
          baseDir: './' 
      },
      notify: false 
  });
});

gulp.task('code', function() {
  return gulp.src('./*.html')
  .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function() {
  return gulp.src('./js/*.js')
  .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function () {
  gulp.watch('./sass/**/*.scss', gulp.parallel('sass'));
  gulp.watch('./*.html', gulp.parallel('code'));
  gulp.watch('./js/*.js', gulp.parallel('js'));
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));