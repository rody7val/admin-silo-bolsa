define(['./module'], function (controllers) {

	'use strict';

	controllers.controller('Reset', ['$scope', '$auth', '$location', '$http', function ($scope, $auth, $location, $http) {

		if ($auth.isAuthenticated())
			return $location.path("/");

		var vm = this;
		$scope.loading = true;
		$scope.feedback_password = '';
		$scope.feedback_password_bis = '';
		$scope.feedback_err = '';
		$scope.feedback_success = '';

		this.confirmToken = function(){
			// Url API Auth.reset(this.id)
			$http.get('http://localhost:3000/auth' + $location.path())
			.then(function(res){
				var api = res.data;
				if (res.status === 200 && api.success) {
					$scope.loading = false;
					$scope.feedback_password = '';
					$scope.feedback_password_bis = '';
					$scope.feedback_err = '';
					$scope.feedback_success = '';
					vm.password = '';
					vm.password_bis = '';
				}
			})
			.catch(function(res){
				var api = res.data;
				if (res.status === 401 && !api.success) {
					return $location.path('/forgot').search({err: api.err});
				}
				$scope.loading = false;
				$scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema.";
			});
		}

		this.confirmToken();

		this.reset = function(){
			$scope.loading = true;

			if (vm.password == vm.password_bis) {
				// Url API Auth.reset(this.id, this.new_password)
				$http.post('http://localhost:3000/auth' + $location.path(), {
					password: vm.password,
					host: $location.protocol() + '://' + $location.host(),
					// Nombre de tu compañía
					name: 'MySite',
					// Email from
					email_from: 'resetpassword@mysite.com'
				})
				.then(function(res){
					var api = res.data;
					if (res.status === 200) {
						console.log(api.info)
						$scope.feedback_password = '';
						$scope.feedback_password_bis = '';
						$scope.feedback_err = '';
						$scope.feedback_success = '';
						$auth.login({
							email: api.user.email,
							password: vm.password
						})
						.then(function(res){
							localStorage.setItem('user', JSON.stringify(api.user));
							return $location.path("/").search({message: api.message});
						}).catch(function(res){
							$scope.loading = true;
							console.log(res);
							$scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema.";
						});
					}
					else{
						return $location.path('/forgot').search({err: api.err});
					}
				})
				.catch(function(res){
					$scope.feedback_password = '';
					$scope.feedback_password_bis = '';
					$scope.feedback_err = '';
					$scope.feedback_success = '';
					vm.password = '';
					vm.password_bis = '';
					var api = res.data;
					if (api.err) return $location.path('/forgot').search({err: api.err});
					$scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema.";
				});
			} else {
				$scope.loading = false;
				$scope.feedback_err = 'Las contraseñas no coinciden';
				$scope.feedback_password = ' ';
				$scope.feedback_password_bis = ' ';
			}
		};

	}]);

});