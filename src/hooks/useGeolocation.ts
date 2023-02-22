import { useEffect, useState } from "react";

function useGeolocation() {
    let [position, setPosition] = useState<GeolocationPosition>();
    let [error, setError] = useState<GeolocationPositionError>();
    let [loading, setLoading] = useState<boolean>(false);

    function onSuccess(position: GeolocationPosition) {
        setPosition(position);
        setLoading(false);
    }

    function onError(error: GeolocationPositionError) {
        setError(error);
        setLoading(false);
    }

    function handleTrackLocation() {
        setLoading(true);
        let geo = navigator.geolocation;

        if (!geo) {
            setError({
                code: 0,
                message: "Geolocation is not supported",
                PERMISSION_DENIED: 1,
                POSITION_UNAVAILABLE: 2,
                TIMEOUT: 3,
            });
            setLoading(false);
            return;
        }

        geo.getCurrentPosition(onSuccess, onError);
    }

    return { handleTrackLocation, position, error, loading };
}

export { useGeolocation };
