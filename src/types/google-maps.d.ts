
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latLng: LatLng): void;
      setZoom(zoom: number): void;
      addListener(event: string, callback: Function): MapsEventListener;
    }
    
    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latLng: LatLng): void;
      addListener(event: string, callback: Function): MapsEventListener;
    }
    
    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }
    
    interface MapOptions {
      center?: LatLng;
      zoom?: number;
      streetViewControl?: boolean;
      mapTypeControl?: boolean;
      fullscreenControl?: boolean;
    }
    
    interface MarkerOptions {
      position: LatLng;
      map?: Map;
      title?: string;
      label?: string;
      icon?: string;
    }
    
    interface MapsEventListener {
      remove(): void;
    }
    
    interface MapMouseEvent {
      latLng: LatLng;
    }

    const event: {
      clearListeners(instance: object, eventName: string): void;
    };
  }
}
