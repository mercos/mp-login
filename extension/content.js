'use strict';

// Opens a port to communicate messages
var port = chrome.runtime.connect({name: "channel"});

// Sends a message to background.js
// mandar o slug por aqui

var tittle_letter = document.title[0];
port.postMessage({numero: tittle_letter});


// Listens to messages from main.js
port.onMessage.addListener(function(msg) {
    if (msg.send) {
    	tittle_letter = document.title[0];
    	var element = document.querySelector('#main h2.text-transparent small');
    	if (element) {
    		var slug = element.innerHTML.trim();
    	}
    	port.postMessage({numero: tittle_letter, open_window: true, slug: slug});
    }
});
