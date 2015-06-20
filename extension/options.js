(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', function () {
		var formAdminUrl = document.getElementById('admin_url');
		var formEmail = document.getElementById('email');
        var formPassword = document.getElementById('password');
		var successMessage = document.getElementById('success_message');
		var successTimeout = null;

		function loadSettings() {
			formAdminUrl.value = MPLogin.settings.get('url_admin');
			formEmail.value = MPLogin.settings.get('login');
            formPassword.value = MPLogin.settings.get('senha');
		}

		loadSettings();

		document.getElementById('save').addEventListener('click', function () {
            var adminUrl = formAdminUrl.value;
            adminUrl = adminUrl.substring(0, 1) == '/' ? adminUrl : '/' + adminUrl;

			MPLogin.settings.set('url_admin', adminUrl);
            MPLogin.settings.set('login', formEmail.value);
            MPLogin.settings.set('senha', formPassword.value);

			loadSettings();

			clearTimeout(successTimeout);
			successMessage.classList.add('visible');
			successTimeout = setTimeout(function() {
				successMessage.classList.remove('visible');
			}, 3000);
		});

		document.getElementById('reset').addEventListener('click', function () {
			MPLogin.settings.reset();
			loadSettings();
		});
	});
})();
