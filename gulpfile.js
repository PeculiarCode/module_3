// 实现这个项目的构建任务
//错误优先
const { series, src, dest, parallel, watch } = require('gulp')
const del = require('del')
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const browserSync = require('browser-sync')
const bs = browserSync.create()
const { config } = require('./path.config')
const { data } = require('./src/data/data.js')
const clean = () => {
    return del([config.DIST, config.TEMP])
}
const style = () => {
    return src(config.STYLE, { base: config.SRC })
        .pipe(plugins.sass({ outputStyle: 'expanded' }))
        .pipe(dest(config.TEMP))
        .pipe(bs.reload({ stream: true }))
}

const scripts = () => {
    return src(config.SCRIPTS, { base: config.SRC })
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest(config.TEMP))
        .pipe(bs.reload({ stream: true }))
}

const page = () => {
    return src(config.PAGE, { base: config.SRC })
        .pipe(plugins.swig({ data, defaults: { cache: false } }))
        .pipe(dest(config.TEMP))
        .pipe(bs.reload({ stream: true }))
}

const image = () => {
    return src(config.IMAGE, { base: config.SRC })
        .pipe(plugins.imagemin())
        .pipe(dest(config.DIST))
}

const fonts = () => {
    return src(config.FONTS, { base: config.SRC })
        .pipe(plugins.imagemin())
        .pipe(dest(config.DIST))
}

const extra = () => {
    return src(config.EXTRA, { base: config.PUBLIC }).pipe(dest(config.DIST))
}

//生产环境进行html注释路径匹配
const useref = () => {
    return src(config.TEMPS, { base: config.TEMP })
        .pipe(plugins.useref({ searchPath: [config.TEMP, config.LOCAL] }))
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        .pipe(
            plugins.if(
                /\.html$/,
                plugins.htmlmin({
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                })
            )
        )
        .pipe(dest(config.DIST))
}
const server = () => {
    //监听文件路径变化触发回调函数
    watch(config.STYLE, style)
    watch(config.SCRIPTS, scripts)
    watch(config.PAGE, page)
    watch([config.IMAGE, config.FONTS, config.EXTRA], bs.reload)
    /*    
    watch('src/assets/images/**', image)
    watch('src/assets/fonts/**', fonts)
    watch('public/**', extra) 
    */
    bs.init({
        notify: false,
        port: 2024,
        // files: 'dist/**', //监听文件改变触发serve
        server: {
            baseDir: [config.TEMP, config.SRC, config.PUBLIC],
            routes: {
                '/node_modules': 'node_modules',
            },
        },
    })
}
//文件路径和后缀名都不能有错误拼写否则watch无法执行
const compile = parallel(page, scripts, style)
const build = series(
    clean,
    parallel(series(compile, useref), extra, image, fonts)
)
const serve = series(compile, server)
module.exports = {
    build,
    serve,
}
