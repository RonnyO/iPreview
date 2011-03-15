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
			var $this = $(this);
				$this.clone().appendTo($.iPreview.preview);
			var details = $this.find('details'),
				detailsHeight = details.height() + 5,
				width =  $this.width(),
				height = $this.height(),
				previewWidth = (settings.previewHeight / height) * width,
				previewHeight = settings.previewHeight + detailsHeight,
				previewTop = $this.position().top + 1 - (settings.previewHeight - height) / 2 - 7 ,
				previewLeft = $this.position().left - 3 - (previewWidth - width) / 2 - 7

				previewTop = Math.min(Math.max(previewTop, 13, window.pageYOffset + 13), window.pageYOffset + window.innerHeight - previewHeight - 18);
				previewLeft = Math.max(previewLeft, 13);
				
				var widthDelta = (previewLeft + previewWidth + 13) - $(window).width();
				if (widthDelta > 0) previewLeft -= widthDelta + 15;
				
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
					top: previewTop ,
					left: previewLeft
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