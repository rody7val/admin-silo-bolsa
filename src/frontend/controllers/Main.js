App
	.controller('Main', function ($scope, $http, User) {

		function feedback_reset() {
			$scope.loading = false;
			$scope.errConect = false;
			$scope.usersCount = 0;
		}

		feedback_reset();

		this.getUserCount = function () {
			$scope.loading = true;	//load

			User
			.count()
			.then(function (api) {
				feedback_reset();	//reset loads
				if (api == null) {
					$scope.errConect = true;
				}
				return $scope.usersCount = api.count;
			});
		}

		this.getUserCount();
	});