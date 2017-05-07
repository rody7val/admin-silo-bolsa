define(['./module'], function (controllers) {

	'use strict';

	controllers.controller('PhotoList', ['$scope', '$auth', '$location', '$http', function ($scope, $auth, $location, $http) {

		if (!$auth.isAuthenticated())
			return $location.path('/login');

		$scope.loading = false;
		$scope.photos = [];
		$scope.userLoged = JSON.parse(localStorage.getItem('user'));

		this.getAll = function() {
			$scope.loading = true;

			// Url API Photo.getAll()
			$http.get('http://localhost:3000/photos')
			.then(function(res){
				$scope.loading = false;
				$scope.feedback_err = '';
				var api = res.data;

				if (res.status === 200)
					$scope.photos = api.photos;
			})
			.catch(function(res){
				if (!res.data)
					$scope.feedback_err = 'Error de servicio! Contácte al administrdor del sistema.';

				var api = res.data;
				if (res.status === 403 && api.err)
					$location.path('/login').search({err: api.err});
				$scope.loading = false;
			});
		};

		this.getAll();

		$scope.setDate = function(date) {
			return moment(date).locale('es').calendar();
		};

	}]);

});
