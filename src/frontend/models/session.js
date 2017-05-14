App.factory('Session', function ($http, $location, $auth) {

	var ErrService = { err: 'Error de servicio! Contácte al administrdor del sistema.' };
	var ErrDefault = { err: 'Ups! Algo salio mal.'};

	var Session = {

		forgot: function (email) {
			var api = $http.post('http://localhost:3000/auth/forgot', {
				host: $location.protocol() + '://' + $location.host(),
				email: email,
				// Nombre de la compañía
				name: 'MySite',
				// Email from
				email_from: 'resetpassword@mysite.com'
			})
			.then(function (res) {
				return res.data;
			})
			.catch(function (res) {
				if (!res.data) {
					return ErrService;
				}

				if (res.status == 401 && res.data.err) {
					return { err: res.data.err, email: true };
				}
				else if (res.status === 403 && res.data.err) {
					return { err: res.data.err, "403": true };
				}
				else if (res.status == 500 && res.data.err) {
					return { err: res.data.err, "500": true };
				}
				return ErrDefault;
			});

			return api;
		},

		login: function (email, pass) {
			var api = $auth.login({
				email: email,
				password: pass
			})
			.then(function (res) {
				return res.data;
			})
			.catch(function (res) {
				if (!res.data) {
					return ErrService;
				}

				if (res.status === 401 && res.data.err === "Email incorrecto") {
					return { err: res.data.err, email: true };
				}
				else if (res.status === 401 && res.data.err === "Contraseña incorrecta") {
					return { err: res.data.err, pass: true };
				}
				else if (res.status === 406) {
					return { err: res.data.err, "406": true };
				}
				else if (res.status == 500 && res.data.err) {
					return { err: res.data.err, "500": true };
				}
				return ErrDefault;
			});

			return api;
		},

		reset: function (pass) {
			var api = $http.post('http://localhost:3000/auth' + $location.path(), {
				password: pass,
				host: $location.protocol() + '://' + $location.host(),
				name: 'MySite',
				email_from: 'resetpassword@mysite.com'
			})
			.then(function (res) {
				return res.data;
			})
			.catch(function (res) {
				if (!res.data) {
					return ErrService;
				}

				if (res.status == 500 && res.data.err) {
					return { err: res.data.err, "500": true };
				}
				return { err: res.data.err } ;
			})

			return api;
		},

		confirmToken: function () {
			var api = $http.get('http://localhost:3000/auth' + $location.path())
			.then(function (res) {
				return res.data;
			})
			.catch(function (res) {
				if (!res.data) {
					return ErrService;
				}

				if (res.status === 401 && !res.data.success) {
					return { err: res.data.err, '401': true }
				}
				else if (res.status == 500 && res.data.err) {
					return { err: res.data.err, "500": true };
				}
				return ErrDefault;
			});

			return api;
		},

		signUp: function(user) {
			var api = $auth.signup(user)
			.then(function (res) {
				return res.data;
			})
			.catch(function(res) {
				if (!res.data) {
					return ErrService;
				}
				if (res.status === 500 && res.data.err && res.data.err.name){
					return { err: res.data.err.name.message, name: true};
				}
				else if (res.data.err.email){
					return { err: res.data.err.email.message, email: true};
				}
				else if (res.data.err.password){
					return { err: res.data.err.password.message, pass: true};
				}
				return ErrDefault;				
			});

			return api;
		}
	};

	return Session;

});
