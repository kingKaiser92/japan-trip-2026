"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapMarker {
  lat: number;
  lng: number;
  label: string;
  time: string;
  category: string;
  index: number;
}

interface TripMapProps {
  markers: MapMarker[];
  className?: string;
  userPosition?: { lat: number; lng: number } | null;
}

// Category to color mapping
function getCategoryColor(category: string): string {
  switch (category) {
    case "food":
      return "#f97316"; // orange
    case "shopping":
      return "#a78bfa"; // purple
    case "sightseeing":
      return "#38bdf8"; // sky blue
    case "hotel":
      return "#4ade80"; // green
    case "transport":
      return "#facc15"; // yellow
    case "nightlife":
      return "#f472b6"; // pink
    default:
      return "#e8a0bf"; // cherry-ish default
  }
}

export function TripMap({ markers, className = "", userPosition }: TripMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || markers.length === 0) return;

    // Clean up previous map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Calculate center from markers
    const avgLat = markers.reduce((sum, m) => sum + m.lat, 0) / markers.length;
    const avgLng = markers.reduce((sum, m) => sum + m.lng, 0) / markers.length;

    // Create map
    const map = L.map(mapRef.current, {
      center: [avgLat, avgLng],
      zoom: 13,
      zoomControl: false,
      attributionControl: false,
    });

    // Add zoom control to top-right
    L.control.zoom({ position: "topright" }).addTo(map);

    // Dark-themed map tiles (CartoDB Dark Matter)
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      {
        maxZoom: 19,
      }
    ).addTo(map);

    // Add attribution in bottom-right
    L.control
      .attribution({ position: "bottomright" })
      .addAttribution(
        '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
      )
      .addTo(map);

    // Draw route line connecting all markers
    if (markers.length > 1) {
      const routeCoords: L.LatLngExpression[] = markers.map((m) => [
        m.lat,
        m.lng,
      ]);
      L.polyline(routeCoords, {
        color: "#e8a0bf",
        weight: 2.5,
        opacity: 0.5,
        dashArray: "8, 8",
      }).addTo(map);
    }

    // Add markers
    markers.forEach((m) => {
      const color = getCategoryColor(m.category);
      const isFirstOrLast =
        m.index === 0 || m.index === markers.length - 1;
      const size = isFirstOrLast ? 28 : 22;

      // Custom numbered marker
      const icon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: ${color};
          border: 2px solid rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: ${isFirstOrLast ? 12 : 10}px;
          font-weight: 700;
          color: #1a1a1a;
          box-shadow: 0 2px 8px rgba(0,0,0,0.4);
        ">${m.index + 1}</div>`,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
      });

      L.marker([m.lat, m.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: serif; min-width: 160px;">
            <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin-bottom: 4px;">${m.time}</div>
            <div style="font-size: 14px; font-weight: 600; color: #1a1a1a;">${m.label}</div>
          </div>`,
          {
            className: "trip-popup",
            closeButton: false,
          }
        );
    });

    // Add user position marker (pulsing blue dot)
    if (userPosition) {
      const userIcon = L.divIcon({
        className: "custom-marker",
        html: `<div style="
          position: relative;
          width: 16px;
          height: 16px;
        ">
          <div style="
            position: absolute;
            inset: -6px;
            border-radius: 50%;
            background: rgba(59, 130, 246, 0.2);
            animation: pulse-ring 2s ease-out infinite;
          "></div>
          <div style="
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #3b82f6;
            border: 3px solid #fff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
          "></div>
        </div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      L.marker([userPosition.lat, userPosition.lng], { icon: userIcon, zIndexOffset: 1000 })
        .addTo(map)
        .bindPopup(
          `<div style="font-family: serif; font-size: 14px; font-weight: 600; color: #1a1a1a;">You are here</div>`,
          { className: "trip-popup", closeButton: false }
        );
    }

    // Fit bounds to show all markers (+ user position)
    const allPoints: L.LatLngExpression[] = markers.map((m) => [m.lat, m.lng]);
    if (userPosition) allPoints.push([userPosition.lat, userPosition.lng]);
    if (allPoints.length > 1) {
      const bounds = L.latLngBounds(allPoints);
      map.fitBounds(bounds, { padding: [40, 40] });
    }

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [markers, userPosition]);

  return (
    <div
      ref={mapRef}
      className={`rounded-xl overflow-hidden ${className}`}
      style={{ height: "400px", width: "100%" }}
    />
  );
}
