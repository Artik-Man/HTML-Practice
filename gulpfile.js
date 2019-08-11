const gulp = require('gulp');
const pug = require('gulp-pug');
const connect = require('gulp-connect');

gulp.task('pug', () => {
  return gulp
    .src('./index.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(file => './'));
});

gulp.task('webserver', () =>
  connect.server({
    root: './',
    livereload: true,
    port: parseInt(process.env.PORT) || 8080,
    host: 'localhost',
  })
);

gulp.task('watch', () => {
  gulp.watch('./**/*.pug', gulp.series('pug'));
});

gulp.task('default', gulp.parallel('pug'));

gulp.task('serve', gulp.parallel('default', 'webserver', 'watch'));