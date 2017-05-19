App.factory('Socket', function ($http, $location, $auth, socketFactory) {

	var Socket =  socketFactory({
		ioSocket: io.connect('http://localhost:8000')
	});

	return Socket;

});
