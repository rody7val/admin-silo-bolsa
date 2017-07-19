App
	.controller('Sensor', function ($scope, $auth, $location) {

		if (!$auth.isAuthenticated()) {
			$scope.$parent.parent.stopDht22();
			return $location.path('/login');
		}

		$scope.sensors = [];

		function feedback_reset() {
			$scope.loading = false;
			$scope.feedback_name = '';
			$scope.feedback_device = '';
			$scope.feedback_err = '';
		}

		$scope.$parent.parent.setTitle("Sensores");
		$scope.$parent.parent.setPage(2);
		feedback_reset();

		this.getAllSectors = function () {
			$scope.loading = true;	//load

			Sector
			.getAll()
			.then(function (api) {
				feedback_reset();	//reset load
				if (api[500] || api.err) {
					return $scope.feedback_err = api.err;
				}
				$scope.sectors = api.sectors; 
			});
		};

		$scope.setDate = function(date) {
			return moment(date).locale('es').calendar();
		};

		$scope.addDevice = function(){
			$scope.data.model.prefix = $scope.data.model.placa + '_' + $scope.data.model.pin;
			$scope.sector.devices.push($scope.data.model);
			$scope.data.newDevice = false;
			$scope.selected = { placa: null, pin: null };
			$scope.data.model = { placa: null, pin: null, prefix: '', done: false };
		}

		$scope.setPlaca = function (placaID) {
			if (!placaID) $scope.data.model.placa = null;
			Object.keys($scope.data.boards).forEach(function (value, key) {
				$scope.selected.placa = null;
				if ($scope.data.boards[key]._id === placaID) {
					$scope.selected.placa = $scope.data.boards[key];
				};
			});
		}

		$scope.deleteDevice = function () {
			function selected (item) { return item.done == false };
			$scope.sector.devices = $scope.sector.devices.filter(selected);
		}

		$scope.setPin = function(pin) {
			if (!pin) $scope.data.model.pin = null;
			$scope.selected.pin = JSON.parse(pin || "null");
		}

		$scope.create = function () {
			feedback_reset();
			var valueArr = $scope.sector.devices.map(function(device){ return device.prefix });
			var isDuplicate = valueArr.some(function(item, idx){ 
			    return valueArr.indexOf(item) != idx 
			});
			
			if ($scope.sector.name == '') {
				$scope.feedback_name = 'Debes ingresar un Nombre de sector';
			} else if ($scope.sector.devices.length == 0) {
				$scope.feedback_device = 'Debes ingresar al menos un dispositivo';
			} else if (isDuplicate) {
				$scope.feedback_device = 'No puede haber dispositivos duplicados en un sector';
			} else {
				Sector
				.create($scope.sector)
				.then(function (api) {
					if (api.err) {
						return $scope.feedback_err = api.err;
					}
					$scope.sectors = api.sectors;
				});

				// reset forms
				$scope.data.newDevice = false;
				$scope.selected = { placa: null, pin: null };
				$scope.data.model = { placa: null, pin: null, prefix: '', done: false };
				$scope.sector = { name: '', devices: [] };
			}
		}

		this.getAllSectors();
		this.getAllBoards();

	});