<!DOCTYPE html>
<html lang="en" ng-app="app">
<head>
	<meta charset="UTF-8">
	<base href="/wordpress-angular/">
	<title>Wordpress with Angular</title>
	<link rel="stylesheet" href="wp-content/themes/wordpress-angular/style.css">
	<?php wp_head(); ?>
</head>
<body>
	<header>
		<h1>
			<a href="<?php echo site_url(); ?>">AngularJS Demo Theme</a>
		</h1>
	</header>

	<div>
		<input type="text" ng-model="name">

		<p>Hello, {{name}}!</p>
	</div>
	<div ng-view></div>

	<footer>
		&copy; <?php echo date( 'Y' ); ?>
	</footer>
</body>
</html>