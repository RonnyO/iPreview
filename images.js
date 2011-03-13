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
			that.preview = $('<div id="imagePreview">').appendTo('body');
			that.preview.bind('mouseleave.images', methods.hide);
			
			return $(this).each(function(){
				$(this).bind('mouseover.images', methods.show);
			});
		},
		destroy: function(){
			$(this).unbind('.images');
			if ( that.preview ) that.preview.remove();
		},
		show: function(ev){
			methods.hide();
			console.log('showing');
			$(this).clone().appendTo(that.preview);
			
			that.preview.show().css({
				top: $(this).position().top + 1,
				left: $(this).position().left - 3
			})
			.animate({});
		},
		hide: function(){
			console.log('hiding');
			that.preview.hide().empty();
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
		$.error( 'Method ' +  method + ' does not exist on jQuery.images' );
	}
  };
})( jQuery );