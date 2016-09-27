<?php
function my_scripts() {
	
	wp_register_script(
		'angularjs',
		get_stylesheet_directory_uri() . '/scripts/node_modules/angular/angular.js'
	);
	wp_register_script(
		'angularjs-route',
		get_stylesheet_directory_uri() . '/scripts/node_modules/angular-route/angular-route.js'
	);
	wp_enqueue_script(
		'my-scripts',
		get_stylesheet_directory_uri() . '/scripts/scripts.js',
		array( 'angularjs', 'angularjs-route' )
	);
	wp_localize_script(
		'my-scripts',
		'myLocalized',
		array(
			'partials' => trailingslashit( get_template_directory_uri() ) . 'partials/'
			)
	);
}
add_action( 'wp_enqueue_scripts', 'my_scripts' );