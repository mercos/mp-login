(function () {
	'use strict';



	var port;
	var toggle = false;

	chrome.runtime.onConnect.addListener(function(p) {
	    port = p;

	    // Listens to messages from content.js
	    // receber o slug por aqui
	    port.onMessage.addListener(function(msg) {
	        // Shows the icon if there's a custom element
	        if (msg.numero) {
	        	render(msg.numero, [65, 131, 196, 255], 'Raaaaa');
	        }

	        if (msg.open_window) {
	        	// abrir tab
	        	console.log('abrir janela');
	        	var url = '<>';
	        	chrome.windows.create({
	        		"url": url,
	        		"incognito": true,
	        		"focused": true
	        	}, function (new_window) {
        			console.log(new_window.id);
        			chrome.browserAction.setTitle({title: new_window.id});
	        	});
	        }

	        // if (msg.hasElements) {
	        //     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	        //         chrome.pageAction.show(tabs[0].id);
	        //     });
	        // }
	    });
	});

	// Sends a message when the icon is clicked
	// caso precise mandar o slug novamente fazer a requisicao aqui
	// chrome.pageAction.onClicked.addListener(function(tab) {
	//     toggle = !toggle;
	//     port.postMessage({open: toggle});
	// });




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
		chrome.browserAction.setTitle({title: 'Meus Pedidos Login'});

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
		console.log('cliquei');
		try {
			port.postMessage({send: true});
			console.log('enviou mensagem');
		} catch (e) {
			console.error(e);
		}
		// chrome.tabs.executeScript(null, {
		// 	runAt: 'document_end'
		// }, function (argument) {
		// 	// body...
		// });

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
