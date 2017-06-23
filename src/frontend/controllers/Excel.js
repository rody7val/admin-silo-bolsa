App
	.controller('Excel', function ($scope, $auth, $location, $http, $window, Excel) {

		if (!$auth.isAuthenticated()) {
			return $location.path('/login');
		}

		function feedback_reset() {
			$scope.loading = false;
			$scope.feedback_err = '';
		}

		$scope.data = {
			date_false: '',
			date: ''
		};
		$scope.$parent.parent.setTitle("Exportar a Excel");
		$scope.$parent.parent.setPage(3);
		feedback_reset();

		$scope.formatDate = function () {
			$scope.data.date = moment($scope.data.date_false).format('YYYY-MM-DD') + 'T12:00:00-03:00';
			console.log(typeof $scope.data.date);
		}

		$scope.export = function () {
			$window.open(API_HOST + '/excel/' + $scope.data.date)
		}

		$scope.setDate = function(date) {
			return moment(date).locale('es').calendar();
		};

	});
