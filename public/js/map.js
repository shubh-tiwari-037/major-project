


	// let mapToken = mapToken;
    // console.log(mapToken);
    mapboxgl.accessToken = mapToken;
	// mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

    console.log(coordinates);

    const marker = new mapboxgl.marker()
    .setLngLst(coordinates) //Listing.geometry
    .addTo(map);