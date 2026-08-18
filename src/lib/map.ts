// Map provider abstraction.
//
// The MapSection component is intentionally provider-agnostic: it calls
// getStaticMapUrl() / getEmbedUrl() below rather than hard-coding a
// specific map vendor. To switch providers in the future (Google Maps,
// Mapbox, OpenStreetMap), implement the functions here — no component
// changes required.

export type MapProvider = "osm" | "google" | "mapbox";

export const activeMapProvider: MapProvider = "osm";

export interface MapCoordinates {
  lat: number;
  lng: number;
  zoom?: number;
}

// Verified village location: Ban Kab Krabue, Khok Sa-at Subdistrict,
// Prasat District, Surin 32140, Thailand.
// Public place listing coordinates: 14.52646, 103.36005.
export const villageCoordinates: MapCoordinates = {
  lat: 14.52646,
  lng: 103.36005,
  zoom: 15,
};

/**
 * Returns an embeddable map URL for the active provider. Currently wired
 * to OpenStreetMap's free embed (no API key required) so the map works
 * out of the box. Swap the implementation to Google Maps or Mapbox by
 * adding a case below — MapSection does not need to change.
 */
export function getEmbedUrl(coords: MapCoordinates = villageCoordinates): string {
  const { lat, lng, zoom = 13 } = coords;
  const delta = 0.15 / Math.max(zoom / 10, 1);
  const bbox = [lng - delta, lat - delta, lng + delta, lat + delta].join("%2C");

  switch (activeMapProvider) {
    case "osm":
    default:
      return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  }
}

export function getDirectionsUrl(coords: MapCoordinates = villageCoordinates): string {
  return `https://www.openstreetmap.org/directions?to=${coords.lat}%2C${coords.lng}`;
}
