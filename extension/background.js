(function () {
    'use strict';

    var port;

    chrome.runtime.onConnect.addListener(function (p) {
        port = p;

        // Listens to messages from content.js
        port.onMessage.addListener(function (msg) {
            if (msg.tem_slug) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    chrome.pageAction.show(tabs[0].id);
                });
            }

            if (msg.pode_logar) {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    sendLoginMessage(tabs[0]);
                });
            }

            if (msg.slug) {
                MPLogin.settings.set('host', msg.host);
                var url = MPLogin.getUrl(msg.host, msg.slug);
                chrome.windows.create({"url": url, "incognito": true, "focused": true});
            }
        });
    });

    chrome.pageAction.onClicked.addListener(function (tab) {
        if (!isAdminArea(tab)) {
            port.postMessage({send_me_slug: true});
        }
    });

    function sendLoginMessage(tab) {
        if (isAdminArea(tab)) {
            port.postMessage({
                logar: true,
                login: MPLogin.settings.get('login'),
                senha: MPLogin.settings.get('senha')
            });
        }
    }

    function isAdminArea(tab) {
        return tab.url.indexOf(MPLogin.settings.get('host')) !== -1
            && tab.url.indexOf(MPLogin.settings.get('url_admin')) !== -1;
    }

})();
