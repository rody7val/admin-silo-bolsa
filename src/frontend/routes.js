define(['./app'], function (app) {

	'use strict';

	return app.config(['$authProvider', '$stateProvider', '$locationProvider', function ($authProvider, $stateProvider, $locationProvider) {

		$authProvider.loginUrl = "http://localhost:3000/auth/login";
		$authProvider.signupUrl = "http://localhost:3000/auth/signup";
		$authProvider.tokenName = "token";
		$authProvider.tokenPrefix = "cahc";

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

		// Configuración de las rutas/estados
		$stateProvider
		.state("home", {
			url: "/",
			templateUrl: "frontend/templates/index.html",
			controller: "Home"
		})
		//session
		.state("login", {
			url: "/login",
			templateUrl: "frontend/templates/session/login.html",
			controller: "Login",
			controllerAs: "login"
		})
		.state("forgot", {
			url: "/forgot",
			templateUrl: "frontend/templates/session/forgot.html",
			controller: "Forgot",
			controllerAs: "forgot"
		})
		.state("reset", {
			url: "/reset/:token",
			templateUrl: "frontend/templates/session/reset.html",
			controller: "Reset",
			controllerAs: "reset"
		})
		.state("signup", {
			url: "/signup",
			templateUrl: "frontend/templates/session/signup.html",
			controller: "Signup",
			controllerAs: "signup"
		})
		.state("logout", {
			url: "/logout",
			templateUrl: null,
			controller: "Logout"
		})
		//user
		.state('users', {
			url: '/users',
			templateUrl: 'frontend/templates/user/list.html',
			controller: 'UserList',
			controllerAs: 'users'
		})
		//default
		.state("otherwise", {
			url: "/*path",
			templateUrl: "frontend/templates/404.html"
		});

	}]);

});