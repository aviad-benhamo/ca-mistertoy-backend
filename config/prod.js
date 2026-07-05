const { MONGO_URL } = process.env

if (!MONGO_URL) {
    throw new Error('MONGO_URL is required when NODE_ENV=production')
}

export default {
    dbURL: MONGO_URL,
    dbName: process.env.MONGO_DB_NAME || 'MisterToyDB',
}
