App
	.controller('Main', function ($auth, $scope, $http, $rootScope, $urlRouter, $location, User, Socket) {
		
		var _self = this;
		function feedback_reset() {
			_self.auth = $auth.isAuthenticated();
			$scope.loading = false;
			_self.errConect = false;
			_self.messages = [];
			$scope.usersCount = 0;
		}

		feedback_reset();

		this.getUserCount = function () {
			$scope.loading = true;	//load

			User
			.count()
			.then(function (api) {
				feedback_reset();	//reset loads
				if (api == null || !api.count) {
					return _self.errConect = true;
				}
				return $scope.usersCount = api.count;
			});
		}

		this.getbodyMargin = function () {
			_self.auth = $auth.isAuthenticated();
			return _self.auth;
		}

		this.setTitle = function (title) {
			_self.title = title;
			return _self.title;
		}

		this.getTitle = function () {
			return _self.title;
		}

		this.setPage = function (currentPage) {
			_self.currentPage = currentPage;
			return _self.currentPage;
		}

		this.setMessages = function () {
			Socket.on('messages', function (data) {
				_self.messages = data;
			});
		}

		this.addMessage = function (msj) {
			Socket.emit('new-message', msj);
		}

		this.isAuthenticated = function(){
			return $auth.isAuthenticated();
		};

		this.setName = function(){
			_self.userLoged = JSON.parse(localStorage.getItem('user'));
		}

		this.getName = function(){
			if (_self.userLoged) {
				return _self.userLoged.name.split(' ')[0];
			}
			return 'undefined';
		}

		// this.listenRoute = function () {
		// 	$rootScope.$on("$locationChangeStart" , function (evt) {
		// 		if (!$auth.isAuthenticated()) {
		// 			console.log('no')
		// 			return $location.path("/login");
		// 		}
		// 		console.log('yea')
		// 		$urlRouter.sync();
		// 	});
		// }

		this.getUserCount();
		this.setName();
		this.setMessages();
		// this.listenRoute();

	});