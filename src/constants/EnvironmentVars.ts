export default {
    ENVIRONMENT: process.env.ENV || "DEV",
    SESSION: {
        ACTIVE: process.env.USE_SESSION || false,
        SECRET: process.env.SESSION_SECRET || "S3CrEtSesSiOn"
    }
} as const;