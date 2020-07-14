(function(){
    'use strict';

    // Opens a port to communicate messages
    var port = chrome.runtime.connect({name: "channel"});
    var isValidHost = window.location.host.indexOf('app.mercos.com') !== -1
    var selectorSlug = '#slug-para-extensao-chrome'

    if (isValidHost && window.location.pathname.indexOf('/admin/') !== -1
        && !document.querySelector('ul.motivos')
        &&  document.getElementById('id_login')
        &&  document.getElementById('id_senha')
        &&  document.getElementById('form')) {

        port.postMessage({ pode_logar: true });
    } else if (isValidHost && window.location.pathname.indexOf('/empresas/') !== -1 && document.querySelector(selectorSlug)) {
        port.postMessage({ tem_slug: true });
    }

    // Listens to messages from background.js
    port.onMessage.addListener(function (msg) {
        if (msg.send_me_slug) {
            var element = document.querySelector(selectorSlug);
            if (element) {
                window.console.log('sending slug');
                var slug = element.innerHTML.trim();
                port.postMessage({
                    slug: slug,
                    host: window.location.host,
                });
            }
            else {
                window.console.log('slug not found');
            }
        }

        if (msg.logar) {
            window.console.log('logar');
            document.getElementById('id_login').value = msg.login;
            document.getElementById('id_senha').value = msg.senha;
            document.getElementById('form').submit();
        }
    });
})();
