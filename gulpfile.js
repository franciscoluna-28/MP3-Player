const { src, dest, watch, series } = require("gulp")
const sass = require("gulp-sass")(require("sass"))

function SASSCompiler() {
    return src("./src/*.scss")
    .pipe(sass())
    .pipe(dest("./dist"))
}

function watchSASS() {
    watch(["./src/*.scss"], SASSCompiler)
}

exports.default = series(SASSCompiler, watchSASS)