const gulp = require('gulp');
const gulpCopy = require('gulp-copy');
const del = require('del');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');

//Cleans
gulp.task('clean:main',function(){
    return del(['dist/**/*.js', 'dist/**/*.html', '!dist/vendor/**']);
});

gulp.task('clean:vendor',function(){
    return del('dist/vendor/*');
});

//Copies
gulp.task('copy:main', function(){
    return gulp.src('client/**/*.html')
        .pipe(gulpCopy(''))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:vendor',function(){
    return gulp.src('node_modules/jquery/dist/jquery.js')
        .pipe(gulpCopy(''))
        .pipe(gulp.dest('dist/vendor'));
});

//Watch
gulp.task('watch', function(){
    return gulp.watch([
        'client/**/*.js',
        'client/**/*.html'
    ], gulp.series([
        'clean:main',
        'copy:main'
    ]));
})

//needs async completion
gulp.task('browserify', function(){
    let bundler = browserify({
        entries: 'dist',
        cache: {}, packageCache: {}, fullPaths: true, debug: true
    });

    let bundle = function(){
        return bundler
            .bundle()
            .on('error',function(){})
            .pipe(source('dist'))
            .pipe(gulp.dest('dist'))
    }

    if(global.isWatching){
        bundler = watchify(bundler);
        bundler.on('update', bundle);
    }

    return bundle();

});

gulp.task('clean', gulp.parallel('clean:main', 'clean:vendor'))
gulp.task('copy', gulp.parallel('copy:main', 'copy:vendor'));
gulp.task('default', gulp.parallel('clean', 'copy'));