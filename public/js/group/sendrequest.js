$(document).ready(function(){
	
	var socket = io();
	var room = $('#groupname').val()
	var sender = $('#sender').val()
	
	
	socket.on('connect',function(){
		var params = {
			sender:sender,
			
		}
		socket.emit('joinR',params,function(){
			console.log('lug gyi')
		})
		
	})
	
	socket.on('newfriendrequest',function(friend){
		$('#reload').load(location.href + ' #reload')
		$(document).on('click','#accept_friend',function(){
	var senderId = $('#senderId').val()
	var senderName = $('#senderName').val()
	
	$.ajax({
		url: '/group/'+room,
		type: 'POST',
		data: {
			senderId: senderId,
			senderName:senderName
			
		},
		success: function(){
			$(this).parent().eq(1).remove();
		}
		
	})
	$('#reload').load(location.href + ' #reload')
})
		$(document).on('click','#cancel_friend',function(){
	var user_Id= $('#user_Id').val();
	
	$.ajax({
		url: '/group/'+room,
		type: 'POST',
		data: {
			user_Id: user_Id
			
		},
		success: function(){
			$(this).parent().eq(1).remove();
		}
		
	})
	$('#reload').load(location.href + ' #reload')
})
		
	})

//	
	$('#add_friend').on('submit',function(e){
		e.preventDefault();
		var recName = $('#receiverName').val()
		$.ajax({
		url:'/group/'+room,
		type:'POST',
		data:{
			receiverName: recName
		},
			success:function(){
				
		
			socket.emit('friendrequest',{
					receiver:recName,
					sender:sender
				},function(){
					console.log('request send')
				})
			}
	})
 })























		$('#accept_friend').on('click',function(){
	var senderId = $('#senderId').val()
	var senderName = $('#senderName').val()
	
	$.ajax({
		url: '/group/'+room,
		type: 'POST',
		data: {
			senderId: senderId,
			senderName:senderName
			
		},
		success: function(){
			$(this).parent().eq(1).remove();
		}
		
	})
	$('#reload').load(location.href + ' #reload')
})
		$('#cancel_friend').on('click',function(){
	var user_Id = $('#user_Id').val();
	
	$.ajax({
		url: '/group/'+room,
		type: 'POST',
		data: {
			user_Id: user_Id
			
		},
		success: function(){
			$(this).parent().eq(1).remove();
		}
		
	})
	$('#reload').load(location.href + ' #reload')
})
})
				  

