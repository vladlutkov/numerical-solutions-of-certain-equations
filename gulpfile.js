var gulp = require("gulp");
var coffee = require("gulp-coffee");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat")

gulp.task("default", function() {
	gulp.src("web_frontend/index.html")
		.pipe(gulp.dest("dist/site/"));

	gulp.src("web_frontend/src/**/*.coffee")
		.pipe(coffee())
		.pipe(gulp.dest("dist/site/lib/"));

	gulp.src("web_frontend/lib/**/*.js")
		.pipe(gulp.dest("dist/site/lib/"));

	gulp.src("web_backend/server.coffee")
		.pipe(coffee())
		.pipe(gulp.dest("dist/"));
});

gulp.task("dist", function() {

});