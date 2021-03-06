const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const csso = require('gulp-csso');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const webpackStream = require('webpack-stream');
const posthtml = require('gulp-posthtml');
const htmlMin = require('gulp-htmlmin');
const include = require('posthtml-include');

function bs(done) {
  browserSync.init({
    server: {
      baseDir: 'dist',
    },
    port: 3000,
  });
  done();
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}

function styles() {
  return gulp.src([
    'src/sass/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', notify.onError()))
    .pipe(autoprefixer(['last 4 versions']))
    .pipe(csso({
      comments: false,
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}

function html() {
  return gulp.src('src/*.html')
    .pipe(posthtml([
      include(),
    ]))
    .pipe(htmlMin({
      collapseWhitespace: true,
    }))
    .pipe(gulp.dest('dist'));
}

function images() {
  return gulp.src('src/assets/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
    ]))
    .pipe(gulp.dest('dist/assets'));
}

function scripts() {
  return gulp.src('./src/js/index.js')
    .pipe(webpackStream({
      output: {
        filename: 'index.js',
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
    }))
    .pipe(gulp.dest('./dist/js'));
}

function code() {
  return gulp.src('dist/*.html').pipe(browserSync.reload({ stream: true }));
}

function watchFiles() {
  gulp.watch('src/**/*.scss', styles);
  gulp.watch('src/**/*.js', gulp.series(scripts, browserSyncReload));
  gulp.watch('src/*.html',
    gulp.series(gulp.parallel(code, html), browserSyncReload));
}

const build = gulp.parallel(styles, scripts, images, html);
const watch = gulp.parallel(watchFiles, bs);

exports.build = build;
exports.watch = watch;
exports.default = gulp.series(build, watch);
