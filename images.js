(function($){
  $.fn.images = function(options){
  
	var that = this;
	
    var settings = {
		previewPath: 'preview/',	  
    };
	
	var methods = {
		init: function(){
			that.$preview = $('<div id="imagePreview">').appendTo('#gallery');
		}(),
		show: function(ev){
			$(this).find('.details').clone().appendTo(that.$preview);
			that.$preview.animate({});
		},
		hide: function(ev){
			that.$preview.empty();
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