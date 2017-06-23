App.factory('Sensor', function ($http, $location) {

	var ErrService = { err: 'Error de servicio! Contácte al administrdor del sistema.' };
	var ErrDefault = { err: 'Ups! Algo salio mal.'};

	var Sensor = {

		count: function () {
			var api = $http.get('http://localhost:3000/sensors/count')
			.then(function (res) {
				return res.data;
			})
			.catch(function(res){
				if (!res.data) {
					return null;
				}
			});

			return api;
		},

		getAll: function () {
			var api = $http.get('http://localhost:3000/sensors').then(function (res) {
				return res.data;
			}).catch(function (res) {
				if (!res.data) {
					return ErrService;
				}
				if (res.status === 403 && res.data.err) {
					return $location.path('/login').search({ err: res.data.err });
				}
				return ErrDefault;
			});

			return api;
		}

	};

	return Sensor;

});

