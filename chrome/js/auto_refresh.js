$(function () {
	var stop_refresh = function () {
		chrome.storage.sync.remove('auto_refresh');
		$('.stop_refresh').remove();
	};

	var do_auto_refresh = function (refresh_id) {
		var cell = $('#ksorder_time .ksorder_cen_l_t_c td:has(input[value="' + refresh_id + '"])');
		var continue_refresh = function () {
			cell.append($('<button>').attr('class', 'stop_refresh').text('停止刷新'));
			$('.stop_refresh').click(function () {
				stop_refresh();
			});
			setTimeout(function () {
				window.location.reload(true);
			}, 1000);
		};
		if (cell.hasClass('ksorder_ym')) {
			// 约满
			stop_refresh();
		} else if (cell.hasClass('ksorder_kyy')) {
			cell.trigger('click');
			(function () {
				var self = arguments.callee;
				if ($('.ksorder_djgh_dr1 .ksorder_dr1_dl').length > 0) {
					chrome.storage.sync.get({
						'info': {}
					}, function(items) {
						var info = items['info'];
						var matched = [];
						$('.ksorder_djgh_dr1').each(function (i, e) {
							var this_matched = true;
							if (info['doctor-type']) {
								var doctor_type = $(e).find('.ksorder_dr1_dl dd h4').text();
								try {
									if (!new RegExp(info['doctor-type']).test(doctor_type)) {
										this_matched = false;
									}
								} catch (e) {
									if (doctor_type.indexOf(info['doctor-type']) >= 0) {
										this_matched = false;
									}
								}
							}
							if (info['doctor-desc']) {
								var doctor_desc = $(e).find('.ksorder_dr1_dl dd p').text();
								try {
									if (!new RegExp(info['doctor-desc']).test(doctor_desc)) {
										this_matched = false;
									}
								} catch (e) {
									if (doctor_desc.indexOf(info['doctor-desc']) >= 0) {
										this_matched = false;
									}
								}
							}
							if (this_matched) {
								matched.push(i);
							}
						});

						if (matched.length > 0) {
							stop_refresh();
							if (matched.length === 1 || info['auto-choose-doctor']) {
								window.location = $('.ksorder_djgh_dr1:nth-child(' + (matched[0] + 1) + ') .ksorder_dr1_p2 a.ksorder_dr1_syhy').attr('href');
							}
						} else {
							continue_refresh();
						}

					});

				} else {
					setTimeout(self, 100);
				}
			})();
		} else {
			continue_refresh();
		}
	};

	var show_auto_refresh_buttons = function () {
		$('#ksorder_time .ksorder_cen_l_t_c td[class!=ksorder_ym]').each(function (i, e) {
			$(e).append(
				$('<button>').attr('id', $(e).children('input').val()).attr('class', 'auto_refresh').text('自动刷新')
			);
		});
		$('.auto_refresh').click(function (e) {
			var login_link = $('.dbnav_context_right a:first-child');
			if (login_link.length > 0) {
				alert('请先登录，以免刷到号后耽误填写速度。');
			} else {
				$('.auto_refresh').attr('disabled', 'disabled');
				var refresh_id = $(this).attr('id');
				chrome.storage.sync.set({
					'auto_refresh': refresh_id,
				}, function () {
					$('.auto_refresh').remove();
					do_auto_refresh(refresh_id);
				});
			}
		});
	}

	chrome.storage.sync.get({
		'auto_refresh': false
	}, function (items) {
		var refresh_id = items['auto_refresh'];
		console.log(refresh_id);
		if (refresh_id) {
			do_auto_refresh(refresh_id);
		} else {
			show_auto_refresh_buttons();
		}
	});

});