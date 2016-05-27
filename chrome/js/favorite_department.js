$(function() {
	var title = $('.ksorder_box_top_p strong').text();
	var url = window.location.href;
	chrome.storage.sync.get('favorites', function(items) {
		if (items['favorites'][url]) {
			$('.ksorder_box_top_p').append(
				$('<span>').html('&nbsp;')
			).append(
				$('<button>').text('已收藏到北京挂号助手').attr('disabled', true)
			);
		} else {
			$('.ksorder_box_top_p').append(
				$('<span>').html('&nbsp;')
			).append(
				$('<button>').text('收藏到北京挂号助手').click(function () {
					add_favorite(url, title);
					$(this).text('已收藏到北京挂号助手').attr('disabled', true);
				})
			);
		}
	});
});
