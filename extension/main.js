(function () {
	'use strict';

	function render(badge, color, title) {
		chrome.browserAction.setBadgeText({
			text: badge
		});

		chrome.browserAction.setBadgeBackgroundColor({
			color: color
		});

		chrome.browserAction.setTitle({
			title: title
		});
	}

	function update() {
		render('∞', [65, 131, 196, 255], 'MP Login Helper');

		// gitHubNotifCount(function (count) {
		// 	if (count < 0) {
		// 		var text;
		// 		if (count === -1) {
		// 			text = 'You have to be connected to the internet and logged into GitHub';
		// 		} else if (count === -2) {
		// 			text = 'Unable to find count on page';
		// 		}
		// 		render('?', [166, 41, 41, 255], text);
		// 	} else {
		// 		if (count > 9999) {
		// 			count = '∞';
		// 		}
		// 		render(count, [65, 131, 196, 255], 'GitHub Notifier');
		// 	}
		// });
	}

	chrome.browserAction.onClicked.addListener(function (tab) {
		chrome.tabs.executeScript(null, {
			runAt: 'document_end'
		}, function (argument) {
			// body...
		});

		// if (tab.url.indexOf('/simplest/empresas/') !== -1) {
		// 	var element = document.querySelector('#main h2.text-transparent small');
		// 	if (element) {
		// 		console.log(element.innerHTML.trim());
		// 	} else {
		// 		console.log('slug não encontrado na página');
		// 	}
		// }

		// var notifTab = {
		// 	url: MPLogin.settings.get('urlBase')
		// };

		// if (tab.url === '' || tab.url === 'chrome://newtab/' || tab.url === notifTab.url) {
		// 	chrome.tabs.update(null, notifTab);
		// } else {
		// 	chrome.tabs.create(notifTab);
		// }
	});

	update();
})();
