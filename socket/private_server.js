module.exports = function(io){
	io.on('connection',(socket)=>{
		socket.on('pm',(pmm)=>{
			socket.join(pmm.room1);
			socket.join(pmm.room2);
		
		})
		
		socket.on('pm_msg',(msg,callback)=>{
			io.to(msg.room).emit('new_pm',{
				text:msg.text,
				sender: msg.sender
			})
			
			io.emit('display msg',{})
			callback();
	
		})
	})
}