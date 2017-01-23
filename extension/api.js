(function () {
    'use strict';

    window.MPLogin = (function(){
        var defaults = {
            host: 'app.meuspedidos.com.br',
            url_base: 'https://app.meuspedidos.com.br/',
            url_admin: '',
            login: '',
            senha: ''
        };

        var api = {
            settings: {
                get: function (name) {
                    var item = localStorage.getItem(name);
                    if (item === null) {
                        return ({}.hasOwnProperty.call(defaults, name) ? defaults[name] : void 0);
                    } else if (item === 'true' || item === 'false') {
                        return (item === 'true');
                    }
                    return item;
                },
                set: localStorage.setItem.bind(localStorage),
                reset: function () {
                    Object.keys(localStorage).forEach(api.settings.revert);
                },
                revert: localStorage.removeItem.bind(localStorage)
            },
            getUrl: function(slug) {
                return defaults.url_base + slug + api.settings.get('url_admin');
            }
        };

        return api;
    })();

})();
