(function( $ ){
  $.fn.images = function( method ){
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
				$(this).hover(methods.show, methods.hide);
			});
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