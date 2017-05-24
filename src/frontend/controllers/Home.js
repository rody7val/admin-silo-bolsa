App
	.controller('Home', function ($scope, $auth, $location, $window) {
		// Filtro
		if (!$auth.isAuthenticated()){
			return $location.path("/login");
		}

		// Mensajes Log
		if ($location.search().err){
			$scope.feedback_err = $location.search().err;
		}
		if ($location.search().message){
			$scope.feedback_success = $location.search().message;
		}
		
		$scope.$parent.parent.setTitle("Tiempo real");	//title
		$scope.$parent.parent.setPage(1);	//menu

		var vm = this;

		this.reload = function () {
			return $window.location.reload();
		}
	});