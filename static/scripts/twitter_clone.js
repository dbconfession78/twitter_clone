let tweets = [];
window.onload = function () {
	console.log('Window loaded!');
	const user_id = '@stueygk'; // TODO: grab this from page after logged in>
	const name = 'Stuart Kuredjian';
	$('#tweet_button').on('click', function () {
		const tweet_dict = {'user_id': user_id, 'name': name, 'tweet': $('#tweet_input').val()}
		post_tweet(tweet_dict);
	});

	// added after 2 hr cut off
	$("#test").on('click', function () {
		delete_all_tweets();
/*		fetch_tweets();
		reload_tweets(tweets);
*/
	});
}

// added after 2 hr cut off
function reload_tweets () {
	$('#output_container').empty();
	for (let i=0; i<tweets.length; i++) {
		$('<div id="tweet_output"><b>' + tweets[i]['name'] + '</b><br>' +tweets[i]['user_id'] + '<p>' + tweets[i]['tweet'] + '</div></p>').appendTo('#output_container');}
}

// added after 2 hr cut off
function fetch_tweets () {
	$.ajax ({
		async: false,
		url: "http://localhost:5001/load",
		type: "GET",
		contentType:  "application/json" ,
		success: function (res) {
			tweets = res;
		}
	});
}

function post_tweet (input) {
	if (!input["tweet"]) {
		// TODO move thie error down a little to avoid box shadow
		$('div.error').html("You haven't posted anything silly<p>");
		return;
	}
	$('div#empty_tweet').html('&nbsp<p>')
	save(input);
	fetch_tweets();
	reload_tweets()
}

function save (input) {
	str = JSON.stringify(input)
//	console.log('input: ' + input + '\ntype: ' + typeof(input) + '\n')
//	console.log('str: ' + str + '\ntype: ' + typeof(str) + '\n')

	$.ajax ({
		url:  'http://localhost:5001/save/',
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json',
		accessControlAllowOrigin: "*",
		data: str,
		success: function (res) {
			console.log(res);
		}
	});
}

function delete_all_tweets () {
	$.ajax({
		url: 'http://localhost:5001/delete_all/',
		type: 'GET',
		contentType: 'application/json',
		success: function (res) {
			console.log(res);
		}
	});
	$('#output_container').empty();
}

function p(object, d=false) {
	console.log(object);
	if (d === true) {
		debugger;
	}
}
