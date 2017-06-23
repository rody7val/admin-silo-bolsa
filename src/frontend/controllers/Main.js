App
	.controller('Main', function ($auth, $scope, $http, $rootScope, $urlRouter, $location, $window, User) {
		
		var _self = this;
		function feedback_reset() {
			_self.auth = $auth.isAuthenticated();
			$scope.loading = false;
			_self.errConect = false;
			_self.usersCount = 0;
			_self.sensorCount = 0;
			_self.sectors = [];
		}
		$scope.reload = function () {
			return $window.location.reload();
		}
        $scope.options = {
            chart: {
                type: 'lineChart',
                height: 450,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 60,
                    left: 65
                },
                x: function(d){ return d[0]; },
                y: function(d){ return d[1]; },
                useInteractiveGuideline: true,
                color: d3.scale.category10().range(),
                xAxis: {
                    axisLabel: 'Hora',
                    tickFormat: function(d) {
                    	return moment(d).format('LTS')
                    },
                    rotateLabels: -45,
                },
                yAxis: {
                    axisLabel: 'Luz',
                    tickFormat: function(d) { 
                    	return d
                    },
                },
                duration: 300
            }
        };

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

		$scope.newChart = function (sector) {
			sector.done = !sector.done;
			if (sector.init == 1) {
				sector.init--
				Socket.emit('new-chart', sector);
			}
		}

		// Counts
		this.getUserCount();
		this.setName();

	});