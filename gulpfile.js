const gulp 		   = require('gulp');
const sass 		   = require('gulp-sass');
const concat 	   = require('gulp-concat');
const debug 	   = require('gulp-debug');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS 	   = require('gulp-clean-css');
const uglify       = require('gulp-uglify');
const imagemin     = require('gulp-imagemin');
const del 		   = require('del');
const browserSync  = require('browser-sync').create();
const csso 		   = require('gulp-csso');
const htmlmin      = require('gulp-htmlmin');



const cssFiles = [
	'./app/css/*.css',
	]

const jsFiles = [
	'./app/js/*.js',
	]
const images = [
	'./app/img/*',
	]

function styles() {
	return gulp.src(cssFiles)
				.pipe(concat('all.min.css'))
				.pipe(debug({title: 'unicorn:'}))
				.pipe(autoprefixer({
					browsers: ['>0.1%'],
					cascade: true
				}))
				.pipe(csso())
				.pipe(cleanCSS({
					level: 2
				}))
				.pipe(gulp.dest('dist/css'))
				.pipe(browserSync.stream());
}
function sasscss(){
	return gulp.src('app/sass/main.sass')
				.pipe(sass().on('error', sass.logError))
    			.pipe(gulp.dest('app/css'))
    			.pipe(browserSync.stream());
}

function scripts(){
	return gulp.src(jsFiles)
				.pipe(concat('all.min.js'))
				.pipe(gulp.dest('dist/js'))
				.pipe(browserSync.stream());
}


function debuger(){
	return gulp.src('./app/*')
		.pipe(debug({title: 'unicorn:'}))
		.pipe(gulp.dest('dist/'))
}

function watch (){
	browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
	gulp.watch('app/**/*.sass').on('change', sasscss, browserSync.reload);
	gulp.watch('app/js/*.js').on('change', scripts);
	gulp.watch('app/*.html').on('change', browserSync.reload);
}

function clean(){
	return del(['dist/*'])
}

function imageMinify(){
	return gulp.src(images)
			.pipe(imagemin())
			.pipe(gulp.dest('dist/img'))
}

function htmlMinify(argument) {
	return gulp.src('app/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist'));
}

gulp.task('styles', styles);
gulp.task('scripts', scripts); 
gulp.task('watch', watch);
gulp.task('sass', sasscss);
gulp.task('debuger', debuger);
gulp.task('imageMinify', imageMinify);
gulp.task('htmlMinify', htmlMinify);
gulp.task('clean', clean);

gulp.task('build', gulp.series(clean, //clean - без кавычек, т.к. не таск, а функция. series - вызывает таски поочередно
			gulp.series(sasscss,
			gulp.parallel(styles, scripts, imageMinify, htmlMinify) //parallel - выполняет таски параллельно
			)));
gulp.task('dev', gulp.series('build', 'watch'));