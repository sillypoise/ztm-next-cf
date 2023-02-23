import { useEffect, useState } from "react";

function useGeolocation() {
    let [position, setPosition] = useState<GeolocationPosition>();
    let [error, setError] = useState<GeolocationPositionError>();

    function onSuccess(position: GeolocationPosition) {
        setPosition(position);
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

    return { handleTrackLocation, position, error };
}

export { useGeolocation };
