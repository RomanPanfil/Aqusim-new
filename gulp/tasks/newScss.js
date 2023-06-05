import dartSass from 'sass';
import gulpSass from 'gulp-sass';

import prefixer from 'gulp-autoprefixer';
import clean from 'gulp-clean-css';
import concat from 'gulp-concat';
import map from 'gulp-sourcemaps';

const sass = gulpSass(dartSass);

export const newScss = () => {
  return app.gulp.src(app.path.src.new_scss)
    .pipe(map.init())
		.pipe(sass({
      outputStyle: 'compressed'
    }).on('error', sass.logError))
		.pipe(prefixer({
			overrideBrowserslist: ['last 3 versions']
		}))
		.pipe(clean({
			level: 2
		}))
		.pipe(concat('new-style.css'))
		.pipe(map.write('sourcemaps'))
    .pipe(app.gulp.dest(app.path.build.css))
}