
import React, { useEffect, useRef, useState } from 'react';

interface Marker {
  id: string;
  position: { lat: number; lng: number };
  label?: string;
  title?: string;
  icon?: string;
  onClick?: () => void;
}

interface GoogleMapProps {
  center: { lat: number; lng: number };
  zoom?: number;
  markers?: Marker[];
  onClick?: (event: google.maps.MapMouseEvent) => void;
  onMarkerClick?: (markerId: string) => void;
  className?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  center,
  zoom = 12,
  markers = [],
  onClick,
  onMarkerClick,
  className = '',
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [googleMarkers, setGoogleMarkers] = useState<google.maps.Marker[]>([]);

  // Initialize the map
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Check if Google Maps API is loaded
    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps API not loaded');
      return;
    }
    
    const newMap = new google.maps.Map(mapRef.current, {
      center,
      zoom,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    });
    
    if (onClick) {
      newMap.addListener('click', onClick);
    }
    
    setMap(newMap);
    
    return () => {
      if (map && onClick) {
        google.maps.event.clearListeners(map, 'click');
      }
    };
  }, [mapRef, onClick]);
  
  // Update center and zoom when props change
  useEffect(() => {
    if (map) {
      map.setCenter(center);
      map.setZoom(zoom);
    }
  }, [center, zoom, map]);
  
  // Handle markers
  useEffect(() => {
    if (!map) return;
    
    // Check if Google Maps API is loaded
    if (typeof google === 'undefined' || !google.maps) {
      console.error('Google Maps API not loaded');
      return;
    }
    
    // Clear existing markers
    googleMarkers.forEach(marker => marker.setMap(null));
    
    // Create new markers
    const newGoogleMarkers = markers.map(marker => {
      const newMarker = new google.maps.Marker({
        position: marker.position,
        map,
        title: marker.title,
        label: marker.label,
        icon: marker.icon,
      });
      
      if (onMarkerClick) {
        newMarker.addListener('click', () => onMarkerClick(marker.id));
      } else if (marker.onClick) {
        newMarker.addListener('click', marker.onClick);
      }
      
      return newMarker;
    });
    
    setGoogleMarkers(newGoogleMarkers);
    
    return () => {
      newGoogleMarkers.forEach(marker => marker.setMap(null));
    };
  }, [map, markers, onMarkerClick]);
  
  return <div ref={mapRef} className={`map-container ${className}`} />;
};

export default GoogleMap;
