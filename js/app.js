angular.module('app', ['ngRoute'])
.config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);
	$routeProvider
	.when('/',{
		templateUrl: myLocalized.partials + 'main.html',
		controller: 'MainController'
	});
})
.controller('MainController', function(){
	console.log('Looks like main has loaded! Yaat');
});