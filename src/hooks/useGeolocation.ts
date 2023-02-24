import { useEffect, useState } from "react";
import { useAppStore } from "~/lib/zustand";

function useGeolocation() {
    let [error, setError] = useState<GeolocationPositionError>();

    let setLatLong = useAppStore((state) => state.setLatlong);
    let latlong = useAppStore((state) => state.latlong);

    function onSuccess(position: GeolocationPosition) {
        let latlong = `${position.coords.latitude},${position.coords.longitude}`;
        setLatLong(latlong);
    }

    function onError(error: GeolocationPositionError) {
        setError(error);
    }

    function handleTrackLocation() {
        let geo = navigator.geolocation;

        if (!geo) {
            setError({
                code: 0,
                message: "Geolocation is not supported",
                PERMISSION_DENIED: 1,
                POSITION_UNAVAILABLE: 2,
                TIMEOUT: 3,
            });
            return;
        }

        geo.getCurrentPosition(onSuccess, onError);
    }

    return { handleTrackLocation, latlong, error };
}

export { useGeolocation };
