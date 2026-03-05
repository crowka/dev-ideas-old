import { useState, useEffect } from 'react';

interface GeolocationState {
  location: string | null;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    location: null,
    error: null,
    loading: true
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState({
        location: null,
        error: "Geolocation is not supported by your browser",
        loading: false
      });
      return;
    }

    const getLocationName = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_OPENCAGE_API_KEY`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          const { city, country } = data.results[0].components;
          return city && country ? `${city}, ${country}` : country || "Location found";
        }
        return "Location found";
      } catch (error) {
        console.error("Error getting location name:", error);
        return "Location found";
      }
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const locationName = await getLocationName(latitude, longitude);
        setState({
          location: locationName,
          error: null,
          loading: false
        });
      },
      (error) => {
        let errorMessage = "Unable to get your location";
        if (error.code === 1) {
          errorMessage = "Location access denied. You can set it manually.";
        }
        setState({
          location: null,
          error: errorMessage,
          loading: false
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  }, []);

  return state;
}