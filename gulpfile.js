var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');


var css_input = ['scss/**/*.scss', './node_modules/flexboxgrid/dist/flexboxgrid.min.css', './node_modules/animate.css/animate.min.css'];
var css_output = 'assets/styles';

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'compressed'
};

var autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

livereload({ start: true });

gulp.task('styles', function () {
    return gulp
        .src(css_input)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(css_output))
        .pipe(livereload());
});

gulp.task('stylesProd', function () {
    return gulp
        .src(css_input)
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(css_output))
});

gulp.task('watch', function() {
    livereload.listen();
    return gulp
        .watch(css_input, ['styles'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('default', ['styles', 'watch']);
gulp.task('build', ['stylesProd']);