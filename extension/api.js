(function () {
    'use strict';

    window.MPLogin = (function(){
        var defaults = {
            host: 'meuspedidos.com.br',
            url_base: 'https://meuspedidos.com.br/',
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
            }
        };

        return api;
    })();

})();
