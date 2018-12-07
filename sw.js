const staticAssets = [
	'./',
	'./main.js',
	'./manifest.json',
	'./checklist.js',
	'./explorer.html',
	'./index.html',
	'./index.js',
	'./leaflet.css',
	'./map.js',
	'./station.html',
	'./station.js',
	'./style.css',
	'./style.css.map',
	'./wikipedia/index.html',
	'./wikipedia/main.js',
	'./js/jquery.min.js',
	'./js/leaflet.js',
	'./meteo/index.html',
	'./meteo/main.css',
	'./meteo/main.js',
	'./map/images/campement-icon.png',
	'./map/images/marker-icon.png',
	'./map/images/marker-shadow.png',
	'./map/images/target-icon.png',
	'./map/index.html',
	'./map/leaflet.css',
	'./map/leaflet.js',
	'./map/main.css',
	'./map/main.js',
	'./map/map.js',
	'./images/background.png',
	'./images/calendar.png',	
	'./images/camera.png',	
	'./images/campement-icon.png',	
	'./images/explorer.png',	
	'./images/hearth.png',	
	'./images/home.png',	
	'./images/map.png',
	'./images/marker-icon.png',
	'./images/search.png',	
	'./images/target-icon.png',	
	'./images/windstorm.png',	
	'./images/map.png',	
];


self.addEventListener('install', async event=> {
	const cache = await caches.open('register-static');
	cache.addAll(staticAssets);
});


self.addEventListener('fetch', event => {
	const req = event.request;
	const url = new URL(req.url);

	if(url.origin == location.origin){
		event.respondWith(cacheFirst(req))
	}
	else{
		event.respondWith(networkFirst(req));
	}
	
});

async function cacheFirst(req) {
	const cachedResponse = await caches.match(req);
	return cachedResponse || fetch(req);
}

async function networkFirst(req) {
	const cache = await caches.open('register-dynamic');
	try{
		const RES = await fetch(req);
		cache.put(req,RES.clone());
		return RES;
	}catch(error) {

		const cachedResponse = await cache.match(req);
		return cachedResponse || caches.match('./fallback.json');

	}
}