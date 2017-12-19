$(document).ready(function(){
	$('.add-btn').on('click',function(){
		$('#add-input').click()
		
	});
	$('#add-input').on('change',function(){
		var addInput = $('#add-input');
		
		if(addInput.val()!= ''){
			var formData = new FormData();
			formData.append('upload',addInput[0].files[0])
			$('#completed').html('File Uploaded Successfully')
			
			$.ajax({
				url: '/userupload',
				type: 'POST',
				data: formData,
				processData:false,
				contentType:false,
				success:function(){
					addInput.val('')
				}
			})
		}
	})
	
	$('#profile').on('click',function(){
//		const username = req.body.username;
//		const fullname = req.body.fullname;
//		const gender = req.body.gender;
//		const mantra = req.body.mantra;
//		const city = req.body.city;
		
		const username = $('#username').val();
		const fullname = $('#fullname').val();
		const gender = $('#gender').val();
		const city = $('#city').val();
		const mantra = $('#mantra').val();
		const userImage = $('#add-input').val()
		var valid  = true;
		if(username == '' ||fullname == '' || mantra == '' || city == ''  || gender == ''){
			valid = false;
			$('#error').html('<div class="alert alert-danger">Cannot submit empty field</div>')
		}
		else {
			$('#error').html('');
		}
//			
//		}
//		else {
		if(valid === true){
	$.ajax({// AJAX WILL NEED TO GET REQ.BODY.USERNAME
		url:'/settings/profile',
		type:'POST',
		data: {
			username,
			fullname,
			gender,
			mantra,
			city,
			upload: userImage
		},
			success: function(){
			setTimeout(function(){
				window.location.reload()
		},200)
				
			}
	})
		
		}
		
		else {
			return false;
		}
		
	
	
	})
	
	
})