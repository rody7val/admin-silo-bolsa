App.factory('Socket', function ($http, $location, socketFactory){

	var ErrService = { err: 'Error de servicio! Contácte al administrdor del sistema.' };
	var ErrDefault = { err: 'Ups! Algo salio mal.'};

	var Socket = socketFactory({
		ioSocket: io.connect('http://localhost:3000', { 'forceNew': true })
	});

	return Socket;
});
