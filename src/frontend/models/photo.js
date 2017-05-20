App.factory('Photo', function ($http, $location){

	var ErrService = { err: 'Error de servicio! Contácte al administrdor del sistema.' };
	var ErrDefault = { err: 'Ups! Algo salio mal.'};

	var Photo = {

		getAll: function () {
			var api = $http.get('http://localhost:3000/photos').then(function (res) {
				return res.data;
			}).catch(function (res) {
				if (!res.data) {
					return ErrService;
				}
				if (res.status === 403 && res.data.err) {
					return $location.path('/login').search({ err: res.data.errs });
				}
				return ErrDefault;
			});

			return api;
		},

		getLast: function () {
			var api = $http.get('http://localhost:3000/photos/last').then(function (res) {
				return res.data;
			}).catch(function (res){
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

	return Photo;
});
