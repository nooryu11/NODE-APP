$(document).ready(function () {
	var socket = io();

	var n = $('#private').val();
	//	console.log(n)

//		var param_1 = $.deparam(window.location.pathname)

	var param2 = n.split('.');
	$('.user_name').text('@' + param2[0])

	swap(param2, 0, 1);
	var param_2 = param2[0] + '.' + param2[1];
	

	socket.on('connect', function () {
		var params = {
			room1: n,
			room2: param_2
		}
		socket.emit('pm', params)
		socket.on('display msg',function(){
			$('#reload').load(location.href + ' #reload')
		})
	})
	socket.on('new_pm', function (data) {
		
		var template = $('#message-template').html()
		var message = Mustache.render(template, {
			text: data.text,
			sender: data.sender

		})
		$('#messages').append(message)
	})


	$('#message_form').on('submit', function (e) {
		
		e.preventDefault();
		var msg = $('#msg').val()
		var sender = $('#name-user').val();

		if (msg != ' ') {
			socket.emit('pm_msg', {
				text: msg,
				sender: sender,
				room: n
			}, function () {
				$('#msg').val('')
			})
		}
	})

	$('#send-message').on('click', function () {
		var message = $('#msg').val()

		$.ajax({
			url: '/chat/'+n,
			type: 'POST',
			data: {
				message: message
			},
			success: function () {
				$('#msg').val('')
					
			
			}
		})
	})

})





	function swap(val, val1, val2) {
		var temp = val[val1];
		val[val1] = val[val2];
		val[val2] = temp
	}
