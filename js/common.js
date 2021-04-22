$(function() {
	/* ヘッダー・フローティングエリア固定に伴い、上に余白を空ける
	-----------------------------------------------------*/
	fixedContent();
	$(window).on('resize', function() {
		fixedContent();
	});
	
	/* フローティングエリアをスクロール幅に従い、下からスライドアップ・ダウンさせる
	-----------------------------------------------------*/
	if($('.floatbox').hasClass('slideup')) {
		$('.floatbox').hide();
		
		$(window).on('load resize scroll', function() {
			if($('.floatbox.sp').length > 0 && $(window).width()<=767
				|| $('.floatbox.pc').length > 0 && $(window).width()>767
				|| $('.floatbox:not(.sp):not(.pc)').length > 0) {
				var sPos = $(window).scrollTop();
				if ( sPos > 500 ) {
					$('.floatbox').slideDown();
				} else {
					$('.floatbox').slideUp();
				}
			} else {
				$('.floatbox').hide();
			}
		});
	}
	
	/* PAGE TOP
	-----------------------------------------------------*/
	var topBtn = $('#page-top img');
	topBtn.hide();
	if ($(window).scrollTop() > 500) topBtn.fadeIn();
	
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 500) {
			topBtn.fadeIn();
		} else {
			topBtn.fadeOut();
		}
	});
	
	topBtn.click(function() {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		return false;
	});
	
	/* ページ内スクロール
	-----------------------------------------------------*/
	$('a[href^="#"]').on('click', function () {
		var h = ($('header').css('position')=='fixed') ? $('header').outerHeight() : 0;
		var speed = 500;
		var href = $(this).attr("href");
		var target = $(href == "#" || href == "" ? 'html' : href);
		var position = target.offset().top - h;
		$('body,html').animate({
			scrollTop: position
		}, speed, 'swing');
		return false;
	});
	
	/* ページ内スクロール（外部から）
	-----------------------------------------------------*/
	$(window).on('load', function() {
		var urlHash = location.hash;
		
		if(urlHash) {
			var speed = 500;
			var h = ($('header').css('position')=='fixed') ? $('header').outerHeight() : 0;
			var target = $(urlHash);
			var position = target.offset().top - h;
			$('html, body').animate({scrollTop:position}, speed, 'swing');				
		}
	});
	
	/* モーダル　前の記事へ・次の記事へ
	-----------------------------------------------------*/
	$('.modal_open.change').on('click', function() {
		$('.modal_bg').remove();
		$(this).parents('.modal_box').fadeOut();
	});
	
	/* よくあるご質問 アコーディオン
	-----------------------------------------------------*/
	$(window).on('load', function () {
		$('.pdown .ans').hide();
	});
	$('.pdown .que').on('click', function () {
		if ($(this).parent().hasClass('open')) {
			$(this).parent().removeClass('open');
			$(this).next('.pdown .ans').slideUp(300);
		} else {
			$(this).parent().addClass('open');
			$(this).next('.pdown .ans').slideDown(300);
		}
		$('.pdown .que').not($(this)).next('.pdown .ans').slideUp(300);
		$('.pdown .que').not($(this)).parent().removeClass('open');
	});
});

function fixedContent() {
	/* ヘッダー固定に伴い、上に余白を空ける
	-----------------------------------------------------*/
	if($('header.ws').css('position')=='fixed') {
		var h = $('header').outerHeight();
		$('body').css('padding-top', h + 'px');
	} else {
		$('body').css('padding-top', 0);
	}
	
	/* フローティングエリア固定に伴い、下に余白を空ける
	-----------------------------------------------------*/
	$(window).on('load resize scroll', function() {
		if($('.floatbox').css('position')=='fixed') {
			var f = $('.floatbox').outerHeight();
			$('body').css('padding-bottom', f + 'px');
		} else {
			$('body').css('padding-bottom', 0);
		}
	});
}
