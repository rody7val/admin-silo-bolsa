App.factory('User', function ($http, $location) {

	var ErrService = { err: 'Error de servicio! Contácte al administrdor del sistema.' };
	var ErrDefault = { err: 'Ups! Algo salio mal.'};

	var User = {

		getAll: function () {
			var api = $http.get('http://localhost:3000/users').then(function (res) {
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
		},

		block: function (id) {
			var api = $http.get('http://localhost:3000/users/'+id+'/block').then(function (res) {
				return res.data;
			}).catch(function (res) {
				if (!res.data) {
					return ErrService;
				}
				if (res.status === 500 && res.data.err) {
					return { err: res.data.err } || ErrDefault;
				}
				return ErrDefault;
			});

			return api;
		},

		delete: function (id) {
			var api = $http.get('http://localhost:3000/users/'+id+'/delete').then(function (res) {
				return res.data;
			}).catch(function (res) {
				if (!res.data) {
					return ErrService;
				}	
				if (res.status === 500 && res.data.err) {
					return { err: res.data.err } || ErrDefault;
				}
				return ErrDefault;
			});

			return api;
		},

		activate: function (id) {
			var api = $http.get('http://localhost:3000/users/'+id+'/active').then(function (res) {
				return res.data;
			}).catch(function (res) {
				if (!res.data){
					return ErrService;
				}
				if (res.status === 500 && res.data.err) {
					return { err: res.data.err } || ErrDefault;
				}
				return ErrDefault;
			});

			return api;
		}

	};

	return User;

});

