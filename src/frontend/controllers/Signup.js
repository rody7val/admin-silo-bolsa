App
	.controller('Signup', function ($scope, $auth, $location, $window, Session) {

		if ($auth.isAuthenticated()) { return $location.path("/") };

		function feedback_reset() {
			$scope.loading = false;
			$scope.feedback_name = '';
			$scope.feedback_email = '';
			$scope.feedback_password = '';
			$scope.feedback_err = '';
		}

		var vm = this;
		$scope.$parent.parent.setTitle("Nuevo administrador");
		feedback_reset();

		this.signup = function() {
			$scope.loading = true;	//load
			Session.signUp({
				name: vm.name,
				email: vm.email,
				password: vm.password,
				superAdmin: $scope.$parent.parent.usersCount == 0 ? true : false,
				admin: $scope.$parent.parent.usersCount == 0 ? true : false,
				active: $scope.$parent.parent.usersCount == 0 ? true : false
			})
			.then(function (api) {
				feedback_reset();	//load reset
				if (api.name) {
					return $scope.feedback_name = api.err;
				}
				else if (api.email) {
					return $scope.feedback_email = api.err;
				}
				else if (api.pass) {
					return $scope.feedback_password = api.err;
				}
				else if (api[406] || api[500] || api.err) {
					return $scope.feedback_err = api.err;
				}
				$auth.login({email: vm.email, password: vm.password}).then(function(){
					localStorage.setItem('user', JSON.stringify(api.user));
					// Recargar el sitio para que no pueda ser duplicado el registro de super-administrador
					$window.location.reload();
					$location.path("/").search({message: "Registro completado! "});
				});
			});

		};

	});