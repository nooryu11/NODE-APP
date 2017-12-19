(function($){ // this allo to get the part of url if you want for socket purpose 
	$.deparam = $.deparam || function(uri){
		if(uri === undefined){
			uri = window.location.pathname;
		}
		var val1 = window.location.pathname
		var val2 = val1.split('/')
		var var3 = val2[2];
		return var3
	}
	
	
	
	
	
	
	
	
})(jQuery)