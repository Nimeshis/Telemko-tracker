import maplibregl from "maplibre-gl";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { usePreference } from "../../common/util/preferences";
import { map } from "../core/MapView";
import axios from "axios";

const MapDefaultCamera = () => {
  const selectedDeviceId = useSelector((state) => state.devices.selectedId);
  const positions = useSelector((state) => state.session.positions);

  const defaultLatitude = usePreference("latitude");
  const defaultLongitude = usePreference("longitude");
  const defaultZoom = usePreference("zoom", 0);

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (selectedDeviceId) {
      setInitialized(true);
    } else if (!initialized) {
      if (defaultLatitude && defaultLongitude) {
        map.jumpTo({
          center: [defaultLongitude, defaultLatitude],
          zoom: defaultZoom,
        });
        setInitialized(true);
      } else {
        const coordinates = Object.values(positions).map((item) => [
          item.longitude,
          item.latitude,
        ]);
        console.log(coordinates);
        const postCoordinates = async () => {
          try {
            const response = await axios.post(
              "http://108.181.195.185:3000/locations",
              {
                longitude: item.longitude,
                latitude: item.latitude,
              }
            );
            console.log("Coordinate posted successfully:", response.data);
          } catch (error) {
            console.error("Error posting coordinate:", error);
          }
        };

        const logAndPostCoordinates = () => {
          console.log(coordinates);
          postCoordinates();
        };

        logAndPostCoordinates();
        const intervalId = setInterval(logAndPostCoordinates, 10000);

        return () => clearInterval(intervalId);
        if (coordinates.length > 1) {
          const bounds = coordinates.reduce(
            (bounds, item) => bounds.extend(item),
            new maplibregl.LngLatBounds(coordinates[0], coordinates[1])
          );
          const canvas = map.getCanvas();
          map.fitBounds(bounds, {
            duration: 0,
            padding: Math.min(canvas.width, canvas.height) * 0.1,
          });
          setInitialized(true);
        } else if (coordinates.length) {
          const [individual] = coordinates;
          map.jumpTo({
            center: individual,
            zoom: Math.max(map.getZoom(), 10),
          });
          setInitialized(true);
        }
      }
    }
  }, [
    selectedDeviceId,
    initialized,
    defaultLatitude,
    defaultLongitude,
    defaultZoom,
    positions,
  ]);

  return null;
};

export default MapDefaultCamera;
