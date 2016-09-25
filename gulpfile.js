/**
 *
 * Gulpfile setup
 *
 * @since 1.0.0
 * @authors Mohammed Debashi
 * @package neat
 * @forks _s & some-like-it-neat
 */


// Project configuration
var project 		= 'neat', // Project name, used for build zip.
	url 		= 'http://localhost/wordpress-angular', // Local Development URL for BrowserSync. Change as-needed.
	build 		= './buildtheme/', // Files that you want to package into a zip go here
	buildInclude 	= [
				// include common file types
				'**/*.php',
				'**/*.html',
				'**/*.css',
				'**/*.js',
				'**/*.svg',
				'**/*.ttf',
				'**/*.otf',
				'**/*.eot',
				'**/*.woff',
				'**/*.woff2',

				// include specific files and folders
				'screenshot.png',

				// exclude files and folders
				'!node_modules/**/*',
				'!assets/bower_components/**/*',
				'!style.css.map',
				'!assets/js/custom/*',
				'!assets/css/patrials/*'

			];

// Load plugins
var 	gulp         = require('gulp'),
		browserSync  = require('browser-sync'), // Asynchronous browser loading on .scss file changes
		reload       = browserSync.reload,
		autoprefixer = require('gulp-autoprefixer'), // Autoprefixing magic
		minifycss    = require('gulp-uglifycss'),
		filter       = require('gulp-filter'),
		uglify       = require('gulp-uglify'),
		imagemin     = require('gulp-imagemin'),
		newer        = require('gulp-newer'),
		rename       = require('gulp-rename'),
		concat       = require('gulp-concat'),
		notify       = require('gulp-notify'),
		cmq          = require('gulp-combine-media-queries'),
		runSequence  = require('gulp-run-sequence'),
		sass         = require('gulp-sass'),
		plugins      = require('gulp-load-plugins')({ camelize: true }),
		ignore       = require('gulp-ignore'), // Helps with ignoring files and directories in our run tasks
		rimraf       = require('gulp-rimraf'), // Helps with removing files and directories in our run tasks
		zip          = require('gulp-zip'), // Using to zip up our packaged theme into a tasty zip file that can be installed in WordPress!
		plumber      = require('gulp-plumber'), // Helps prevent stream crashing on errors
		cache        = require('gulp-cache'),
		sourcemaps   = require('gulp-sourcemaps');
/**
 * Browser Sync
 *
 * Asynchronous browser syncing of assets across multiple devices!! Watches for changes to js, image and php files
 * Although, I think this is redundant, since we have a watch task that does this already.
*/
gulp.task('browser-sync', function() {
	var files = [
			'**/*.php',
			'**/*.{png,jpg,gif}'
		    ];
	browserSync.init(files, {

		// Read here http://www.browsersync.io/docs/options/
		proxy: url,

		// port: 8080,

		// Tunnel the Browsersync server through a random Public URL
		// tunnel: true,

		// Attempt to use the URL "http://my-private-site.localtunnel.me"
		// tunnel: "ppress",

		// Inject CSS changes
		injectChanges: true

	});
});

/**
 * Styles
 *
 * Looking at src/sass and compiling the files into Expanded format, Autoprefixing and sending the files to the build folder
 *
 * Sass output styles: https://web-design-weekly.com/2014/06/15/different-sass-output-styles/
*/
gulp.task('styles', function () {
	return	gulp.src('./assets/css/*.scss')
			.pipe(plumber())
			.pipe(sourcemaps.init())
			.pipe(sass({
				errLogToConsole: true,
	
				//outputStyle: 'compressed',
				outputStyle: 'compact',
				// outputStyle: 'nested',
				// outputStyle: 'expanded',
				precision: 10
			}))
			.pipe(sourcemaps.write({includeContent: false}))
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(autoprefixer('last 2 version', '> 1%', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
			.pipe(sourcemaps.write('.'))
			.pipe(plumber.stop())
			.pipe(gulp.dest('./'))
			.pipe(filter('**/*.css')) // Filtering stream to only css files
			.pipe(reload({stream:true})) // Inject Styles when style file is created
			.pipe(rename({ suffix: '.min' }))
			.pipe(minifycss({
				maxLineLen: 80
			}))
			.pipe(gulp.dest('./'))
			.pipe(reload({stream:true})) // Inject Styles when min style file is created
			.pipe(notify({ message: 'Styles task complete', onLast: true }))
});

/**
 * Scripts: Vendors
 *
 * Look at src/js and concatenate those files, send them to assets/js where we then minimize the concatenated file.
*/
gulp.task('vendorsJs', function() {
	return 	gulp.src(['./assets/js/vendor/*.js'])
			.pipe(concat('vendors.js'))
			.pipe(gulp.dest('./assets/js'))
			.pipe(rename( {
				basename: "vendors",
				suffix: '.min'
			}))
			.pipe(uglify())
			.pipe(gulp.dest('./assets/js/'))
			.pipe(notify({ message: 'Vendor scripts task complete', onLast: true }));
});


/**
 * Scripts: Custom
 *
 * Look at src/js and concatenate those files, send them to assets/js where we then minimize the concatenated file.
*/

gulp.task('scriptsJs', function() {
	return 	gulp.src('./assets/js/custom/*.js')
			.pipe(concat('custom.js'))
			.pipe(gulp.dest('./assets/js'))
			.pipe(rename( {
				basename: "custom",
				suffix: '.min'
			}))
			.pipe(uglify())
			.pipe(gulp.dest('./assets/js/'))
			.pipe(notify({ message: 'Custom scripts task complete', onLast: true }));
});

 // Watch Task
 gulp.task('default', ['styles', 'vendorsJs', 'scriptsJs', 'browser-sync'], function () {
 	gulp.watch('./assets/img/raw/**/*', ['images']); 
 	gulp.watch('./assets/css/**/*.scss', ['styles']);
 	gulp.watch('./assets/js/**/*.js', ['scriptsJs', browserSync.reload]);

 });