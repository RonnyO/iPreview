(function($){
  $.fn.images = function(options){
  
	var that = this;
	
    var settings = {
		previewPath: 'preview/',	  
    };
	
	var methods = {
		show: function(ev){
			console.log('show');
		},
		hide: function(ev){
			console.log('hide');
		},
		resize: function(){}
	};
	
    return $(this).each(function(){        
      if (options) { 
        $.extend(settings, options);
      }
	  
	  $(this).hover(methods.show, methods.hide);
    });
  };
})(jQuery);