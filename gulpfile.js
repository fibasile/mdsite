var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concatCss = require('gulp-concat-css');

JS_FILES = [
    "node_modules/zepto/dist/zepto.min.js",
    "node_modules/handlebars/dist/handlebars.min.js",
    "node_modules/marked/marked.min.js",
    "node_modules/async/dist/async.min.js",
    "node_modules/yaml-front-matter/dist/js-yaml-front-client.min.js",
    "./index.js"
];

CSS_FILES = [
    "node_modules/milligram/dist/milligram.min.css",
    "node_modules/font-awesome/css/font-awesome.min.css",
    "./mdsite.css"
];

gulp.task('minify', function () {
    gulp.src(JS_FILES)
        .pipe(uglify())
        .pipe(gulp.dest('build'))
});

gulp.task('css', function () {
    return gulp.src(CSS_FILES)
        .pipe(concatCss("mdsite.css"))
        .pipe(gulp.dest('build'));

});

gulp.task('default', ['minify', 'css'], function () {
    // place code for your default task here
});