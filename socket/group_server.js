module.exports = function(io,Users){
	
	const users = new Users()
	io.on('connection',(socket)=>{
		console.log('user connected')
		
		socket.on('join',(params,callback)=>{
			socket.join(params.room)
			users.AddUser(socket.id,params.name,params.room)
			
			
			io.to(params.room).emit('userList',users.GetUserList(params.room))
			
			callback()
		});
		

		socket.on('createMessage',(message,callback)=>{
		
			io.to(message.room).emit('newMessage',{
				text:message.text,
				room:message.room,
				sender: message.sender
			})
			callback();
		});
		socket.on('disconnect',()=>{
			var user = users.removeuser(socket.id)
			if(user){
		var msg =  `${user.name} has left.`
			io.to(user.room).emit('userList',users.GetUserList(user.room))
				io.to(user.room).emit('adminmsg',msg)
			}
		})
	
		
	})//connect user 
};

//create msg listening
