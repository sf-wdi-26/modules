var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('scripts', function () {
	return gulp.src('src/**/*.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default',function() {
    gulp.watch('src/**/*.js',['scripts']);
});
