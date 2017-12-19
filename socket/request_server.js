module.exports= function(io){
	
	io.on('connection',(socket)=>{
		
		socket.on('joinR',(request,callback)=>{
			socket.join(request.sender);
			callback()
		})
		
		socket.on('friendrequest',(friend,callback)=>{
				  io.to(friend.receiver).emit('newfriendrequest',{
				from: friend.sender,
				to:friend.receiver
		})
			callback();
				  
		  })
	})
}
