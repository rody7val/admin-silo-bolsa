App.factory('Excel', function ($http, $location) {

	var ErrService = { err: 'Error de servicio! Contácte al administrdor del sistema.' };
	var ErrDefault = { err: 'Ups! Algo salio mal.'};

	var Excel = {

		export: function (date) {
			var api = $http.get(API_HOST + '/excel/check/' + date)
			.then(function (res) {
				return res.data;
			})
			.catch(function(res){
				if (res.status == 500 && res.data.err) {
					return { err: res.data.err, "500": true };
				}
				if (res.status == 500 && res.data.message) {
					return { err: res.data.message, "500": true };
				}
				return ErrDefault;
			});

			return api;
		}

	};

	return Excel;

});

