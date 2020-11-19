// 实现这个项目的构建任务
//错误优先
const { series, src, dest, parallel, watch } = require('gulp')
const del = require('del')
// const sass = require('gulp-sass')
// const babel = require('gulp-babel')
// const swig = require('gulp-swig')
// const imagemin = require('gulp-imagemin')
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const browserSync = require('browser-sync')
const bs = browserSync.create()

const data = {
    menus: [
        {
            name: 'Home',
            icon: 'aperture',
            link: 'index.html',
        },
        {
            name: 'Features',
            link: 'features.html',
        },
        {
            name: 'About',
            link: 'about.html',
        },
        {
            name: 'Contact',
            link: '#',
            children: [
                {
                    name: 'Twitter',
                    link: 'https://twitter.com/w_zce',
                },
                {
                    name: 'About',
                    link: 'https://weibo.com/zceme',
                },
                {
                    name: 'divider',
                },
                {
                    name: 'About',
                    link: 'https://github.com/zce',
                },
            ],
        },
    ],
    pkg: require('./package.json'),
    date: new Date(),
}

const clean = () => {
    return del(['dist', 'temp'])
}
const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
        .pipe(plugins.sass({ outputStyle: 'expanded' }))
        .pipe(dest('temp'))
}

const scripts = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest('temp'))
}

const page = () => {
    return src('src/**/*.html', { base: 'src' })
        .pipe(plugins.swig({ data, defaults: { cache: false } }))
        .pipe(dest('temp'))
}

const image = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const fonts = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const extra = () => {
    return src('public/**', { base: 'public' }).pipe(dest('dist'))
}

//生产环境进行html注释路径匹配
const useref = () => {
    return src('temp/**/*.html', { base: 'temp' })
        .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
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
        .pipe(dest('dist'))
}
const server = () => {
    //监听文件路径变化触发回调函数
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', scripts)
    watch('src/**/*.html', page)
    watch(
        ['src/assets/images/**', 'src/assets/fonts/**', 'public/**'],
        bs.reload
    )
    /*    
    watch('src/assets/images/**', image)
    watch('src/assets/fonts/**', fonts)
    watch('public/**', extra) 
    */
    bs.init({
        notify: false,
        port: 2024,
        files: 'dist/**', //监听文件改变触发serve
        server: {
            baseDir: ['temp', 'src', 'public'],
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
