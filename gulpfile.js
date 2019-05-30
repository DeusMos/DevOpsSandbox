const gulp = require('gulp');
const gulpCopy = require('gulp-copy');
const del = require('del');

gulp.task('copy:main', function() {
    return gulp.src('client/**/*.html')
        .pipe(gulpCopy(''))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:vendor', function() {
    return gulp.src('node_modules/jquery/dist/jquery.js')
        .pipe(gulpCopy(''))
        .pipe(gulp.dest('dist/vendor'));
});

gulp.task('clean:main', function() {
    return del(['dist/**/*.js', 'dist/**/*.html', '!dist/vendor/**.*']);
});

gulp.task('clean:vendor', function() {
    return del('dist/vendor');
});

gulp.task('clean', function() {
    return del('dist');
});

gulp.task('watch', function() {
    return gulp.watch(
        ['client/**/*.js', 'client/**/*.html'],
        gulp.series('clean:main', 'copy:main')
    );
});

gulp.task('copy', gulp.parallel('copy:main', 'copy:vendor'));
gulp.task('default', gulp.parallel('copy'));