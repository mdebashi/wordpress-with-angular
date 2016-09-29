angular.module('app', ['ngRoute', 'ngSanitize'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/',{
		templateUrl: myLocalized.templates + 'main.html',
		controller: 'MainController'
	})
	.when('/:slug', {
		templateUrl: myLocalized.templates + 'content.html',
		controller: 'ContentController'
	});
}])
.controller('MainController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
	$http.get('wp-json/posts/').success(function(res){
		$scope.posts = res;
	});
}])
.controller('ContentController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$http.get('wp-json/posts/?filter[name]' + $routeParams.slug).success(function(res){
		for (var i = res.length - 1; i >= 0; i--) {
			if(res[i]["slug"] == $routeParams.slug){
				$scope.post = res[i];
			}
		}
	});
}])
.directive('searchForm', function(){
	return {
		restrict: 'EA',
		templateUrl: myLocalized.templates + 'search-form.html',
		controller: ['$scope', '$http', function($scope, $http){
			$scope.filter = {
				s: ''
			};
			$scope.search = function(){
				$http.get('wp-json/posts/?filter[s]=' + $scope.filter.s).success(function(res){
					$scope.posts = res;
				});
			};
		}]
	};
});