module.exports = function(io,Global,_){
	const client = new Global()
	
	io.on('connection',(socket)=>{
		socket.on('global room',(global)=> {
			socket.join(global.room)
			client.EnterRoom(socket.id,global.name,global.room,global.img)
			
			const nameProp = client.GetRoomList(global.room)
			const unique = _.uniqBy(nameProp,'name')
			io.to(global.room).emit('loggeduser',unique)
			
		})
	

	
	socket.on('disconnect',()=>{// add feature to show friend is offline
	
			const user = client.removeuser(socket.id)
			if(user){
				const nameProp = client.GetRoomList(user.room)
				
			
				
				const unique = _.uniqBy(nameProp,'name')
	
			
			io.to(user.room).emit('loggeduser',unique)
				
			}
		})
			})
}