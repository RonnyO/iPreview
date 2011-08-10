/*
 * iPreview v0.15
 * https://github.com/RonnyO/iPreview/
 *
 * Copyright 2011, Ronny Orbach, Shany Lev, Konstantin Shnaider
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function( $ ){
	var $win = $(window);
	
	$.iPreview = { 
		preview: null,
		boundOneTimeEvents: false
	};

  $.fn.iPreview = function( method ){
	var settings = {
		previewHeight: 200,
		duration: 300
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
				dup = $this.clone().appendTo($.iPreview.preview),
				$imgWithPreview = $this.find('img[data-preview]');
				if ( $imgWithPreview.length ) methods.loadPreview($imgWithPreview);
				
			var details = $this.find('.details');
				detailsHeight = details.height() + 5;
				width =  $this.width(),		// width of image in gallery
				height = $this.height(),	// height of image in gallery
				// tooltip total width - calculated according to the proportion between the heights provided
				previewWidth = (settings.previewHeight / height) * width;
				previewHeight = settings.previewHeight + detailsHeight;	// tootltip's total height
				// tooltip's top location relative to its image - lift it by half of the distance between the image and the tooltip heights.
				// take into consideration tooltip's padding (7)
				previewTop = ($this.position().top + 1)	- (settings.previewHeight - height) / 2 - 7;	
				// tooltip's left location relative to its image - take it left by half of the distance between the image and the tooltip widths.
				// take into consideration tooltip's padding (7)
				previewLeft = ($this.position().left - 3) - (previewWidth - width) / 2 - 7;
				// mask covers the original image and is unified to the tooltip for the mouseleave event
				maskTop = $this.offset().top - $win.scrollTop();
				maskLeft = $this.offset().left - $win.scrollLeft();
				
			previewTop = Math.min(Math.max(previewTop, 13, $win.scrollTop() + 13), $win.scrollTop() + $win.height() - previewHeight - 27);
            previewLeft = Math.max(previewLeft, 13);
			var widthDelta = (previewLeft + previewWidth + 11) - $win.width();
			if (widthDelta > 0) previewLeft -= widthDelta + 15;
			
			$.iPreview.mask = $('<div id="iPreviewMask">').appendTo($.iPreview.preview);
			$.iPreview.mask.css({
				left: maskLeft,
				top: maskTop,
				width: width,
				height: height
			});
			
			$.iPreview.preview
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
				}, settings.duration);
		},
		hide: function(ev){
			$.iPreview.preview
				.stop()
				.hide()
				.empty();
		},
		loadPreview: function($img){
			var pageHref = document.location.href.split('/'),
				url = $img.attr('data-preview'),
				$previewImg = $.iPreview.preview.find('img');
				
			if( $previewImg.data('loaded') ) return;
			
			if(url) {
				if( !/^https?:\/\//.test(url) ){
					pageHref[pageHref.length - 1] = url;
					url = pageHref.join('/');
				}
				var preview = new Image();
				preview.onload = function(){ // need to add a security check here - Currently race conditions could cause image override.
					if(preview.width && preview.height) {
						$previewImg.attr('src', url);
					}
					$previewImg.data('loaded', true);
				};
				preview.src = url;
			}
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