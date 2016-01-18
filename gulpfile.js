var gulp = require('gulp');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync').create();
var Server = require('karma').Server;
var runner = require('karma').runner;

gulp.task('default',["lint"], function() {
  console.log("\n\nBuild OK");
});

gulp.task('lint', function () {
  return gulp.src(['./src/**/*.js',"!./src/vendor/chai*.js", "gulpfile.js"])
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(jshint.reporter("fail"));
});

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: "src"
    }
  });
});

gulp.task('karma', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('test',['lint'], function () {
  runner.run({
    configFile: __dirname + "/karma.conf.js"
  });
});
