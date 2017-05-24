App.factory('Sector', function ($http, $location){

	var ErrService = { err: 'Error de servicio! Contácte al administrdor del sistema.' };
	var ErrDefault = { err: 'Ups! Algo salio mal.'};

	var Sector = {

		count: function () {
			var api = $http.get('http://localhost:3000/sectors/count')
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
			var api = $http.get('http://localhost:3000/sectors').then(function (res) {
				return res.data;
			}).catch(function (res) {
				if (!res.data) {
					return ErrService;
				}
				if (res.status === 500 && res.data.err) {
					return { err: res.data.err, "500": true };
				}
				return ErrDefault;
			});

			return api;
		},

		create: function(sector) {
			var api = $http.post('http://localhost:3000/sectors', {sector: sector})
			.then(function (res) {
				return res.data;
			})
			.catch(function(res) {
				if (!res.data) {
					return ErrService;
				}
				if (res.status === 500 && res.data.err) {
					return { err: res.data.err, "500": true };
				}
				return ErrDefault;				
			});

			return api;
		}

	};

	return Sector;
});
