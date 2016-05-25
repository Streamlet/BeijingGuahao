$(function() {
	chrome.storage.sync.get('info', function(items) {
		$('#name').val(items['info']['name']);
		$('#mobile').val(items['info']['mobile']);
		$('#social-id').val(items['info']['social-id']);
		$('#hospital-id').val(items['info']['hospital-id']);
		if (items['info']['auto-send-sms']) {
			$('#auto-send-sms').attr('checked', 'checked');
		}
	});
	$('#save').click(function() {
		chrome.storage.sync.set({
			'info' : {
				'name': $('#name').val(),
				'mobile': $('#mobile').val(),
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
});