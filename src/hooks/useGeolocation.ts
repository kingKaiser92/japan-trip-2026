"use client";

import { useState, useCallback, useEffect } from "react";

interface GeolocationState {
  position: { lat: number; lng: number } | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    error: null,
    loading: true,
  });

  const fetchPosition = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setState({ position: null, error: "Geolocation is not supported by your browser.", loading: false });
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setState({
          position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          error: null,
          loading: false,
        });
      },
      (err) => {
        let message = "Unable to get your location.";
        if (err.code === err.PERMISSION_DENIED) {
          message = "Location permission was denied.";
        } else if (err.code === err.TIMEOUT) {
          message = "Location request timed out.";
        }
        setState({ position: null, error: message, loading: false });
      },
      {
        enableHighAccuracy: true,
        timeout: 10_000,
        maximumAge: 60_000,
      }
    );
  }, []);

  useEffect(() => {
    fetchPosition();
  }, [fetchPosition]);

  return { ...state, refresh: fetchPosition };
}
