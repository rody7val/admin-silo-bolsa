define(['./module'], function (controllers) {

	'use strict';
	
	controllers.controller('Login', ['$scope', '$auth', '$location', function ($scope, $auth, $location) {

		if ($auth.isAuthenticated())
			return $location.path("/");

		var vm = this;
		$scope.loading = false;
		$scope.feedback_email = '';
		$scope.feedback_password = '';
		$scope.feedback_err = '';

		if ($location.search().err)
			$scope.feedback_err = $location.search().err;

		this.login = function(){
			$scope.loading = true;

			$auth.login({
				email: vm.email,
				password: vm.password
			})
			.then(function(res){
				var api = res.data;

				if (res.status === 200) {
					$scope.loading = false;
					localStorage.setItem('user', JSON.stringify(api.user))
					return $location.path("/");
				}
			})
			.catch(function(res){
				$scope.loading = false;
				$scope.feedback_email = '';
				$scope.feedback_password = '';
				$scope.feedback_err = '';
				var api = res.data;

				if (res.status === 401 && api.err === "Email incorrecto") {
					return $scope.feedback_email = api.err;
				}
				else if (res.status === 401 && api.err === "Contraseña incorrecta") {
					return $scope.feedback_password = api.err;
				}
				else if (res.status === 406) {
					return $scope.feedback_err = api.err;
				}
				
				$scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema.";
			});
		};

	}]);

});