<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<base href="/wordpress-angular/">
	<title>Wordpress with Angular</title>
	<link rel="stylesheet" href="wp-content/themes/wordpress-angular/style.css">
	<?php wp_head(); ?>
</head>
<body>
	<div ng-app="app">
		<header>
			<h1>
				<a href="<?php echo site_url(); ?>">AngularJS Demo Theme</a>
			</h1>
		</header>

		<div>
			<input type="text" ng-model="name" ng-focused="">

			<p>Hello, {{name}}!</p>
		</div>
		<search-form></search-form>
		<ul>
			<li ng-repeat="post in posts">
				<a href="{{post.ID}}" ng-bind-html="post.title"></a>
				<div ng-bind-html="post.excerpt"></div>
			</li>
		</ul>

		<div ng-view></div>

		<footer>
			&copy; <?php echo date( 'Y' ); ?>
		</footer>
	</div>
	<?php wp_footer(); ?>
</body>
</html>