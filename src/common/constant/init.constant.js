import "dotenv/config";

export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT;
console.log({
    database_url: DATABASE_URL,
    port: PORT,
});
