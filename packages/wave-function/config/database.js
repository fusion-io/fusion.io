module.exports = {
    default: "sqlite",
    connections: {
        sqlite: {
            client: "sqlite3",
            connection: __dirname + "/../storage/db.sqlite",
            useNullAsDefault: true
        }
    }
};
