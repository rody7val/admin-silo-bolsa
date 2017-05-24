App
	.controller('Excel', function ($scope, $auth, $location, $http) {

		if (!$auth.isAuthenticated()) {
			return $location.path('/login');
		}

		function feedback_reset() {
			$scope.loading = false;
			$scope.feedback_err = '';
		}

		$scope.$parent.parent.setTitle("Exportar a Excel");
		$scope.$parent.parent.setPage(4);
		feedback_reset();

		$scope.setDate = function(date) {
			return moment(date).locale('es').calendar();
		};

	});
