mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: campgrounds.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
});

new mapboxgl.Marker()
  .setLngLat(campgrounds.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h5>${campgrounds.title}</h5><p>${campgrounds.location}</p>`
    )
  )
  .addTo(map);
