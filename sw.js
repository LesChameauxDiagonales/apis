const staticAssets = [
	'./',
	'./main.js',
	'./manifest.json',
	'./wikipedia/index.html',
	'./wikipedia/main.js',
	'./meteo/index.html',
	'./meteo/main.css',
	'./meteo/main.js',
	'./map/images/campement-icon.png',
	'./map/images/marker-icon.png',
	'./map/images/marker-shadow.png',
	'./map/images/target-icon.png',
	'./map/index.html',
	'./map/leaflet.css',
	'./map/main.css',
	'./map/main.js',
	
];


self.addEventListener('install', async event=> {
	const cache = await caches.open('news-static');
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
	const cache = await caches.open('news-dynamic');
	try{
		const RES = await fetch(req);
		cache.put(req,RES.clone());
		return RES;
	}catch(error) {

		const cachedResponse = await cache.match(req);
		return cachedResponse || caches.match('./fallback.json');

	}
}