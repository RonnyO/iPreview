(function($){
  $.fn.images = function(options) {
  
     var settings = {
		previewPath: 'preview/',	  
    };

    return this.each(function() {        
      if (options) { 
        $.extend(settings, options);
      }
	  
	  console.log(this);
    });
  };
})(jQuery);