$(document).ready(function(){
	var socket = io()
	
	socket.on('connect',function(){
		
		var room = 'Global Room';
			var name = $('#name-user').val();
		var img = $('#name-image').val()
		socket.emit('global room',{
			room,
			name,
			img
		})
	})
	
	socket.on('loggeduser', function(users){
	
		
		var friends = $('.friend').text();
		var friend = friends.split('@')
		var arr = []
		
		var name = $('#name-user').val().toLowerCase()
		var ol = $('<div></div>')
		for(var i=0 ;i<users.length; i++){
			
			if(friend.indexOf(users[i].name)> -1){
				arr.push(users[i])
				
				var list = '<img src="http://placehold.it/300x300" class="pull-left img-circle" style= "width:50px; margin-right:10px;" /><p>'+ '<a href ="/chat/'+users[i].name.replace(/ /g,"-").toLowerCase()+'.'+name.replace(/ /g,"-")+'"><h3 style="padding-top:15px;color:gray;font-size:14px;">'+'@'+users[i].name+'<span class="fa fa-circle online_friend"></span></h3></a><p>'
				ol.append(list)
			}
		}
		$('#numOfFriends').text('('+arr.length+')')
		$('.onlineFriends').html(ol)
	
	})
	
		

})