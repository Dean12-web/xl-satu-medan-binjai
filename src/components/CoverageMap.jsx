import { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ZoomIn, ZoomOut } from 'lucide-react';

export default function CoverageMap({ 
  userCoords, // { lat: number, lng: number } | null
  onLocationSelect 
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const userMarkerRef = useRef(null);
  const userCircleRef = useRef(null);

  // Helper to place/update single User Pin
  const setUserPin = useCallback((lat, lng, flyTo = true) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clean previous markers
    if (userMarkerRef.current) {
      map.removeLayer(userMarkerRef.current);
      userMarkerRef.current = null;
    }
    if (userCircleRef.current) {
      map.removeLayer(userCircleRef.current);
      userCircleRef.current = null;
    }

    // User pin icon
    const userPinIcon = L.divIcon({
      className: 'custom-map-marker user-selected-marker',
      html: `
        <div class="user-target-pin">
          <div class="target-radar"></div>
          <div class="target-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff" stroke="#164391" stroke-width="2.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
              <circle cx="12" cy="9" r="2.5" fill="#164391"/>
            </svg>
          </div>
          <div class="target-label">Lokasi Anda</div>
        </div>
      `,
      iconSize: [40, 52],
      iconAnchor: [20, 48]
    });

    const userMarker = L.marker([lat, lng], {
      icon: userPinIcon,
      draggable: true,
      zIndexOffset: 1000
    }).addTo(map);

    // Draggable update
    userMarker.on('dragend', (evt) => {
      const newPos = evt.target.getLatLng();
      if (userCircleRef.current) {
        userCircleRef.current.setLatLng(newPos);
      }
      if (onLocationSelect) {
        onLocationSelect({
          lat: newPos.lat,
          lng: newPos.lng,
          coordsStr: `Lat: ${newPos.lat.toFixed(6)}, Long: ${newPos.lng.toFixed(6)}`
        });
      }
    });

    // Accuracy / connection radius
    const userCircle = L.circle([lat, lng], {
      radius: 120,
      color: '#00A388',
      fillColor: '#00c7b5',
      fillOpacity: 0.18,
      weight: 1.5
    }).addTo(map);

    userMarkerRef.current = userMarker;
    userCircleRef.current = userCircle;

    if (flyTo) {
      map.flyTo([lat, lng], 15, { duration: 1.2 });
    }
  }, [onLocationSelect]);

  // Initialize Clean Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center Medan - Binjai
    const defaultCenter = [3.5952, 98.6722];
    const defaultZoom = 12;

    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      zoomControl: false,
      attributionControl: true,
      maxZoom: 18,
      minZoom: 9
    });

    // Official OpenStreetMap tiles (100% Free & No API key needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    // Click on map to set user pin
    map.on('click', (e) => {
      setUserPin(e.latlng.lat, e.latlng.lng, false);
      if (onLocationSelect) {
        onLocationSelect({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          coordsStr: `Lat: ${e.latlng.lat.toFixed(6)}, Long: ${e.latlng.lng.toFixed(6)}`
        });
      }
    });

    // Resize invalidate
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [onLocationSelect, setUserPin]);

  // Sync with userCoords prop (when "Lokasi Saya" button is clicked)
  useEffect(() => {
    if (userCoords && userCoords.lat && userCoords.lng) {
      setUserPin(userCoords.lat, userCoords.lng, true);
    }
  }, [userCoords, setUserPin]);

  return (
    <div className="coverage-map-wrapper minimal-map-wrapper">
      <div className="map-viewport-container" style={{ height: '360px' }}>
        <div ref={mapContainerRef} className="leaflet-map-canvas" />

        {/* Floating Zoom Buttons */}
        <div className="map-floating-controls">
          <div className="map-zoom-buttons">
            <button
              type="button"
              className="map-float-btn zoom-btn"
              onClick={() => mapInstanceRef.current?.zoomIn()}
              title="Perbesar Peta"
            >
              <ZoomIn size={18} />
            </button>
            <button
              type="button"
              className="map-float-btn zoom-btn"
              onClick={() => mapInstanceRef.current?.zoomOut()}
              title="Perkecil Peta"
            >
              <ZoomOut size={18} />
            </button>
          </div>
        </div>

        {/* Subtle Hint */}
        <div className="map-interaction-hint">
          📍 Klik "Lokasi Saya" atau klik titik pada peta untuk menetapkan koordinat
        </div>
      </div>
    </div>
  );
}
