App.factory('Socket', function ($http, $location, $auth, socketFactory) {

	var Socket =  socketFactory({
		ioSocket: io.connect(API_HOST)
	});

	return Socket;

});