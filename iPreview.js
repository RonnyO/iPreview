// self invoked function
(function( $ ){
	$.iPreview = { 
		preview: null,
		boundOneTimeEvents: false
	};

  $.fn.iPreview = function( method ){
	var settings = {
		previewPath: null,
		previewHeight: 200
	};

	var methods = {
		init: function( options ){
			if ( options ) $.extend(settings, options);
			$.iPreview.preview = $.iPreview.preview || $('<div id="iPreview">').appendTo('body');
			methods.bindOneTimeEvents();
			$(this).parent().addClass('iPreview');
			
			return $(this).each(function(){
				$(this).bind('mouseover.iPreview', methods.show);
			});
		},
		bindOneTimeEvents: function(){
			if ($.iPreview.boundOneTimeEvents) return false;
			$.iPreview.preview.bind('mouseleave.iPreview', methods.hide);
			$('window').bind('beforeunload.iPreview', methods.destroy);
			$.iPreview.boundOneTimeEvents = true;
		},
		destroy: function(){
			$(this).unbind('.iPreview');
			if ( $.iPreview.preview ) $.iPreview.preview.remove();
		},
		show: function(ev){
			methods.hide();
			var $this = $.iPreview.$this = $(this),
				dup = $this.clone().appendTo($.iPreview.preview);
			var details = $this.find('details'),
				detailsHeight = details.height() + 5,
				width =  $this.width(),		// width of image in gallery
				height = $this.height(),	// height of image in gallery
				// tooltip total width - calculated according to the proportion between the heights provided
				previewWidth = (settings.previewHeight / height) * width,	
				previewHeight = settings.previewHeight + detailsHeight,	// tootltip's total height
				// tooltip's top location relative to its image - lift it by half of the distance between the image and the tooltip heights.
				// take into consideration tooltip's padding (7)
				previewTop = ($this.position().top + 1)	- (settings.previewHeight - height) / 2 - 7,	
				// tooltip's left location relative to its image - take it left by half of the distance between the image and the tooltip widths.
				// take into consideration tooltip's padding (7)
				previewLeft = ($this.position().left - 3) - (previewWidth - width) / 2 - 7,
				// mask covers the original image and is unified to the tooltip for the mouseleave event
				maskTop = $this.offset().top - $(window).scrollTop(),
				maskLeft = $this.offset().left - $(window).scrollLeft();
			previewTop = Math.min(Math.max(previewTop, 13, $(window).scrollTop() + 13), $(window).scrollTop() + $(window).height() - previewHeight - 18);
            previewLeft = Math.max(previewLeft, 13);
			var widthDelta = (previewLeft + previewWidth + 13) - $(window).width();
			if (widthDelta > 0) previewLeft -= widthDelta + 15;
			
			$.iPreview.mask = $('<div id="iPreviewMask">').appendTo($.iPreview.preview);
			$.iPreview.mask.css({
				left: maskLeft,
				top: maskTop,
				width: width,
				height: height
			});
			
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
		hide: function(ev){
			$.iPreview.preview
				.stop()
				.hide()
				.empty();
		}
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