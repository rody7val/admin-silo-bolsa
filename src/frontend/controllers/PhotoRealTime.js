App
	.controller('PhotoRealTime', function ($scope, $auth, $location, $http, Photo) {

		if (!$auth.isAuthenticated()) {
			return $location.path('/login');
		}

		$scope.userLoged = JSON.parse(localStorage.getItem('user'));
		$scope.loading = false;
		$scope.photos = [];

		Photo.getAll().then(function (api) {
			$scope.photos = api.photos;
		});

		// Graph
		$scope.options = {
		    chart: {
		        type: 'lineChart',
		        height: 450,
		        margin : {
		            top: 20,
		            right: 20,
		            bottom: 60,
		            left: 55
		        },
		        x: function(d){ return d.x; },
				y: function(d){ return d.y; },
		        useInteractiveGuideline: true,
		        duration: 500,
		        xAxis: {
		            axisLabel: 'Tiempo (hh:mm:ss)',
		            tickValues: crearArray(50),
		            tickFormat: function(v, i){
		            	return moment($scope.photos[v].created).format('LTS');
		            },
		            rotateLabels: -45,
		        },
		        yAxis: {
		            axisLabel: 'Luz',
		            axisLabelDistance: -10
		        }
		    }
		};
		$scope.data = [{ values: [], key: 'Fotoresistores', color: '#ff7f0e' }];

		var x = 0;
		setInterval(function () {
			Photo.getLast().then(function (api) {
				console.log($scope.data[0].values[0])
				if (api.err) return;
				// if ( (api.photo.created == $scope.data[0].values[x].created) && (api.photo.luz == $scope.data[0].values[x].luz) && (api.photo.pin == $scope.data[0].values[x].pin) && x!=0) return;
				$scope.data[0].values.push({
					x: x,
					y: api.photo.luz,
					pin: api.photo.pin,
					created: api.photo.created
				});
				if ($scope.data[0].values.length > 50) {
					$scope.data[0].values.shift();
				}
				x++;
			});
		}, 5000);

		$scope.setDate = function(date) {
			return moment(date).locale('es').calendar();
		};

	});