var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var htmlmin = require('gulp-htmlmin');

// สร้าง task ชื่อว่า "sass" ขึ้นมา พร้อมกับระบุงานที่จะให้ task นี้ทำ
gulp.task('css', function() {
  gulp.src('scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'))
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('html', function() {
  return gulp.src(['./srcHtml/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['css', 'html', 'browser-sync'], function() {
  gulp.watch('scss/**/*.scss', ['css']);
  gulp.watch('./srcHtml/*.html', ['html']);
  gulp.watch(['**/*.html'], browserSync.reload);
  gulp.watch(['css/**/*.css'], browserSync.reload);
});
