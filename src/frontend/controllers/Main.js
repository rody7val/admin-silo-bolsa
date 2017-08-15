App
	.controller('Main', function ($auth, $scope, $http, $rootScope, $urlRouter, $location, $window, User, Socket) {
		
		var _self = this;
		function feedback_reset() {
			_self.auth = false;
			$scope.loading = false;
			_self.errConect = false;
			_self.dht22 = {
				temp: 0,
				hr: 0
			};
			_self.usersCount = 0;
			_self.sensorCount = 0;
			_self.sectors = [];
		}

		feedback_reset();

		$scope.reload = function () {
			return $window.location.reload();
		}

		// $scope.xmaxvalue = moment().unix();
		// $scope.xminvalue = moment().subtract(1, "minutes").unix($scope.xmaxvalue);
		$scope.yminvalue = 0;
		$scope.ymaxvalue = 70;

		$scope.options = {
			chart: {
				type: 'lineChart',
				height: 300,
				x: function(d){ return d.x; },
				y: function(d){ return d.y; },
				useInteractiveGuideline: true,
				xAxis: {
					tickFormat: function(d) { 
						return moment.unix(d).format('h:mm:ss');
					},
					rotateLabels: -30,
				},
				yAxis: {
					tickFormat: function(d) { 
						return d
					}
				},
				yDomain: [$scope.yminvalue, $scope.ymaxvalue],
				// xDomain: [moment().unix(), moment().add(1, "minutes").unix()]
				duration: 300
			}
		};

		$scope.data = [{
			values: [],
			key: 'Temp °C',
			color: '#ff7f0e'
		}, {
			values: [],
			key: 'Humedad',
			color: '#2ca02c'
		}];

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

		this.setDht22 = function () {
			Socket.on('dht22', function (sensor) {
				var temp = Math.round( sensor.data.temperature * 1e1 ) / 1e1; 
				var hr = Math.round( sensor.data.humidity * 1e1 ) / 1e1;

				$scope.data[0].values = $scope.data[0].values.concat({x: sensor.time, y: temp});
				$scope.data[1].values = $scope.data[1].values.concat({x: sensor.time, y: hr});
				_self.dht22.temp = temp;
				_self.dht22.hr = hr;


				// $scope.xmaxvalue = sensor.time;
				// $scope.xminvalue = moment().subtract(1, "minutes").unix($scope.xmaxvalue);
			});
		}

		this.startDht22 = function () {
			Socket.emit('start-dht22');
		}

		this.stopDht22 = function () {
			Socket.emit('stop-dht22');
		}

		// Counts
		this.getUserCount();
		this.setName();
		// this.setDht22();
		this.startDht22();

	});