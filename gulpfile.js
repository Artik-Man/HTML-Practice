const gulp = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');
const connect = require('gulp-connect');

gulp.task('pug', () => {
  return gulp
    .src('./index.pug')
    .pipe(
      pug({
        pretty: true,
        filters: {
          escape: code => {
            return code.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
          },
        },
      }),
    )
    .pipe(gulp.dest(file => './'));
});

gulp.task('less', () => {
  return gulp
    .src('./styles/template.less')
    .pipe(
      less()
    )
    .pipe(gulp.dest('./styles/'));
});

gulp.task('webserver', () =>
  connect.server({
    root: './',
    livereload: true,
    port: parseInt(process.env.PORT) || 8080,
    host: 'localhost',
  }),
);

gulp.task('watch', () => {
  gulp.watch('./**/*.pug', gulp.series('pug'));
  gulp.watch('./styles/*.less', gulp.series('less'));
});

gulp.task('default', gulp.parallel('pug', 'less'));

gulp.task('serve', gulp.parallel('default', 'webserver', 'watch'));
