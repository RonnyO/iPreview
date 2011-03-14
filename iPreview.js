(function( $ ){
	$.iPreview = {preview: null};

  $.fn.iPreview = function( method ){	
	var settings = {
		previewPath: null,
		previewHeight: 200
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
			var $this = $(this),
				dup = $this.clone().appendTo($.iPreview.preview),
				details = $this.find('details'),
				detailsHeight = $this.find('details').height(),
				width =  $this.width(),
				height = $this.height(),
				previewWidth = (settings.previewHeight / height) * width,
				previewHeight = settings.previewHeight + detailsHeight;
				
			$.iPreview.preview
				.removeClass('initial')
				.css({
					top: $this.position().top + 1,
					left: $this.position().left - 3,
					width: width,
					height: height
				})
				.show()
				.animate({
					width: previewWidth,
					height: previewHeight,
					left: $this.position().left - 3 - (previewWidth - width) / 2
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