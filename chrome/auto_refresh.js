$(function () {
	var stop_refresh = function () {
		chrome.storage.sync.remove('auto_refresh');
		$('.stop_refresh').remove();
	};

	var do_auto_refresh = function (refresh_id) {
		var cell = $('#ksorder_time .ksorder_cen_l_t_c td:has(input[value="' + refresh_id + '"])');
		if (cell.hasClass('ksorder_ym')) {
			// 约满
			stop_refresh();
		} else if (cell.hasClass('ksorder_kyy')) {
			cell.click();
			stop_refresh();
		} else {
			cell.append($('<button>').attr('class', 'stop_refresh').text('停止刷新'));
			setTimeout(function () {
				window.location.reload();
			}, 1000);
			$('.stop_refresh').click(function () {
				stop_refresh();
			});
		}
	};

	var show_auto_refresh_buttons = function () {
		$('#ksorder_time .ksorder_cen_l_t_c td[class!="ksorder_ym"]').each(function (i, e) {
			$(e).append($('<button>').attr('id', $(e).children('input').val()).attr('class', 'auto_refresh').text('自动刷新'));
		});
		$('.auto_refresh').click(function (e) {
			$('.auto_refresh').attr('disabled', 'disabled');
			var refresh_id = $(this).attr('id');
			chrome.storage.sync.set({
				'auto_refresh': refresh_id,
			}, function () {
				$('.auto_refresh').remove();
				do_auto_refresh(refresh_id);
			});
		});
	}

	chrome.storage.sync.get('auto_refresh', function (items) {
		var refresh_id = items['auto_refresh'];
		console.log(refresh_id);
		if (refresh_id) {
			do_auto_refresh(refresh_id);
		} else {
			show_auto_refresh_buttons();
		}
	});

});