$(document).ready(function(){
	generateImageContainers();
	// search function
	$("#search_button").on("click", function(){
		var searchTerm = $("#search_term").val();
		if ($('#artist_button').is(":checked")){
			var json = 'http://developer.echonest.com/api/v4/artist/search?api_key=5QG70O4GQ9F8TA30Q&format=json&results=15&bucket=video&name='+searchTerm;
		} else {
			var json = 'http://developer.echonest.com/api/v4/genre/artists?api_key=5QG70O4GQ9F8TA30Q&format=json&results=15&bucket=video&name='+searchTerm;
		}
			$.ajax({
				type: 'GET',
				url: json,
				error: function() {
					$('#container').append('<p id="error_message">That is not available</p>');
				},
				dataType: 'json',
				success: function(data){
					if ($('#error_message')){
						$('#error_message').empty();
					}
					for (var i = 0; i < 15; i++){
						$('#video_'+i).each(function(){
							$(this).empty();
						})
					}
					callEchoNest(data);
				}
			}) // end api call
	}) // end search button on click event fxn
});

function generateImageContainers(){
	var container = $('#container');
	for (var i = 0; i < 15; i++){
		var videoDiv = '<div class="video_container Collage" id="video_'+i+'"></div>';
		container.append($(videoDiv));
	}
}

function callEchoNest(data){
	var artists = data.response.artists;
	for (var i = 0; i < 15; i++){
		var artistCluster = data.response.artists[i];
		for (j = 0; j < 15; j++){
			var artistImages = artistCluster.video[j].image_url;
			var videoUrl = artistCluster.video[j].url;
			$("#video_"+i).each(function(){
				$(this).append('<a class="echo_images" href="'+videoUrl+'" target="_blank"><img src="'+artistImages+'" /></a>')
			}); // end each loop
		} // end for j
	} // end for i
}

$(window).load(function() {
	$('.Collage').removeWhitespace().collagePlus({
		'targetHeight': 10,
		'effect': "effect-1"
		});
})