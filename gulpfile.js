/**
 *
 * Gulpfile for Wordpress Setup
 *
 * @authors Mohammed Debashi
 */


// Project configuration
var project 		= 'wordpress-angular', // Project name, used for build zip.
	url 		= 'http://localhost/wordpress-angular'; // Local Development URL for BrowserSync. Change as-needed.

// Load plugins
var 	gulp         = require('gulp'),
		browserSync  = require('browser-sync'), // Asynchronous browser loading on .scss file changes
		reload       = browserSync.reload,
		imagemin     = require('gulp-imagemin'),
		concat       = require('gulp-concat'),
		notify       = require('gulp-notify'),
		sass         = require('gulp-sass'),
		zip          = require('gulp-zip'), // Using to zip up our packaged theme into a tasty zip file that can be installed in WordPress!
		plumber      = require('gulp-plumber'), // Helps prevent stream crashing on errors
		gnf 		 = require('gulp-npm-files'),
		del			 = require('del');
/**
 * Browser Sync
 *
 * Asynchronous browser syncing of assets across multiple devices!! Watches for changes to js, image and php files
 * Although, I think this is redundant, since we have a watch task that does this already.
*/

gulp.task('browser-sync', function() {
	var files = [
			'**/*.php',
			'**/*.html',
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
 * Place node Modules in theme
 *
 * 
 *
 *
*/
gulp.task('nodeModules-dependencies', function(){
	return gulp.src(gnf(), {
				base: './'
			})
			.pipe(plumber())
			.pipe(gulp.dest('./scripts'))
			.pipe(notify({ message: 'Node modules dependencies task complete', onLast: true }));
});

/**
 * Compile SASS to CSS
 *
 * 
 *
 *
*/
gulp.task('styles', function(){
	return	gulp.src('css/sass/*.scss')
			.pipe(plumber())
			.pipe(sass({
				errorToConsole: true,
				outputStyle: 'compact'
			}))
			.pipe(gulp.dest('./')) //should change this to css later
			.pipe(notify({ message: 'Styles task complete', onLast: true }));
});

/**
 * Compile and concat all javascript files
 *
 * 
 *
 *
*/
gulp.task('scriptsJs', function(){
	return 	gulp.src(['js/**/*.js'])
			.pipe(plumber())
			.pipe(concat('scripts.js'))
			.pipe(gulp.dest('./scripts'))
			.pipe(notify({ message: 'ScriptsJs task complete', onLast: true }));
});


/**
 * Optomise all images
 *
 * 
 *
 *
*/
gulp.task('images', function(){
	// TO DO: add img task
});



// Watch Task
gulp.task('default', ['nodeModules-dependencies', 'scriptsJs', 'browser-sync'], function () {
 	gulp.watch('./img/**/*', ['images']); 
 	gulp.watch('./css/**/*.scss', ['styles', browserSync.reload]);
 	gulp.watch('./js/**/*.js', ['scriptsJs', browserSync.reload]);

 });