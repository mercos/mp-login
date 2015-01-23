(function () {
    'use strict';

    var port;

    function render (badge, color, title) {
        // cores: [65, 131, 196, 255], [166, 41, 41, 255]

        // não está funcionando ainda
        // pesquisar melhor como faz para ser independente de tab.
        var tab = get_current_tab();
        if (tab) {
            chrome.browserAction.setBadgeText({text: badge, tabId: tab.id});
            chrome.browserAction.setBadgeBackgroundColor({color: color, tabId: tab.id});
            chrome.browserAction.setTitle({title: title, tabId: tab.id});
        }
        else {
            chrome.browserAction.setBadgeText({text: badge});
            chrome.browserAction.setBadgeBackgroundColor({color: color});
            chrome.browserAction.setTitle({title: title});
        }
    }

    function get_current_tab () {
        var tab;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            tab = tabs[0];
            console.log('tem tab')
            // chrome.pageAction.show(tabs[0].id);
        });
        return tab;
    }

    chrome.runtime.onConnect.addListener(function (p) {
        port = p;

        // Listens to messages from content.js
        port.onMessage.addListener(function (msg) {

            console.log(msg);

            if (msg.pode_logar) {
                render('10', [65, 131, 196, 255], 'Clique para logar');
            }

            if (msg.tem_slug) {
                render('5', [65, 131, 196, 255], 'Clique para abrir em nova aba');
            }

            if (msg.slug) {
                var url = MPLogin.settings.get('url_base') + msg.slug + MPLogin.settings.get('url_admin');
                chrome.windows.create({"url": url, "incognito": true, "focused": true});
            }
        });
    });

    chrome.browserAction.onClicked.addListener(function (tab) {

        if (tab.url.indexOf(MPLogin.settings.get('url_admin')) !== -1
            && tab.url.indexOf(MPLogin.settings.get('host')) !== -1) {
            port.postMessage({
                logar: true,
                login: MPLogin.settings.get('login'),
                senha: MPLogin.settings.get('senha')
            });
        }
        else {
            port.postMessage({send_me_slug: true});
        }

    });

    function init() {
        render('', [65, 131, 196, 255], 'Meus Pedidos Login');
    }
    init();

})();
