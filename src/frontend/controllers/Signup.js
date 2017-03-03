define(['./module'], function (controllers) {

	'use strict';

	controllers.controller('Signup', ['$scope', '$auth', '$location', '$window', function ($scope, $auth, $location, $window) {

		if ($auth.isAuthenticated())
			return $location.path("/");

		var vm = this;
		
		$scope.loading = false;
		$scope.feedback_name = '';
		$scope.feedback_email = '';
		$scope.feedback_password = '';
		$scope.feedback_err = '';

		this.signup = function() {
			$scope.loading = true;
			vm.admin = $scope.usersCount == 0 ? true : false;
			vm.active = $scope.usersCount == 0 ? true : false;

			$auth.signup({
				name: vm.name,
				email: vm.email,
				password: vm.password,
				admin: vm.admin,
				active: vm.active
			})
			.then(function (res) {
				var api = res.data;

				if (res.status === 200) {
					$auth.login({ name: vm.name, email: vm.email, password: vm.password })
					.then(function(){
						$scope.loading = false;
						localStorage.setItem('user', JSON.stringify(api.user));
						// Recargar el sitio para que no pueda ser duplicado el registro de super-administrador
						$window.location.reload();
						return $location.path("/");
					});
				}
			})
			.catch(function(res) {
				$scope.loading = false;
				$scope.feedback_name = '';
				$scope.feedback_email = '';
				$scope.feedback_password = '';
				$scope.feedback_err = '';
				var api = res.data;

				if (res.status === 500 && api.err && api.err.name)
					return $scope.feedback_name = api.err.name.message;

				if (res.status === 500 && api.err && api.err.email)
					return $scope.feedback_email = api.err.email.message;

				if (res.status === 500 && api.err && api.err.password)
					return $scope.feedback_password = api.err.password.message;				

				$scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema.";
			});
		};

	}]);

});