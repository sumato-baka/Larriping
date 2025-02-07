const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const clean = require('gulp-clean');
const order = require('gulp-order');

const src_path = 'src';
const src_assets_path = 'src/assets';
const src_media_path = 'src/assets/media';
const build_path = 'build';
const build_assets_path = 'build/assets';
const build_media_path = 'build/assets/media';

function _styles() {
	return src([
		src_assets_path + '/scss/style.scss',
		src_assets_path + '/scss/**/*.scss',
		src_assets_path + '/libs/**/*.css'
	])
		.pipe(concat('style.min.css'))
		.pipe(scss({ style: 'compressed' }))
		.pipe(dest(build_assets_path + '/css'))
		.pipe(browserSync.stream())
}

function _scripts() {
	return src([
		src_assets_path + '/js/script.js',
		src_assets_path + '/js/**/*.js',
		src_assets_path + '/libs/**/*.js'
	])
		.pipe(order([
			'jQuery/jQuery.js'
		]))
		.pipe(concat('script.min.js'))
		.pipe(uglify())
		.pipe(dest(build_assets_path + '/js'))
		.pipe(browserSync.stream())
}

function _media() {
	// TODO:
	// 		Add image extension convertation: *.* -> *.webp
	return src(src_media_path + '/**/*.svg', { base: src_media_path })
		.pipe(dest(build_media_path))
		.pipe(src(src_media_path + '/**/*.webp', { base: src_media_path, encoding: false }))
		.pipe(dest(build_media_path))
		.pipe(browserSync.stream())
}

function _fonts() {
	// TODO:
	//		Add font extension convertation: *.* -> [*.woff, *.otf, *.woff2, ...]
	return src(src_assets_path + '/fonts/*', { base: src_media_path, encoding: false })
		.pipe(dest(build_media_path))
}

function _pages() {
	return src(src_path + '/index.html')
		.pipe(dest(build_path))
		.pipe(browserSync.stream())
}

function _watcher() {
	watch([
		src_assets_path + '/scss/style.scss',
		src_assets_path + '/scss/**/*.scss',
		src_assets_path + '/libs/**/*.css'
	], _styles)
	watch([
		src_assets_path + '/js/*.js',
		src_assets_path + '/js/**/*.js',
		src_assets_path + '/libs/**/*.js'
	], _scripts)
	watch([
		src_assets_path + '/**/*.svg',
		src_assets_path + '/**/*.webp'
	], _media)
	watch(src_assets_path + '/fonts/*', _fonts)
	watch(src_path + '/index.html', _pages)
	watch(build_path + '/index.html').on('change', browserSync.reload)
}

function _browserSync() {
	browserSync.init({
		server: {
			baseDir: build_path
		},
		notify: false
	})
}

function _build() {
	return src([
		src_assets_path + '/css/style.min.css',
		src_assets_path + '/js/script.min.js',
		src_path + '/index.html'
	], { base: src_path }).pipe(dest(build_path))
}

function _clean() {
	return src(build_path + '/*', { read: false })
		.pipe(clean())
}

exports.styles = _styles;
exports.scripts = _scripts;
exports.media = _media;
exports.fonts = _fonts;
exports.pages = _pages;
exports.clean = _clean;
exports.build = series(
	_styles,
	_scripts,
	_media,
	_fonts,
	_pages
)
exports.cbuild = series(_clean, _build);

exports.run = parallel(
	_styles,
	_scripts,
	_media,
	_fonts,
	_pages,
	_watcher,
	_browserSync
)
exports.default = exports.run