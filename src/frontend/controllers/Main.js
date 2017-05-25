App
	.controller('Main', function ($auth, $scope, $http, $rootScope, $urlRouter, $location, $window, User, Sector, Board, Socket) {
		
		var _self = this;
		function feedback_reset() {
			_self.auth = $auth.isAuthenticated();
			$scope.loading = false;
			_self.errConect = false;
			_self.usersCount = 0;
			_self.sectorCount = 0;
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

		this.getSectorCount = function () {
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

		this.getSectors = function () {
			Socket.on('sectors', function (data) {
				// por cada sector traido del server
				var sectors = data.map(function (sector, index) {
					// inicializo variables
					sector.done = false;
					sector.init = 1;
					// y datos importantes de graficos
					sector.chart = sector.devices.map(function (device, index) {
						return {
							key: device.prefix,
							values: []
						}
					});

					return sector;
				});
				_self.sectors = sectors;
			});
		}

		$scope.newChart = function (sector) {
			sector.done = !sector.done;
			if (sector.init == 1) {
				sector.init--
				Socket.emit('new-chart', sector);
			}
		}

		this.getSensors = function () {
			// por cada sensor traido del server
			Socket.on('sensors', function (data) {
				// recorro los sectores en el lado cliente
				Object.keys(_self.sectors).forEach(function (key) {
					// comparo id's
					if (_self.sectors[key]._id === data.sector) {
						// y recorro cada objeto de presentacion para el grafico de los dispositivos del sector
						angular.forEach(_self.sectors[key].chart, function (value, index) {
							// y si el prefijo traido del server es igual al prefijo de presentacion 
							if (data.prefix === value.key) {
								// lo guardo
								console.log(data.values)
								_self.sectors[key].chart[index].values.push(data.values);	
							};
						});
					}
				});
			});
		}

		// Grafics
		this.getSectors();
		this.getSensors();
		// Counts
		this.getUserCount();
		this.getSectorCount();
		this.getBoardCount();
		this.setName();

	});