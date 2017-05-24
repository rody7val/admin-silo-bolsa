App
	.controller('Reset', function ($scope, $auth, $location, $http, Session) {

		if ($auth.isAuthenticated()) { return $location.path("/") };

		function feedback_reset() {
			$scope.loading = false;
			$scope.feedback_password = '';
			$scope.feedback_password_bis = '';
			$scope.feedback_err = '';
			$scope.feedback_success = '';
		}

		var vm = this;
		$scope.user_reset = {};
		feedback_reset();

		this.confirmToken = function(){
			$scope.loading = true;	//load

			Session
			.confirmToken()
			.then(function (api) {
				$scope.loading = false;
				if (api[401] && api.err) {
					return $location.path('/forgot').search({err: api.err});
				}
				else if (api[500] || api.err) {
					return $scope.feedback_err = api.err;
				};
				$scope.user_reset = api.user;
			});

		}

		this.confirmToken();

		this.reset = function(){
			$scope.loading = true; //load

			if (vm.password == vm.password_bis) {
				Session
				.reset(vm.password)
				.then(function (api) {
					feedback_reset();	//load reset
					if (api == null) {
						return $location.path('/forgot').search({err: api.err});
					}
					else if (api[500] || api.err) {
						$scope.feedback_err = api.err;
					}

					$auth 	//login
					.login({ email: api.user.email, password: vm.password })
					.then(function (res) {
						localStorage.setItem('user', JSON.stringify(api.user));
						return $location.path("/").search({message: api.message});
					})
					.catch(function (res) {
						console.log(res);
						$scope.feedback_err = "Error de servicio! Contácte al administrdor del sistema.";
					});
				});
			}
			else {
				feedback_reset();
				$scope.feedback_err = 'Las contraseñas no coinciden';
				$scope.feedback_password = ' ';
				$scope.feedback_password_bis = ' ';
			}
		};

	});