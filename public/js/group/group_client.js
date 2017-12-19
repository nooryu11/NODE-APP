$(document).ready(function(){
	var socket = io();
	var room = $('#groupname').val();
	var sender = $('#sender').val();
	socket.on('connect',function(){
		console.log('yea! user connected')
		var params = {
			room: room,
			name: sender
		}
		socket.emit('join',params,function(){
			console.log('user has joined channel')
		
		
		
			})
	});
	
	socket.on('userList',function(users){
		var ol  = $('<ol></ol>')
		for(var i= 0;i<users.length;i++){
			ol.append('<p><a id="val" data-toggle="modal" data-target="#myModal">'+users[i]+'</a></p>')
		}
		$(document).on('click','#val',function(){
			$('#name').text('@'+$(this).text())
			$('#receiverName').val($(this).text())
			$('#nameLink').attr("href","/profile/"+$(this).text())
		})
		$('#numValue').text('('+users.length+')')
		$('#users').html(ol)
	})
//	socket.on('adminmsg',function(msg){
//		var ol  = $('<ol></ol>')
//		ol.append('<p style="color:red ;font-weight:bold">'+msg+'</p>');
//		$('.chat_area').html(ol);
//		
//	})
	
		
	
	socket.on('newMessage',function(new_message){
	var template = $('#message-template').html()
	var message = Mustache.render(template,{
		text: new_message.text,
		sender: new_message.sender
		
	})
	$('#messages').append(message)
	})
	
	
	
	$('#message-form').on('submit',function(e){
			e.preventDefault();// prevent form from reload
		var msg = $('#msg').val()
		socket.emit('createMessage',{
			text:msg,
			room:room,
			sender:sender
		},function(){
			$('#msg').val('')
		});
		$.ajax({
			url:'/group/'+room,
			type: 'POST',
			data: {
				message: msg,
				groupname:room // it didnt work, the key here has to be same as key i ejs file in order to read so groupname key would have worked bcz groupname key is saved in ejs group
			},
			sucess: function(){
				$('#msg').val('')
			}
		})
	});
	
});
	
