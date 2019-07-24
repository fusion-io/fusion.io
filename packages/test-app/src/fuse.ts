import {plasma as http} from "@fusion.io/http";
import {plasma as database} from "@fusion.io/database";
import {plasma as app} from "./app";
import {Tokamak} from "@fusion.io/core";

const application = new Tokamak({
    database: {
        use: 'test',
        connections: {
            test: {
                client: 'sqlite3',
                connection: {
                    filename: __dirname + "/mydb.sqlite"
                }
            },
            test2: {

            }
        }
    }
});

export default application
    .fuse(database)
    .fuse(http)
    .fuse(app)
;
