var gulp = require('gulp');
var webserver = require('gulp-webserver');
var stylus = require('gulp-stylus');
var concat = require('gulp-concat');

gulp.task('webserver', function() {
    gulp.src('./public')
        .pipe(webserver({
            host: 'localhost',
            port: 7000,
            fallback: 'index.html',
            livereload: true
        }));
});

gulp.task('stylus-bootstrap', function () {
    gulp.src('./public/vendor/bootstrap-stylus/stylus/bootstrap.styl')
        .pipe(stylus())
        .pipe(gulp.dest('./public/compiled'));
});

gulp.task('stylus', function () {
    gulp.src('./public/app/**/*.styl')
        .pipe(concat('style.styl'))
        .pipe(stylus())
        .pipe(gulp.dest('./public/compiled/'));
});

gulp.task('watch', function() {
    gulp.watch('./public/**/*.styl', ['stylus']);
});

gulp.task('default', ['stylus-bootstrap', 'stylus', 'webserver', 'watch']);