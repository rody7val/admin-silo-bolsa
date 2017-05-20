function crearArray (length){
	var arr = new Array(length);
	for (var i=0; i<arr.length; i++) {
		arr[i] = i;
	};
	return arr;
}

function filtrar (arrOfObj){
	var luz = [];
	for (var i=0; i<arrOfObj.length; i++){
		luz.push({
			x: i,
			y: arrOfObj[i].luz
		});
	}
	return [
		{
			values: luz,
			key: 'Fotorecistencias',
			color: '#ff7f0e'
		}
	]
}
