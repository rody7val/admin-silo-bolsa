App
	.controller('Logout', function ($scope, $auth, $location) {

		if (!$auth.isAuthenticated())
			return $location.path('/login');
	
		$auth
		.logout()
		.then(function() {
			localStorage.removeItem('user');
			$location.path('/login');
		});

	});