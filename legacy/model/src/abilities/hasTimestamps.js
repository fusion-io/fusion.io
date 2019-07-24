import DateTime from "./../types/moment";
import moment from "moment";
import Timestamps from "./../extensions/Timestamps";

export default ({createdAtColumn, updatedAtColumn} = {createdAtColumn: 'createdAt', updatedAtColumn: 'updatedAt'}) => Model =>
    class extends Model {
        static get queryBuilderExtensions() {
            return [
                ...Model.queryBuilderExtensions,
                Timestamps({createdAtColumn, updatedAtColumn})
            ];
        }

        static get typeCastings() {
            return [
                ...Model.typeCastings,
                {key: createdAtColumn, caster: DateTime},
                {key: updatedAtColumn, caster: DateTime}
            ];
        }

        async $beforeInsert(queryContext) {
            const thisMoment = moment();

            await super.$beforeInsert(queryContext);
            this[createdAtColumn] = thisMoment;
            this[updatedAtColumn] = thisMoment;
        }

        async $beforeUpdate(opt, queryContext) {
            const thisMoment = moment();
            await super.$beforeUpdate(opt, queryContext);
            this[createdAtColumn] = opt.old[createdAtColumn];
            this[updatedAtColumn] = thisMoment;
        }
    };
