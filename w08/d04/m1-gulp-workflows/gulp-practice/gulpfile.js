var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');

gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js/'))
})

gulp.task('styles', function (){
  gulp.src("src/sass/**/*.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'))
})

// set up seperate watch task
gulp.task('watch', function(){
  // how can i watch multiple tasks?
  gulp.watch('src/**/*',['scripts', 'styles']);
});

// now it transpiles and then watches for changes
gulp.task('default', ['scripts', 'styles', 'watch']);