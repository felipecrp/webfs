
var gulp = require('gulp');

var libs = [];

var lib_diretory = "src/main/webapp/lib";

// Copy all static images
gulp.task('copy', function() {
    return gulp.src(libs, {base: 'bower_components/'})
        .pipe(gulp.dest(lib_diretory));
});

gulp.task('default', ['copy']);