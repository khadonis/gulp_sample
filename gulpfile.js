var gulp = require('gulp'),
cleanCSS = require('gulp-clean-css'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
projectError = require('gulp-util'),
rename = require('gulp-rename'),
watch = require('gulp-watch'),
imagemin = require('gulp-imagemin'),
cache = require('gulp-cache'),
gulpImport = require('gulp-html-import'),
sass = require('gulp-sass');

gulp.task('sass', function(){
	gulp.src('app/sass/app.scss')
	.pipe(sass())
	.pipe(gulp.dest('app/css'))
	.pipe(cleanCSS())
	.pipe(rename('app.min.css'))
	.pipe(gulp.dest('dist/css'));
});

gulp.task('manage', function(){
	return gulp.src(['app/js/jquery-1.12.4.min.js', 'app/js/*.js', '!app/js/app.js'])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('app/js'))
	.pipe(uglify())
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest('dist/js'))
	.on('error', projectError.log)
});

gulp.task('fonts', function(){
	gulp.src('app/font/*.*')
	.pipe(gulp.dest('dist/font'))
});

gulp.task('images', function(){
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
	.pipe(cache(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.jpegtran({progressive: true, optimizationLevel: 5}),
		imagemin.optipng({optimizationLevel: 5}),
		imagemin.svgo({plugins: [{removeViewBox: true}]})
		])))
	.pipe(gulp.dest('dist/images'))
});

gulp.task('import', function () {
    gulp.src('app/*.html')
        .pipe(gulpImport('app/temp/'))
        .pipe(gulp.dest('dist')); 
});

gulp.task('default', ['sass', 'manage', 'fonts', 'images', 'import'], function(){
	gulp.watch(['app/sass/*.scss','app/css/*css'], ['sass']);
	gulp.watch(['app/js/*js', 'app/js/*js'], ['manage']);
	gulp.watch(['app/font/*', 'app/font/*'], ['fonts']);
	gulp.watch(['app/images/**/*)', 'app/images/**/*'], ['images']);
	gulp.watch(['app/temp/*.html)', 'app/**/*.html'], ['import']);
});
