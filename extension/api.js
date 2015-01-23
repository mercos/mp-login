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
                    // não entendi ainda como funcionam
                    Object.keys(localStorage).forEach(api.settings.revert);
                },
                revert: localStorage.removeItem.bind(localStorage)
            }
        };

        return api;
    })();

    // window.GitHubNotify = (function () {
    //  var defaults = {
    //      notificationUrl: 'https://github.com/notifications',
    //      useParticipatingCount: false
    //  };

    //  var api = {
    //      settings: {
    //          get: function (name) {
    //              var item = localStorage.getItem(name);
    //              if (item === null) {
    //                  return ({}.hasOwnProperty.call(defaults, name) ? defaults[name] : void 0);
    //              } else if (item === 'true' || item === 'false') {
    //                  return (item === 'true');
    //              }
    //              return item;
    //          },
    //          set: localStorage.setItem.bind(localStorage),
    //          reset: function () {
    //              Object.keys(localStorage).forEach(api.settings.revert);
    //          },
    //          revert: localStorage.removeItem.bind(localStorage)
    //      }
    //  };

    //  return api;
    // })();

    // window.gitHubNotifCount = function (callback) {
    //  var tmp = document.createElement('div');

    //  xhr('GET', GitHubNotify.settings.get('notificationUrl'), function (data, status) {
    //      if (status >= 400) {
    //          callback(-1);
    //          return;
    //      }

    //      tmp.innerHTML = data;

    //      var participating = (GitHubNotify.settings.get('useParticipatingCount'))
    //          ? '/participating'
    //          : '';
    //      var countElem = tmp.querySelector('a[href="/notifications' + participating + '"] .count');
    //      if (countElem) {
    //          callback(countElem.textContent !== '0' ? countElem.textContent : '');
    //      } else {
    //          callback(-2);
    //      }
    //  });
    // };
})();
