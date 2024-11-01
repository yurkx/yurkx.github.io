// Initial coordinates for your location
const initialCoords = [48.92829842690129, 24.737009841239622];

// Initialize the map centered on your location
const map = L.map('map').setView(initialCoords, 13);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add initial marker at your location with a pop-up
let marker = L.marker(initialCoords)
  .addTo(map)
  .bindPopup(`Initial Location:<br>Lat: ${initialCoords[0]}, Lng: ${initialCoords[1]}`)
  .openPopup();

// Function to add a new marker with coordinates and timestamp
function addMarker(coords) {
  const timestamp = new Date().toLocaleString();
  L.marker(coords)
    .addTo(map)
    .bindPopup(`Lat: ${coords[0]}, Lng: ${coords[1]}<br>Time: ${timestamp}`)
    .openPopup();
}

// Track location changes and add markers for new locations
if (navigator.geolocation) {
  navigator.geolocation.watchPosition(position => {
    const newCoords = [position.coords.latitude, position.coords.longitude];
    addMarker(newCoords);
  }, error => {
    console.error("Error watching location:", error);
  });
} else {
  alert("Geolocation is not supported by your browser.");
}

// Scroll to the destination based on user-input coordinates
function scrollToDestination() {
  const lat = parseFloat(document.getElementById('destination-lat').value);
  const lng = parseFloat(document.getElementById('destination-lng').value);
  
  if (isNaN(lat) || isNaN(lng)) {
    alert("Please enter valid coordinates.");
    return;
  }
  
  map.setView([lat, lng], 13);
  L.marker([lat, lng]).addTo(map).bindPopup(`Destination:<br>Lat: ${lat}, Lng: ${lng}`).openPopup();
}