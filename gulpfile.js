var gulp = require('gulp');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

var runCommand = function(command) {
  exec(command, function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    if (err !== null) {
      console.log('exec error: ' + err);
    }
  });
}
  gulp.task("mongo-start", function() {
    runCommand("mongod");
    runCommand("mongo --host 127.0.0.1:27017");
  });
  gulp.task('node-server-start', function (cb) {
    spawn('node', ['main.js'], {stdio: 'inherit'}) 
  });
  gulp.task('ng-serve', function (cb) {
    spawn('ng', ['serve'], {stdio: 'inherit'}) 
  });
  //gulp.task('start', ['mongo-start','ng-serve', 'node-server-start'], function () {
    gulp.task('start', ['mongo-start','node-server-start','ng-serve'], function () {
  });