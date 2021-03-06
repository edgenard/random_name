var gulp = require('gulp');
var jshint = require('gulp-jshint');
var exec = require("child_process").exec;
var KarmaServer = require('karma').Server;
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

gulp.task('server', function (cb) {
  exec("node node_modules/http-server/bin/http-server .", function (err) {
    if (err) return cb(err);
    cb();
  });
});

gulp.task('karma', function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('test',['lint'], function () {
  runner.run({
    configFile: __dirname + "/karma.conf.js"
  });
});
