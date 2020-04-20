const gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify-es').default,
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    newer = require('gulp-newer'),
    browserSync = require('browser-sync').create()

const path = {
    src: {
        html: 'src/**/*.html',
        images: 'src/images/*',
        scss: 'src/scss/*.scss',
        js: 'src/js/**/*.js'
    },
    build: {
        images: 'public/assets/images/',
        html: 'public/',
        css: 'public/assets/css/',
        js: 'public/assets/js/'
    },
}

const htmlWatch = () =>
    gulp.src(path.src.html)
        .pipe(newer(path.build.html))
        .pipe(gulp.dest(path.build.html))

const imagesWatch = () =>
    gulp.src(path.src.images)
        .pipe(newer(path.build.images))
        .pipe(gulp.dest(path.build.images))

const sassWatch = () =>
    gulp.src(path.src.scss)
        .pipe(concat('app.min.css'))
        .pipe(sass({outputStyle: 'compressed'})
        .on('error', sass.logError))
        .pipe(gulp.dest(path.build.css))

const jsWatch = () =>
    gulp.src([path.src.js])
        .pipe(babel({presets: ['env']}))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))

const serverWatch = () => {
    browserSync.init({
        server: {
            baseDir: "./public",
            index: "/index.html"
        }
    })

    gulp.watch(path.src.html, htmlWatch)
    gulp.watch(path.src.scss, sassWatch)
    gulp.watch(path.src.js, jsWatch)
    gulp.watch(path.src.images, imagesWatch)
    gulp.watch("public/**/*.*").on('change', browserSync.reload)
}

gulp.task('default', gulp.parallel(htmlWatch, sassWatch, jsWatch, imagesWatch, serverWatch))