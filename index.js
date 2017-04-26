var YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback) {
  var params = {
    part: 'snippet',
    key: 'AIzaSyCRV1w85H3FmZ_s75POsWlUheFgPLxzg0M',
    q: searchTerm
  }

  $.ajax ({
	   url: YOUTUBE_API_URL,
	   data: params
	})
	.done(function( data ) {
		callback( data );
  })
	.fail(function(err) {
		console.log(err)
	})
}

function displaySearchData(data) {
  var resultElement = '';
  if (data.items) {
    data.items.forEach(function(item) {
     resultElement += `<a href='https://www.youtube.com/watch?v=${item.id.videoId}'><img src= '${item.snippet.thumbnails.medium.url}' /></a>`;
     // console.log(item.id.videoId)
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  $('.search-results').html(resultElement);
}

function watchSubmit() {
  $('.search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('input').val();
    getDataFromApi(query, displaySearchData);
    query = $(this).find('input').val('')
  });
}

$(function() {
	watchSubmit();
})