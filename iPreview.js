(function( $ ){
	$.iPreview = {preview: null};

  $.fn.iPreview = function( method ){	
	var settings = {
		previewPath: null,
		maxWidth: 250,
		maxHeight: 250
	};
	
	var methods = {
		init: function( options ){
			if ( options ) $.extend(settings, options);
			$.iPreview.preview = $.iPreview.preview || $('<div id="iPreview">').appendTo('body');
			$.iPreview.preview.bind('mouseleave.iPreview', methods.hide);
			$('window').bind('beforeunload', methods.destroy);
			$(this).parent().addClass('iPreview');
			
			return $(this).each(function(){
				$(this).bind('mouseover.iPreview', methods.show);
			});
		},
		destroy: function(){
			$(this).unbind('.iPreview');
			if ( $.iPreview.preview ) $.iPreview.preview.remove();
		},
		show: function(ev){
			methods.hide();
			var $img = $(this);
			$img.clone().appendTo($.iPreview.preview);
			var detailsHeight = $img.find('details').height();
			var width =  $img.width(),
				height = $img.height(),
				previewHeight;
			
			var delta = settings.maxHeight - (height + detailsHeight);
			if(delta > 0) {
				previewHeight = height + detailsHeight
			} else {
				height -= delta;
				previewHeight = settings.maxHeight - delta;
			}			
			
			$.iPreview.preview
				.removeClass('initial')
				.css({
					top: $(this).position().top + 1,
					left: $(this).position().left - 3,
					width: width,
					height: height
				})
				.show()
				.animate({
					width:  'auto',
					height: previewHeight
				}, 300);
		},
		hide: function(){
			$.iPreview.preview
				.stop()
				.hide()
				.empty();
		},
		resize: function(){}
	};
	
	// Method calling logic
	if ( methods[method] ) {
		return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
	} else if ( typeof method === 'object' || ! method ) {
		return methods.init.apply( this, arguments );
	} else {
		$.error( 'Method ' +  method + ' does not exist on jQuery.iPreview' );
	}
  };
})( jQuery );