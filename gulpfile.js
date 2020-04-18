let gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify-es').default,
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    newer = require('gulp-newer')

let path = {
    src: {
        html: 'src/**/*.html',
        images: 'src/images/**/*.*',
        scss: 'src/scss/*.scss',
        js: 'src/js/**/*.js'
    },
    build: {
        images: 'public/assets/images/',
        html: 'public/',
        css: 'public/assets/css/',
        js: 'public/assets/js/'
    },
};

gulp.task('watch', () => {
    gulp.watch([path.src.js], gulp.parallel('js'))
    gulp.watch([path.src.scss], gulp.parallel('sass'))
    gulp.watch([path.src.html], gulp.parallel('html'))
    gulp.watch([path.src.images], gulp.parallel('images'))
})

gulp.task('html', () =>  
    gulp.src(path.src.html)
        .pipe(newer(path.build.html))
        .pipe(gulp.dest(path.build.html))
)

gulp.task('images', () => 
    gulp.src(path.src.images)
        .pipe(newer(path.build.images))
        .pipe(gulp.dest(path.build.images))
)

gulp.task('sass', () =>
    gulp.src(path.src.scss)
        .pipe(concat('app.min.css'))
        .pipe(sass({outputStyle: 'compressed'})
        .on('error', sass.logError))
        .pipe(gulp.dest(path.build.css))
)

gulp.task('js', () =>
    gulp.src([path.src.js])
        .pipe(babel({presets: ['env']}))
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
)

gulp.task('default', gulp.series(['html', 'images', 'sass', 'js', 'watch']))