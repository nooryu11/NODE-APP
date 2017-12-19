$(document).ready(function () {

	$('#favClubBtn').on('click', function () {

		var favclub = $('#favClub').val();

		var valid = true;
		if (favclub == '') {
			valid = false;
			$('#error').html('<div class="alert alert-danger">Cannot submit empty field</div>')
		} else {
			$('#error').html('');
		}
		//			
		//		}
		//		else {
		if (valid === true) {
			$.ajax({ // AJAX WILL NEED TO GET REQ.BODY.USERNAME
				url: '/settings/interests',
				type: 'POST',
				data: {
					favClub: favclub
				},
				success: function () {
					setTimeout(function () {
						window.location.reload();
					}, 200);
				}



			})
		} else {
			return false
		}


	})
// FAV PLAYER AJAX
	$('#favPBtn').on('click', function () {

		var favplayer = $('#favPlayer').val();

		var valid = true;
		if (favclub == '') {
			valid = false;
			$('#error').html('<div class="alert alert-danger">Cannot submit empty field</div>')
		} else {
			$('#error').html('');
		}
		//			
		//		}
		//		else {
		if (valid === true) {
			$.ajax({ // AJAX WILL NEED TO GET REQ.BODY.USERNAME
				url: '/settings/interests',
				type: 'POST',
				data: {
					favPlayer: favplayer
				},
				success: function () {
					setTimeout(function () {
						window.location.reload();
					}, 200);
				}



			})
		} else {
			return false
		}


	})
// FAV NATIONAL TEAM AJAX 
	$('#favTBtn').on('click', function () {

		var favteam = $('#favTeam').val();

		var valid = true;
		if (favclub == '') {
			valid = false;
			$('#error').html('<div class="alert alert-danger">Cannot submit empty field</div>')
		} else {
			$('#error').html('');
		}
		//			
		//		}
		//		else {
		if (valid === true) {
			$.ajax({ // AJAX WILL NEED TO GET REQ.BODY.USERNAME
				url: '/settings/interests',
				type: 'POST',
				data: {
					favTeam: favteam
				},
				success: function () {
					setTimeout(function () {
						window.location.reload();
					}, 200);
				}



			})
		} else {
			return false
		}


	})


})
