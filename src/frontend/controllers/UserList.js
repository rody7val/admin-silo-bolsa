App
	.controller('UserList', function ($scope, $auth, $location, $http, User) {

		if (!$auth.isAuthenticated()) {
			return $location.path('/login');
		}

		$scope.users = [];
		$scope.userLoged = JSON.parse(localStorage.getItem('user'));

		function feedback_reset() {
			$scope.loading = false;
			$scope.feedback_err = '';
		}

		$scope.$parent.parent.setTitle("Usuarios");
		$scope.$parent.parent.setPage(3);
		feedback_reset();

		// Evento obtener usuarios
		this.getAllUsers = function () {
			$scope.loading = true;	//load

			User
			.getAll()
			.then(function (api) {
				feedback_reset();	//reset load
				if (api.err) {
					return $scope.feedback_err = api.err;
				}
				$scope.users = api.users; 
			});
		};

		this.getAllUsers();

		// Evento bloquer usuario
		$scope.block = function(id){
			$scope.loading = true;	//load

			User
			.block(id)
			.then(function (api) {
				feedback_reset();	//reset load
				if (api.err) {
					return $scope.feedback_err = api.err;
				}
				$scope.users = api.users;
			});
		};

		// Evento eliminar usuario
		$scope.delete = function(id){
			$scope.loading = true;	//load

			User
			.delete(id)
			.then(function (api) {
				feedback_reset();	//reset load
				if (api.err) {
					return $scope.feedback_err = api.err;
				}
				$scope.users = api.users;
			});
		};

		// Evento activar usuario
		$scope.activate = function(id){
			$scope.loading = true;	//load

			User
			.activate(id)
			.then(function (api) {
				feedback_reset();	//reset load
				if (api.err) {
					return $scope.feedback_err = api.err;
				}
				$scope.users = api.users;
			});
		};

		$scope.setDate = function(date) {
			return moment(date).locale('es').calendar();
		};

	});
