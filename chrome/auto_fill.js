$(function () {
	chrome.storage.sync.get('info', function(items) {
		var info = items['info'];
		// 选择就诊人
		$('input[name="hzr"]').attr('checked', false);
		if (info['name'] && info['idcard']) {
			$('p:has(input[name="hzr"])').each(function (i, e) {
				if ($(e).text().indexOf(info['name']) >= 0) {
					$(e).children('input').click();
				}
			});
		}
		// 就诊卡
		if (info['hospital-id']) {
			$('#Rese_db_dl_jzk').val(info['hospital-id']);
		}
		// 医保卡
		if (info['social-id']) {
			$('#Rese_db_dl_ybk').val(info['social-id']);
		}
		// 报销类型
		$('#Rese_db_dl_idselect>option[value=1]').attr('selected', 'selected');
		// 手机号
		if (info['mobile']) {
			$('#Rese_db_dl_dxyzid').val(info['mobile']);
		}

		// 获取验证码
		if (info['auto-send-sms']) {
			$('#btnSendCodeOrder').click();
		}
	});
});