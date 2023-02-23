import { z } from "zod";
const stages = ["production", "development"] as const;

type Stage = (typeof stages)[number];

function getStage(stages: Stage[]) {
    if (!stages.length) return "production";

    for (const stage of stages) {
        // if any of the provided stages is production, assume we are in production
        if (stage === "production") {
            return stage;
        }
    }

    return stages[0];
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

function isStage(potentialStage: string): potentialStage is Stage {
    return stages.includes(potentialStage as Stage);
}

const stage = getStage(
    [process.env.NODE_ENV, process.env.APP_ENV].filter(notEmpty).filter(isStage)
);

function envToBool(value: string | undefined) {
    if (!value) {
        return false;
    }

    return ["true", "TRUE", "1"].includes(value);
}

function envToStr(value: string | undefined, defaultValue = "") {
    return value === undefined ? defaultValue : value;
}

function envToNumber(value: string | undefined, defaultValue: number): number {
    const numValue =
        value === undefined || value === "" ? defaultValue : Number(value);

    return isNaN(numValue) ? defaultValue : numValue;
}

let configSchema = z.object({
    stage: z.enum(stages),
    // ci: z{},
    // api: z{},
    // database: z.object({
    //     postgres: z.object({
    //         user: z.string(),
    //         password: z.string(),
    //         db: z.string(),
    //         host: z.string(),
    //         uri: z.string(),
    //         port: z.number(),
    //         // shouldMigrate: Boolean
    //     }),
    // }),
    services: z.object({
        foursquare: z.object({
            auth: z.string(),
        }),
    }),
    // sentry,
    // git: z.object({
    //     commit: z.string().optional(),
    // }),
});

export let config = configSchema.parse({
    stage,
    services: {
        foursquare: {
            auth: envToStr(process.env.FSQ_PLACES_API_KEY),
        },
    },
});
