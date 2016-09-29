angular.module('app', ['ngRoute', 'ngSanitize'])
.config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/',{
		templateUrl: myLocalized.templates + 'main.html',
		controller: 'MainController'
	})
	.when('/:ID', {
		templateUrl: myLocalized.templates + 'content.html',
		controller: 'ContentController'
	});
})
.controller('MainController', function($scope, $http, $routeParams){
	$http.get('wp-json/posts/').success(function(res){
		$scope.posts = res;
	});
})
.controller('ContentController', function($scope, $http, $routeParams) {
	$http.get('wp-json/posts/' + $routeParams.ID).success(function(res){
		$scope.post = res;
	});
})
.directive('searchForm', function(){
	return {
		restrict: 'EA',
		templateUrl: myLocalized.templates + 'search-form.html',
		controller: function($scope, $http){
			$scope.filter = {
				s: ''
			};
			$scope.search = function(){
				$http.get('wp-json/posts/?filter[s]=' + $scope.filter.s).success(function(res){
					$scope.posts = res;
				});
			};
		}
	};
});