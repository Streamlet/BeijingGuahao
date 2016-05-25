$(function() {
	$('#site').click(function () {
		chrome.tabs.create({ url: 'http://www.bjguahao.gov.cn/' });
	});
});