'use strict';

// Opens a port to communicate messages
var port = chrome.runtime.connect({name: "channel"});

// Sends a message to background.js
// port.postMessage({});

if (window.location.host.indexOf('meuspedidos.com.br') !== -1
    && window.location.pathname.indexOf('/admin/') !== -1
    && !document.querySelector('ul.motivos')
    &&  document.getElementById('id_login')
    &&  document.getElementById('id_senha')
    &&  document.getElementById('form')) {

    port.postMessage({pode_logar: true});
}
else if (window.location.host.indexOf('meuspedidos.com.br') !== -1
    && window.location.pathname.indexOf('/empresas/') !== -1
    && document.querySelector('#main h2.text-transparent small')) {

    port.postMessage({tem_slug: true});
}
// else {
//  // mandar msg de ok?
//  port.postMessage({ok: true});
// }

// Listens to messages from main.js
port.onMessage.addListener(function (msg) {
    if (msg.send_me_slug) {
        var element = document.querySelector('#main h2.text-transparent small');
        if (element) {
            window.console.log('enviando slug');
            var slug = element.innerHTML.trim();
            port.postMessage({slug: slug});
        }
        else {
            window.console.log('slug não encontrado');
        }
    }

    if (msg.logar) {
        window.console.log('logar');
        document.getElementById('id_login').value = msg.login;
        document.getElementById('id_senha').value = msg.senha;
        document.getElementById('form').submit();
    }
});
