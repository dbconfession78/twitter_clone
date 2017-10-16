window.onload = function () {
	console.log('Window loaded!');
	$('#tweet_input').val('test')// <--- remove when done testing
	const user_id = '@stueygk'; // TODO: grab this from page after logged in
	const name = 'Stuart Kuredjian';
	$('#tweet_button').on('click', function () {
		const tweet_dict = {'user_id': user_id, 'name': name, 'tweet': $('#tweet_input').val()}
		post_tweet(tweet_dict);
	});
}

function post_tweet (input) {
	if (!input["tweet"]) {
		$('div.error').html("You haven't posted anything silly<p>");
		return;
	}
	$('div#empty_tweet').html('&nbsp<p>')
	$('<p><div id="tweet_output"><b>' + input['name'] + '</b><br>' + input['user_id'] + '<p>' + input['tweet'] + '</div></p>').appendTo('#output_container');
	
	save(input);
}

function save (input) {
	str = JSON.stringify(input)
	console.log('input: ' + input + '\ntype: ' + typeof(input) + '\n')
	console.log('str: ' + str + '\ntype: ' + typeof(str) + '\n')


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

function p(object, d=false) {
	console.log(object);
	if (d === true) {
		debugger;
	}
}
