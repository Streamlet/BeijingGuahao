$(function() {
	var init_info = function (info) {
		$('#name').val(info['name']);
		$('#social-id').val(info['social-id']);
		$('#hospital-id').val(info['hospital-id']);
		if (info['auto-send-sms']) {
			$('#auto-send-sms').attr('checked', 'checked');
		}
	};
	var init_favorites = function (favorites) {
		$('#favorites').empty();
		if (!$.isEmptyObject(favorites)) {
			for (var url in favorites) {
				$('#favorites').append(
					$('<span>').append(
						$('<button>').addClass('link').addClass('opentab').attr('href', url).text(favorites[url])
					).append(
						$('<button>').addClass('delete').text('删除').attr('data-url', url)
					)
				);
			}
		} else {
			$('#favorites').append(
				$('<p>').text('您还没有任何收藏')
			).append(
				$('<span>').text('请访问')
			).append(
				$('<a>').addClass('link').addClass('opentab').attr('href', 'http://www.bjguahao.gov.cn/').text('北京市预约挂号统一平台')
			).append(
				$('<span>').text('官方网站来查找适合您的医院和科室')
			);
		}
		init_links($('#favorites'));
		init_buttonset($('#favorites'));
		$('.delete').click(function() {
			var url = $(this).attr('data-url');
			chrome.storage.sync.get({
				'favorites': {}
			}, function(items) {
				delete items['favorites'][url];
				chrome.storage.sync.set({
					'favorites': items['favorites']
				}, function () {
					init_favorites(items['favorites']);
				});
			});
		});
	};
	chrome.storage.sync.get({
		'info': {},
		'favorites': {}
	}, function(items) {
		init_info(items['info']);
		init_favorites(items['favorites']);
	});

	$('#save').click(function() {
		chrome.storage.sync.set({
			'info' : {
				'name': $('#name').val(),
				'social-id': $('#social-id').val(),
				'hospital-id': $('#hospital-id').val(),
				'auto-send-sms': $('#auto-send-sms').is(':checked'),
			}
		}, function() {
			close();
		});
	});
	$('#delete').click(function() {
		chrome.storage.sync.remove('info', function() {
			close();
		})
	});
	$('#privacy').click(function() {
		alert($(this).attr('title'));
	});

	init_ui();
});