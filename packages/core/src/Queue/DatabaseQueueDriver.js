import {container} from "@fusion.io/container";
import {Database} from "../Contracts";

export default class DatabaseQueueDriver {

    constructor(connection) {
        this.connection = connection;
        this.tableName  = 'fusion_jobs';
    }

    setTableName(tableName) {
        this.tableName = tableName;

        return this;
    }

    async dispatch({jobName, payload}) {
        await this.connection
            .table(this.tableName)
            .insert({
                jobName,
                payload: JSON.stringify({jobName, payload}),
                createdAt: Date.now(),
                pulledAt: null,
                executedAt: null,
                failedAt: null
            })
        ;
    }

    pull(callback) {
        (async connection => {
            const job = await connection
                .from(this.tableName)
                .where({ pulledAt: null })
                .orderBy('createdAt')
                .select()
                .first()
            ;

            if (job) {
                await connection
                    .where({id: job.id})
                    .update({pulledAt: Date.now()})
                    .from(this.tableName)
                ;

                try {
                    await callback(JSON.parse(job['payload']));
                    await connection
                        .where({id: job.id})
                        .update({executedAt: Date.now()})
                        .from(this.tableName)
                } catch (e) {
                    await connection
                        .where({id: job.id})
                        .from(this.tableName)
                        .update({failedAt: Date.now()})
                    ;
                }
            }
        })(this.connection)
        .then(() => {
            this.pull(callback);
        });
    }

    static install(adapter, manager) {
        const dbm = container.make(Database);
        const {tableName, connection} = manager.configOf(adapter);

        return new DatabaseQueueDriver(dbm.connection(connection)).setTableName(tableName);
    }
}
