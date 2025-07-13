var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-html-minifier-terser');
var htmlclean = require('gulp-htmlclean');
var terser = require('gulp-terser');
// const javascriptObfuscator = require('gulp-javascript-obfuscator');

// Comprimir js
gulp.task('compress', () =>
gulp.src(['./public/**/*.js', '!./public/**/*.min.js'])
.pipe(terser())
// .pipe(javascriptObfuscator({
// compact: true,
// controlFlowFlattening: true,
// controlFlowFlatteningThreshold: 0.75,
// deadCodeInjection: true,
// deadCodeInjectionThreshold: 0.4,
// debugProtection: true,
// debugProtectionInterval: 4000,
// disableConsoleOutput: true,
// identifierNamesGenerator: 'hexadecimal',
// log: false,
// renameGlobals: false,
// }))
.pipe(gulp.dest('./public'))
)
//Comprimir css
gulp.task('minify-css', () => {
return gulp.src(['./public/**/*.css'])
.pipe(cleanCSS({
compatibility: 'ie11'
}))
.pipe(gulp.dest('./public'));
});
//Comprimir html
gulp.task('minify-html', () => {
return gulp.src('./public/**/*.html')
.pipe(htmlclean())
.pipe(htmlmin({
removeComments: true, //Limpiar comentarios html
collapseWhitespace: true, //Comprimir html
collapseBooleanAttributes: true,
//Omitir valores de atributos booleanos, ej: <input checked="true"/> ==> <input />
removeEmptyAttributes: true,
//Eliminar todos los espacios como valores de atributos, ej: <input id="" /> ==> <input />
removeScriptTypeAttributes: true,
//Eliminar type="text/javascript" de <script>
removeStyleLinkTypeAttributes: true,
//Eliminar type="text/css" de <style> y <link>
minifyJS: true, //Comprimir JS de página
minifyCSS: true, //Comprimir CSS de página
minifyURLs: true  //Comprimir URLs de página
}))
.pipe(gulp.dest('./public'))
});

// Al ejecutar el comando gulp, ejecutar las siguientes tareas en orden
gulp.task('default', gulp.parallel(
'compress', 'minify-css', 'minify-html',
))

