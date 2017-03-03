define(['./module'], function (controllers) {

	'use strict';

	controllers.controller('Main', ['$scope', '$http', function ($scope, $http) {

		
		$scope.errConect = false;
		$scope.usersCount = 0;

		this.getUserCount = function() {
			// Url API User.count()
			$http.get('http://localhost:3000/users/count')
			.then(function(res){
				var api = res.data;
				return $scope.usersCount = api.count;
			})
			.catch(function(res){
				if (!res.data){
					return $scope.errConect = true;
				}

				var api = res.data;
				return $scope.usersCount = api.count;
			});
		};

		this.getUserCount();

	}]);

});
