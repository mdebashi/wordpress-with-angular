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
	})
	.when('/category/:category', {
		templateUrl: myLocalized.templates + 'main.html',
		controller: 'MainController'
	})
	.otherwise({
		redirectTo: '/'
	});
}])
.controller('MainController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams){
	$http.get('wp-json/posts/').success(function(res){
		$scope.posts = res;
		$scope.pageTitle = 'Latest Posts:';
		document.querySelector('title').innerHTML = 'Home | Wordpress with Angular';
	});
	console.log('categories out', $scope.categories)
}])
.controller('ContentController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {
	$http.get('wp-json/posts/?filter[name]' + $routeParams.slug).success(function(res){
		for (var i = res.length - 1; i >= 0; i--) {
			if(res[i]["slug"] == $routeParams.slug){
				$scope.post = res[i];
				document.querySelector('title').innerHTML = res[i].title + ' | AngularJS Demo Theme';
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
})
.directive('categoryList', function(){
	return{
		restrict: 'EA',
		templateUrl: myLocalized.templates + 'category-list.html',
		controller: ['$scope', '$http', function($scope, $http){
			$http.get('wp-json/taxonomies/category/terms').success(function(res){
				$scope.categories = res;
				console.log('categories in', $scope.categories);
			});
		}]
	}
});