App
	.controller('Login', function ($scope, $auth, $location, Session) {

		if ($auth.isAuthenticated()) { return $location.path("/") };

		if ($location.search().err) { $scope.feedback_err = $location.search().err };

		function feedback_reset () {
			$scope.loading = false;
			$scope.feedback_email = '';
			$scope.feedback_password = '';
			$scope.feedback_err = '';
		};
		
		var vm = this;
		feedback_reset();

		this.login = function () {
			$scope.loading = true;	//load

			Session
			.login(vm.email, vm.password)
			.then(function (api) {
				feedback_reset();	//reset load
				if (api.email) {
					return $scope.feedback_email = api.err;
				}
				else if (api.pass) {
					return $scope.feedback_password = api.err;
				}
				else if (api[406] || api[500] || api.err) {
					return $scope.feedback_err = api.err;
				}
				localStorage.setItem('user', JSON.stringify(api.user));
				return $location.path("/");
			});
		};

	});