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
		
		$scope.$parent.parent.setTitle("Dasboard");	//title
		$scope.$parent.parent.setPage(1);	//menu

		var vm = this;
		vm.message = { 
			author: $scope.$parent.parent.userLoged.name,
			text: '',
			admin: $scope.$parent.parent.userLoged.admin
		};

		this.addMessage = function () {
			$scope.$parent.parent.addMessage(vm.message);
			vm.message.text = '';
		}

		this.reload = function () {
			return $window.location.reload();
		}
	});