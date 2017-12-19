$(document).ready(function(){
	
	$('#favourite').on('submit',function(e){
		e.preventDefault();
		
		
		var id = $('#id').val()
		console.log(id)
		console.log(club_id)
		var clubname = $('#clubname').val();
		$.ajax({
			url:'/home',
			type:'POST',
			data: {
				id: id,
				clubname: clubname
			},
			success: function(){
				console.log(clubname)
			}
			
			
		})
		
		
	})
	
	
	
	
	
})