App.factory('Excel', function ($http, $location) {

	var ErrService = { err: 'Error de servicio! Contácte al administrdor del sistema.' };
	var ErrDefault = { err: 'Ups! Algo salio mal.'};

	var Excel = {

		export: function (date) {
			var api = $http.post('http://localhost:3000/excel')
			.then(function (res) {
				return res.data;
			})
			.catch(function(res){
				if (!res.data) {
					return null;
				}
			});

			return api;
		}

	};

	return Excel;

});

