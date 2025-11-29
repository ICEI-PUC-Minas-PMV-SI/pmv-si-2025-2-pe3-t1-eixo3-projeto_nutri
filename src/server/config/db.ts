export const config = {
        host: process.env.NUTRI_DB_HOST,
        port: Number(process.env.NUTRI_DB_PORT),
        user: process.env.NUTRI_DB_USER,
        password: process.env.NUTRI_DB_PASSWORD,
        database: process.env.NUTRI_DB_NAME,
        ssl: process.env.NUTRI_DB_SSL === "true"
}