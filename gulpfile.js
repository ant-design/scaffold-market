var ghpages = require('gh-pages');
var gulp = require('gulp');
var path = require('path');

var dist = path.join(__dirname, 'dist');

gulp.task('copy', () => gulp.src('data/list.json').pipe(gulp.dest(dist)));

gulp.task('default', ['copy'], () => ghpages.publish(dist));
