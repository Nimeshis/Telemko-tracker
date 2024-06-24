import { useEffect } from "react";
import { useId } from "react";
import { map } from "./core/MapView"; // Assuming 'map' is your mapping library instance

const MapMarkers = ({ markers }) => {
  const id = useId();

  useEffect(() => {
    // Check if the map source exists, if not, add it
    if (!map.getSource(id)) {
      map.addSource(id, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
    }

    // Add or update the marker layer
    map.addLayer({
      id,
      type: "symbol",
      source: id,
      layout: {
        "icon-image": "",
        "icon-size": 1.0,
        "icon-allow-overlap": true,
      },
      paint: {
        // Customize marker color here
        "icon-color": "blue",
      },
    });

    // Clean up function
    return () => {
      if (map.getLayer(id)) {
        map.removeLayer(id);
      }
      if (map.getSource(id)) {
        map.removeSource(id);
      }
    };
  }, [markers, id]);

  // Update marker data when markers change
  useEffect(() => {
    if (map.getSource(id)) {
      map.getSource(id).setData({
        type: "FeatureCollection",
        features: markers.map(({ latitude, longitude, color }) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          properties: {
            image: "marker", // Assuming your marker images are named like 'red-marker', 'blue-marker', etc.
            color: color || "blue", // Default color if not provided
          },
        })),
      });
    }
  }, [markers, id]);

  return null;
};

export default MapMarkers;
