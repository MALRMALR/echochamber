$(document).ready(function(){
	generateVideoContainers();
	var echoNestJson = 'http://developer.echonest.com/api/v4/genre/artists?api_key=5QG70O4GQ9F8TA30Q&format=json&results=15&bucket=video&name=jazz'
	$.ajax({
		type: 'GET',
		url: echoNestJson,
		error: function() {
			$('#container').html('<p>An Error Has Occurred</p>');
		},
		dataType: 'json',
		success: function(data){
			callEchoNest(data);
		}
	})
});

function generateVideoContainers(){
	var container = $('#container');
	for (var i = 0; i < 150; i++){
		var videoDiv = '<div class ="video_container" id="video_'+i+'"></div>';
		container.append($(videoDiv));
	}
}

function callEchoNest(data){
	var artists = data.response.artists;
	console.log(artists);
	for (var i = 0, j = 0, k = 0; i < 15, j < 15, k < 150; i++, j += 1, k++){
		var url = data.response.artists[i].video[j].image_url;
		var videoUrl = data.response.artists[i].video[j].url;
		if (url !== null){
			$("#video_"+k).append('<a href="'+videoUrl+'" target="_blank"><img src="'+url+'" /></a>')
		} else {
			console.log("sorry");
		}
	}
}