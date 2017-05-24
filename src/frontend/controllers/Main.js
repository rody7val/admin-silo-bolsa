App
	.controller('Main', function ($auth, $scope, $http, $rootScope, $urlRouter, $location, User, Sector, Board) {
		
		var _self = this;
		function feedback_reset() {
			_self.auth = $auth.isAuthenticated();
			$scope.loading = false;
			_self.errConect = false;
			_self.usersCount = 0;
			_self.sectorCount = 0;
			_self.messages = [];
		}

		feedback_reset();

		this.getUserCount = function () {
			User
			.count()
			.then(function (api) {
				if (api == null){
					return _self.errConect = true;
				}
				_self.usersCount = api.count;
			});
		}

		this.getSectionCount = function () {
			Sector
			.count()
			.then(function (api) {
				if (api == null){
					return _self.errConect = true;
				}
				_self.sectorCount = api.count;
			});
		}

		this.getBoardCount = function () {
			Board
			.count()
			.then(function (api) {
				if (api == null){
					return _self.errConect = true;
				}
				_self.boardCount = api.count;
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

		this.getUserCount();
		this.getSectionCount();
		this.getBoardCount();
		this.setName();

	});