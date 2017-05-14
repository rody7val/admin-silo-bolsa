App
	.controller('Forgot', function ($scope, $auth, $location, $http, Session) {

		if ($auth.isAuthenticated()) { return $location.path("/") };

		if ($location.search().err) { $scope.feedback_err = $location.search().err };

		function feedback_reset() {
			$scope.loading = false;
			$scope.feedback_email = '';
			$scope.feedback_err = '';
			$scope.feedback_success = '';
		}

		var vm = this;
		feedback_reset();

		this.forgot = function () {
			$scope.loading = true;	//load
			
			Session
			.forgot(vm.email)
			.then(function (api){
				feedback_reset();	//reset load
				if (api.email) {
					return $scope.feedback_email = api.err;
				} else if (api[403] || api[500] || api.err) {
					return  $scope.feedback_err = api.err;
				}
				return $scope.feedback_success = api.message;
			});
		};

	});