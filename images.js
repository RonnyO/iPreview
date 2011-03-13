(function( $ ){
	var that = {preview: null};
    var settings = {
		previewPath: 'preview/'	  
    };
	
	var methods = {
		init: function( options ){
			if ( options ) { 
				$.extend(settings, options);
			}
			that.preview = $('<div id="imagePreview">').appendTo('#gallery');
			
			return $(this).each(function(){
				$(this).bind('mouseenter.images', methods.show);
				$(this).bind('mouseleave.images', methods.hide);
			});
		},
		destroy: function(){
			$(this).unbind('.images');
			if ( that.preview ) that.preview.remove();
		},
		show: function(ev){
			$(this).find('.details').clone().appendTo(that.preview);
			console.log($(this).offset());
			that.preview.animate({});
		},
		hide: function(ev){
			that.preview.empty();
		},
		resize: function(){}
	};
  $.fn.images = function( method ){
	// Method calling logic
	if ( methods[method] ) {
		return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} else if ( typeof method === 'object' || ! method ) {
		return methods.init.apply( this, arguments );
	} else {
		$.error( 'Method ' +  method + ' does not exist on jQuery.tooltip' );
	}
  };
})( jQuery );