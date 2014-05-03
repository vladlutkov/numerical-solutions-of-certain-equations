var gulp = require("gulp");
var coffee = require("gulp-coffee");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat")

var heroku_folder = "/home/vlad/projects/vladlutkov-diploma/"

gulp.task("default", function() {
	gulp.src("web_frontend/index.html")
		.pipe(gulp.dest(heroku_folder + "site/"));

	gulp.src("web_frontend/src/**/*.coffee")
		.pipe(coffee())
		.pipe(gulp.dest(heroku_folder + "site/lib/"));

	gulp.src("web_frontend/lib/**/*.js")
		.pipe(gulp.dest(heroku_folder + "site/lib/"));

	gulp.src("web_frontend/lib/**/*.css")
		.pipe(gulp.dest(heroku_folder + "site/lib/"));

	gulp.src("web_backend/server.coffee")
		.pipe(coffee())
		.pipe(gulp.dest(heroku_folder));

	gulp.src("Procfile")
		.pipe(gulp.dest(heroku_folder));

	gulp.src("package.json")
		.pipe(gulp.dest(heroku_folder));
});
