(function() {
	var ajax = (function() {
        var call = function(url, method, params, callback) {
                var r = new XMLHttpRequest();
                r.open(method, url, true);
                r.onreadystatechange = function () {
                        if (r.readyState != 4 || r.status != 200) return;
                        callback(r);
                };
                r.send(params);                
        }
        return {
                get: function(url, callback) {
                        call(url, 'GET', '', callback);
                },
                post: function(url, params, callback) {
                        call(url, 'POST', params, callback);
                },
                put: function(url, params, callback) {
                        call(url, 'PUT', params, callback);
                }
        };
	})();
	var populate = function(html) {
		document.getElementsByTagName('body')[0].innerHTML = html;
	};
	var strikeWithVengeance = function(animal, enemy) {
		populate('<h1>'+animal.toUpperCase()+'S LAUNCHED!</h1><h3>........</h3><h2 id="dmg"></h2><a href data-route="home">Home</a>');
		setTimeout(function() {
			document.getElementById('dmg').innerHTML = 'Your '+animal+' does '+parseInt(Math.random()*1000)+' damage against '+enemy+'!';
		}, 3000);
	};
	var loadPage = function(route) {
		if(route === 'google') {
			populate('<a href data-route="cow">Launch cows at Yahoo!</a><br><a href data-route="home">Home</a><br>');
		} else if (route === 'yahoo') {
			populate('<a href data-route="pig">Launch pigs at Google</a><br><a href data-route="home">Home</a><br>');
		} else if (route === 'cow') {
			strikeWithVengeance('cow', 'Yahoo!');
		} else if (route === 'pig') {
			strikeWithVengeance('pig', 'Google');			
		} else {
			document.getElementsByTagName('body')[0].innerHTML = '<a href data-route="google">Load google\'s internets</a><br><a href data-route="yahoo">Load Yahoo\'s internets instead</a><br><br>';
		}
		attachEvents();
	};
	var routeTo = function(route) {
		history.pushState({route: route}, route, "@"+route);
		loadPage(route);
	};
	window.onpopstate = function(a) {
		if(a.state) {
			loadPage(a.state);
		}
	};
	var attachEvents = function() {
		var a = document.getElementsByTagName("a");
		for (var i = 0; i < a.length; i++) {
			a[i].addEventListener('click', function(el) {
				routeTo(el.srcElement.getAttribute('data-route'));
				el.preventDefault();
			});
		}
	};
	loadPage('home');
})();