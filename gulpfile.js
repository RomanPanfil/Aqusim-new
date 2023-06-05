import gulp from 'gulp'; // Основной модуль
import { path } from './gulp/config/path.js'; // Импорт путей

// Глобальная переменная в которую передаем значения
global.app = {
  path: path,
  gulp: gulp,
}

// Импорт задач
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { scss } from "./gulp/tasks/scss.js";
import { newScss } from "./gulp/tasks/newScss.js";
import { js } from "./gulp/tasks/js.js";
import { img } from "./gulp/tasks/img.js";
import { svg } from "./gulp/tasks/svgSprite.js";
import { htaccess } from "./gulp/tasks/htaccess.js";
import { popups } from './gulp/tasks/popups.js'
import { otfToTtf, ttfToWoff, fonstStyle } from "./gulp/tasks/fonts.js";

function watcher() {
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.newScss, newScss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.img, img);
  gulp.watch(path.watch.svg, svg);
  gulp.watch(path.watch.popups, popups);
}

const fonts = gulp.series(otfToTtf, ttfToWoff, fonstStyle); // Последовательная обработака шрифтов
const svgSprite = gulp.series(svg);

// базовые задачи
// const baseTasks = gulp.parallel(html, scss, newScss, js, img)

// @task: + fonts.js
// const baseTasks = gulp.series(fonts, gulp.parallel(html, scss, newScss, js, img, svg))

//  @task: + svgSprite.js
 const baseTasks = gulp.series(svgSprite, gulp.parallel(html, popups, scss, newScss, js, img, svg))

// @task: fonts.js + svgSprite.js
// const baseTasks = gulp.series(fonts, svgSprite, gulp.parallel(html, scss, newScss, js, img, svg))

const dev = gulp.series(reset, htaccess, baseTasks, watcher)

gulp.task('default', dev);