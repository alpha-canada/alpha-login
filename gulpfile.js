var gulp = require('gulp');

var rename = require('gulp-rename');
var concat = require('gulp-concat-util');
var minify = require('gulp-clean-css');
var less = require('gulp-less');
var watch = require("gulp-watch");
var path = require('path');
var font2css = require('gulp-font2css').default;

/*
gulp.task("polymer", function(){
	return gulp.src('wp-content/themes/alpha-donate/app/alpha-donate-app.html')
    .pipe(vulcanize({
		stripComments : true,
		inlineScripts : true
	})).
	pipe(rename({
		basename : "bundle"
	}))
    .pipe(gulp.dest('wp-content/themes/alpha-donate/app'));

});
*/

/**
 * Theme Styles
 */
gulp.task("styles", function(){
	return gulp.src("assets/less/styles/**/*.less")
		.pipe(less())
		.pipe(minify())
		.pipe(concat.header('<dom-module id="<%= moduleId(file) %>"><template><style>', {moduleId:function(file){
			return path.basename(file.path, ".css") + "-styles"
		}}))
		.pipe(concat.footer('</style></template></dom-module>'))
		.pipe(rename({
			extname: '-styles.html'
		}))
		.pipe(gulp.dest("assets/css"));
});

/**
 * Take the .woff files and build them into data-uri, concatted file
 */
gulp.task("fonts", function(){
	return gulp.src("assets/fonts/**/*.woff")
			
		.pipe(font2css())
		.pipe(concat('fonts.min.css'))
		.pipe(gulp.dest("assets/css"));
});


/**
 * Build theme tasks into one
 */
gulp.task("default", ["styles", "fonts"]);


gulp.task("watch", function(){
	gulp.watch("assets/less/**/*.less",["styles"])
		
});
