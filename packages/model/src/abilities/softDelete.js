import SoftDelete from "./../extensions/SoftDelete";
import moment from "./../types/moment";

export default ({column} = {column: 'deletedAt'}) => Model => class extends Model {
    static get queryBuilderExtensions() {
        return [...Model.queryBuilderExtensions, SoftDelete({column})];
    }

    static get typeCastings() {
        return [...Model.typeCastings, {key: column, caster: moment}];
    }
};
