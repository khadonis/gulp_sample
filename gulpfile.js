var gulp = require('gulp'),
cleanCSS = require('gulp-clean-css'),
concat=require('gulp-concat'),
uglify=require('gulp-uglify'),
projectError=require('gulp-util'),
rename=require('gulp-rename'),
watch=require('gulp-watch'),
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
	return gulp.src(['app/js/*.js', '!app/js/app.js'])
	.pipe(concat('app.js'))
	.pipe(gulp.dest('app/js'))
	.pipe(uglify())
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest('dist/js'))
	.on('error', projectError.log)
});

gulp.task('default', ['sass', 'manage'], function(){
	gulp.watch(['app/sass/*.scss','app/css/*css'], ['sass']);
	gulp.watch(['app/js/*js', 'app/js/*js'], ['manage']);
});