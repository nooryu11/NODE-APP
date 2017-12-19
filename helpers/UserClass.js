class Users {
	constructor(){
		this.users= []
	}


AddUser(id,name,room){
	var users = {id,name,room}
	this.users.push(users)
	return users;
}
	removeuser(id){
		var user = this.getUser(id);
		if(user){
			this.users = this.users.filter((user)=> user.id !== id);		
										   
		}
		return user;
								
	}
	getUser(id){
		var userlist = this.users.filter((userid)=>{
			return userid.id === id;
		})[0]
		return userlist;
	}
	GetUserList(room) {
		var users = this.users.filter((user)=>{
			return user.room === room;
		})
			var names = users.map((user)=>{
				return user.name
			})
			return names;
	
	} 
	GetUserRList() {
			return this.users
	
			
	}
	
	} 
	

module.exports = {Users} // export class