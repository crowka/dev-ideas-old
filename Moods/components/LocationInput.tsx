import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  onLocationChange: (location: string) => void;
  onCountryChange?: (country: string) => void;
}

export function LocationInput({ onLocationChange, onCountryChange }: Props) {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          
          if (data.address) {
            const city = data.address.city || data.address.town || data.address.village;
            const country = data.address.country;
            const locationString = city ? `${city}, ${country}` : country;
            
            setLocation(locationString);
            onLocationChange(locationString);
            if (onCountryChange && country) {
              onCountryChange(country);
            }
          }
        } catch (err) {
          console.error('Error getting location:', err);
          setError('Failed to get location details');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error('Error getting location:', err);
        setError('Location access denied. You can enter it manually.');
        setLoading(false);
      }
    );
  }, [onLocationChange, onCountryChange]);

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    onLocationChange(value);
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-600">
        <MapPin className="w-5 h-5 animate-pulse" />
        <span>Getting your location...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={location}
          onChange={handleManualInput}
          placeholder={error || "Enter your location"}
          className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}