angular.module('app', ['ngRoute'])
.config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/',{
		templateUrl: myLocalized.partials + 'main.html',
		controller: 'MainController'
	})
	.when('/:ID', {
		templateUrl: myLocalized.partials + 'content.html',
		controller: 'Content'
	});
})
.controller('MainController', function($scope, $http, $routeParams){
	$http.get('wp-json/posts/').success(function(res){
		$scope.posts = res;
	});
})
.controller('Content', function($scope, $http, $routeParams) {
	$http.get('wp-json/posts/' + $routeParams.ID).success(function(res){
		$scope.post = res;
	});
});