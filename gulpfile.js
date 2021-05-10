var ghpages = require('gh-pages');
var through = require('through2');
var gutil = require('gulp-util');
var beautify = require('gulp-beautify');
var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var yaml = require('gulp-yaml');

var dist = path.join(__dirname, 'dist');
var out = path.join(__dirname, 'out');

gulp.task('copy', () => gulp.src('dist/**/*').pipe(gulp.dest(out)));

gulp.task('default', ['listScaffolds', 'copy']);

function generatorData(fileName) {
  const list = [];
  let firstFile = null;
  function parseAndMerge(file, encode, callback) {
    if (!firstFile) {
      firstFile = file;
    }
    try {
      const parsed = JSON.parse(file.contents.toString(encode));
      list.push(parsed);
    } catch (err) { }
    callback();
  }
  function endStream() {
    const content = JSON.stringify({ list });
    const output = new gutil.File({
      cwd: firstFile.cwd,
      base: firstFile.base,
      path: path.join(firstFile.base, fileName),
      contents: new Buffer(content),
    });
    this.emit('data', output);
    this.emit('end');
  }
  return through.obj(parseAndMerge, endStream);
}

gulp.task('listScaffolds', () => {
  gulp.src(['./scaffolds/**/index.yml'])
    .pipe(yaml({ safe: true }))
    .pipe(generatorData('list.json'))
    .pipe(beautify({ indent_size: 2 }))
    .pipe(gulp.dest(out));
});
