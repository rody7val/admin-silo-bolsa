App
	.controller('Excel', function ($scope, $auth, $location, $http, $window, Excel) {

		if (!$auth.isAuthenticated()) {
			$scope.$parent.parent.stopDht22();
			return $location.path('/login');
		}

		function feedback_reset() {
			$scope.loading = false;
			$scope.feedback_err = '';
			$scope.feedback_success = '';
		}

		$scope.data = {
			date_false: '',
			date: ''
		};
		$scope.$parent.parent.setTitle("Exportar a Excel");
		$scope.$parent.parent.setPage(3);
		feedback_reset();

		$scope.formatDate = function () {
			feedback_reset();
			$scope.data.date = moment($scope.data.date_false).unix();
		}

		$scope.quit = function () {
			feedback_reset();
		}

		$scope.export = function () {
			Excel
			.export($scope.data.date)
			.then(function (api) {
				feedback_reset();
				if (api[500]) {
					return $scope.feedback_err = api.err;
				}
				$scope.feedback_success = "Se exportaron " + api.sensors.length + " registros.";
				$window.open(API_HOST + '/excel/' + $scope.data.date)
			});
		}

		$scope.setDate = function(date) {
			return moment(date).locale('es').calendar();
		};

	});
