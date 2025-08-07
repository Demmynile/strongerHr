"use client";

import mapboxgl from "mapbox-gl";
import { useEffect, useRef } from "react";

// ✅ Replace this with your actual Mapbox token
mapboxgl.accessToken = `${process.env.YOUR_MAPBOX_ACCESS_TOKEN}`;

// Define proper types
type Country = {
  name: string;
  coordinates: [number, number]; // Longitude, Latitude
};

const countries: Country[] = [
  { name: "USA", coordinates: [-98.35, 39.5] },
  { name: "India", coordinates: [78.9629, 20.5937] },
  { name: "Germany", coordinates: [10.4515, 51.1657] },
  { name: "Brazil", coordinates: [-51.9253, -14.235] },
  { name: "Nigeria", coordinates: [8.6753, 9.082] },
];

export default function MapSection() {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [10, 20], // Initial center
      zoom: 1.3,
    });

    // Add markers for each country
    countries.forEach((country) => {
      new mapboxgl.Marker()
        .setLngLat(country.coordinates)
        .setPopup(new mapboxgl.Popup().setText(country.name))
        .addTo(map);
    });

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        Map: Countries of Origin
      </h2>
      <div
        ref={mapContainerRef}
        className="w-full h-96 rounded-md"
        style={{ border: "1px solid #e5e7eb" }}
      />
    </div>
  );
}
