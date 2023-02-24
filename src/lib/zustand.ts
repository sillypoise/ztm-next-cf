import { create } from "zustand";

import { devtools, persist } from "zustand/middleware";
import { IStores } from "~/types/cofee_stores";

interface AppState {
    latlong: string;
    setLatlong: (latlong: string) => void;
    nearbyStores: IStores;
    setNearbyStores: (nearbyStores: IStores) => void;
}

let useAppStore = create<AppState>()(
    devtools(
        // persist(
        (set) => ({
            latlong: "",
            setLatlong: function (latlong: string) {
                return set({ latlong });
            },
            nearbyStores: [],
            setNearbyStores: function (nearbyStores: IStores) {
                return set({ nearbyStores });
            },
        }),
        {
            name: "app-store",
        }
        // )
    )
);

export { useAppStore };
